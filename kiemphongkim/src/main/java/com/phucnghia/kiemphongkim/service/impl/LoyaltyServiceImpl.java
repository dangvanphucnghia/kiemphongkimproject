package com.phucnghia.kiemphongkim.service.impl;

import com.phucnghia.kiemphongkim.dto.request.AdjustPointRequest;
import com.phucnghia.kiemphongkim.dto.response.*;
import com.phucnghia.kiemphongkim.entity.*;
import com.phucnghia.kiemphongkim.repository.*;
import com.phucnghia.kiemphongkim.service.LoyaltyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LoyaltyServiceImpl implements LoyaltyService {

    private final UserRepository userRepository;
    private final UserMemberProfileRepository userMemberProfileRepository;
    private final MemberLevelRepository memberLevelRepository;
    private final MemberBenefitRepository memberBenefitRepository;
    private final PointHistoryRepository pointHistoryRepository;
    private final VoucherRepository voucherRepository;
    private final VoucherExchangeRepository voucherExchangeRepository;

    @Override
    public UserMemberProfileResponse getMyProfile(String username) {
        User user = getUserByUsername(username);
        UserMemberProfile profile = getOrCreateProfile(user);
        return toProfileResponse(profile);
    }

    @Override
    public LoyaltyDashboardResponse getMyDashboard(String username) {
        User user = getUserByUsername(username);
        UserMemberProfile profile = getOrCreateProfile(user);

        UserMemberProfileResponse profileRes = toProfileResponse(profile);
        List<MemberBenefitResponse> benefits = getBenefitsByLevel(profile.getMemberLevel().getId());
        List<PointHistoryResponse> history = getMyPointHistory(username);

        // voucher khả dụng: demo = tất cả voucher chưa hết hạn
        List<VoucherResponse> vouchers = voucherRepository.findAll()
                .stream()
                .filter(v -> v.getExpiredAt() == null || v.getExpiredAt().after(new Date()))
                .map(v -> VoucherResponse.builder()
                        .id(v.getId())
                        .code(v.getCode())
                        .discountValue(v.getDiscountValue())
                        .minOrder(v.getMinOrder())
                        .expiredAt(v.getExpiredAt())
                        .usageLimit(v.getUsageLimit())
                        .requiredPoints(v.getRequiredPoints())
                        .memberLevelLimit(v.getMemberLevelLimit())
                        .build())
                .toList();

        // map User -> UserResponse đơn giản
        UserResponse userRes = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullname())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .roles(user.getRoles().stream().map(Enum::name).toList())
                .build();

        return LoyaltyDashboardResponse.builder()
                .user(userRes)
                .profile(profileRes)
                .benefits(benefits)
                .pointHistory(history)
                .availableVouchers(vouchers)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PointHistoryResponse> getMyPointHistory(String username) {
        User user = getUserByUsername(username);
        return pointHistoryRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::toPointHistoryResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MemberBenefitResponse> getBenefitsByLevel(Long levelId) {
        return memberBenefitRepository.findByLevel_IdAndActiveTrue(levelId)
                .stream()
                .map(b -> MemberBenefitResponse.builder()
                        .id(b.getId())
                        .levelId(b.getLevel().getId())
                        .levelName(b.getLevel().getName())
                        .title(b.getTitle())
                        .description(b.getDescription())
                        .active(b.getActive())
                        .build())
                .toList();
    }

    @Override
    public UserMemberProfileResponse adjustUserPoints(AdjustPointRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));

        UserMemberProfile profile = getOrCreateProfile(user);

        profile.setPoints(profile.getPoints() + request.getPoints());
        profile.setUpdatedAt(new Date());

        // auto update level theo minPoints
        updateMemberLevelByPoints(profile);

        profile = userMemberProfileRepository.save(profile);

        PointHistory ph = PointHistory.builder()
                .user(user)
                .type("admin_adjust")
                .points(request.getPoints())
                .description(request.getReason())
                .createdAt(new Date())
                .build();
        pointHistoryRepository.save(ph);

        return toProfileResponse(profile);
    }

    // helper

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));
    }

    private UserMemberProfile getOrCreateProfile(User user) {
        return userMemberProfileRepository.findByUser(user)
                .orElseGet(() -> {
                    // lấy level thấp nhất
                    List<MemberLevel> levels = memberLevelRepository.findAll(Sort.by("minPoints").ascending());
                    if (levels.isEmpty()) {
                        throw new IllegalStateException("Chưa cấu hình member level");
                    }
                    MemberLevel base = levels.get(0);

                    UserMemberProfile p = UserMemberProfile.builder()
                            .user(user)
                            .memberLevel(base)
                            .points(0)
                            .updatedAt(new Date())
                            .build();
                    return userMemberProfileRepository.save(p);
                });
    }

    private void updateMemberLevelByPoints(UserMemberProfile profile) {
        List<MemberLevel> levels = memberLevelRepository.findAll(Sort.by("minPoints").ascending());
        if (levels.isEmpty()) return;

        int points = profile.getPoints();
        MemberLevel best = levels.get(0);

        for (MemberLevel lvl : levels) {
            if (lvl.getMinPoints() != null && points >= lvl.getMinPoints()) {
                best = lvl;
            }
        }
        profile.setMemberLevel(best);
    }

    private UserMemberProfileResponse toProfileResponse(UserMemberProfile p) {
        // tìm level tiếp theo
        List<MemberLevel> levels = memberLevelRepository.findAll(Sort.by("minPoints").ascending());

        Integer nextMinPoints = null;
        String nextName = null;
        boolean foundCurrent = false;
        for (MemberLevel lvl : levels) {
            if (foundCurrent) {
                nextMinPoints = lvl.getMinPoints();
                nextName = lvl.getName();
                break;
            }
            if (lvl.getId().equals(p.getMemberLevel().getId())) {
                foundCurrent = true;
            }
        }

        return UserMemberProfileResponse.builder()
                .userId(p.getUser().getId())
                .memberLevelId(p.getMemberLevel().getId())
                .memberLevelName(p.getMemberLevel().getName())
                .points(p.getPoints())
                .nextLevelMinPoints(nextMinPoints)
                .nextLevelName(nextName)
                .build();
    }

    private PointHistoryResponse toPointHistoryResponse(PointHistory ph) {
        return PointHistoryResponse.builder()
                .id(ph.getId())
                .type(ph.getType())
                .points(ph.getPoints())
                .description(ph.getDescription())
                .createdAt(ph.getCreatedAt())
                .build();
    }
}
