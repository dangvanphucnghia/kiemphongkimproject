package com.phucnghia.kiemphongkim.service.impl;

import com.phucnghia.kiemphongkim.dto.request.ApplyVoucherRequest;
import com.phucnghia.kiemphongkim.dto.request.VoucherRequest;
import com.phucnghia.kiemphongkim.dto.response.VoucherExchangeResponse;
import com.phucnghia.kiemphongkim.dto.response.VoucherResponse;
import com.phucnghia.kiemphongkim.entity.*;
import com.phucnghia.kiemphongkim.repository.*;
import com.phucnghia.kiemphongkim.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class VoucherServiceImpl implements VoucherService {

    private final VoucherRepository voucherRepository;
    private final VoucherUserRepository voucherUserRepository;
    private final VoucherExchangeRepository voucherExchangeRepository;
    private final UserRepository userRepository;
    private final UserMemberProfileRepository userMemberProfileRepository;

    @Override
    public VoucherResponse create(VoucherRequest request) {
        if (voucherRepository.existsByCode(request.getCode())) {
            throw new IllegalArgumentException("Mã voucher đã tồn tại");
        }

        Voucher v = toEntity(request);
        v = voucherRepository.save(v);
        return toResponse(v);
    }

    @Override
    public VoucherResponse update(Long id, VoucherRequest request) {
        Voucher v = voucherRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Voucher không tồn tại"));

        // nếu đổi code, check trùng
        if (!v.getCode().equals(request.getCode()) &&
                voucherRepository.existsByCode(request.getCode())) {
            throw new IllegalArgumentException("Mã voucher đã tồn tại");
        }

        v.setCode(request.getCode());
        v.setDiscountValue(request.getDiscountValue());
        v.setMinOrder(request.getMinOrder());
        v.setExpiredAt(request.getExpiredAt());
        v.setUsageLimit(request.getUsageLimit());
        v.setRequiredPoints(request.getRequiredPoints());
        v.setMemberLevelLimit(request.getMemberLevelLimit());

        v = voucherRepository.save(v);
        return toResponse(v);
    }

    @Override
    public void delete(Long id) {
        if (!voucherRepository.existsById(id)) {
            throw new IllegalArgumentException("Voucher không tồn tại");
        }
        voucherRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public VoucherResponse getById(Long id) {
        Voucher v = voucherRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Voucher không tồn tại"));
        return toResponse(v);
    }

    @Override
    @Transactional(readOnly = true)
    public List<VoucherResponse> getAll() {
        return voucherRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public VoucherResponse getByCode(String code) {
        Voucher v = voucherRepository.findByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("Voucher không tồn tại"));
        return toResponse(v);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByCode(String code) {
        return voucherRepository.existsByCode(code);
    }

    @Override
    @Transactional(readOnly = true)
    public VoucherResponse applyVoucher(String username, ApplyVoucherRequest request) {
        // Ở đây chỉ trả info voucher sau khi validate cơ bản
        Voucher v = voucherRepository.findByCode(request.getCode())
                .orElseThrow(() -> new IllegalArgumentException("Voucher không tồn tại"));

        if (v.getExpiredAt() != null && v.getExpiredAt().before(new Date())) {
            throw new IllegalArgumentException("Voucher đã hết hạn");
        }

        // TODO: validate usageLimit, memberLevelLimit, ... theo user

        return toResponse(v);
    }

    @Override
    public VoucherExchangeResponse exchangeVoucherByPoints(String username, String voucherCode) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));

        Voucher v = voucherRepository.findByCode(voucherCode)
                .orElseThrow(() -> new IllegalArgumentException("Voucher không tồn tại"));

        if (v.getRequiredPoints() == null || v.getRequiredPoints() <= 0) {
            throw new IllegalArgumentException("Voucher này không hỗ trợ đổi bằng điểm");
        }

        UserMemberProfile profile = userMemberProfileRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("User chưa có thông tin hội viên"));

        if (profile.getPoints() < v.getRequiredPoints()) {
            throw new IllegalArgumentException("Điểm không đủ để đổi voucher");
        }

        profile.setPoints(profile.getPoints() - v.getRequiredPoints());
        profile.setUpdatedAt(new Date());
        userMemberProfileRepository.save(profile);

        VoucherExchange ex = VoucherExchange.builder()
                .user(user)
                .voucher(v)
                .pointsSpent(v.getRequiredPoints())
                .createdAt(new Date())
                .build();

        ex = voucherExchangeRepository.save(ex);

        return VoucherExchangeResponse.builder()
                .id(ex.getId())
                .userId(user.getId())
                .voucherId(v.getId())
                .voucherCode(v.getCode())
                .pointsSpent(ex.getPointsSpent())
                .createdAt(ex.getCreatedAt())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<VoucherExchangeResponse> getMyVoucherExchangeHistory(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));

        return voucherExchangeRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(ex -> VoucherExchangeResponse.builder()
                        .id(ex.getId())
                        .userId(user.getId())
                        .voucherId(ex.getVoucher().getId())
                        .voucherCode(ex.getVoucher().getCode())
                        .pointsSpent(ex.getPointsSpent())
                        .createdAt(ex.getCreatedAt())
                        .build())
                .toList();
    }

    private Voucher toEntity(VoucherRequest r) {
        return Voucher.builder()
                .code(r.getCode())
                .discountValue(r.getDiscountValue())
                .minOrder(r.getMinOrder())
                .expiredAt(r.getExpiredAt())
                .usageLimit(r.getUsageLimit())
                .requiredPoints(r.getRequiredPoints())
                .memberLevelLimit(r.getMemberLevelLimit())
                .build();
    }

    private VoucherResponse toResponse(Voucher v) {
        return VoucherResponse.builder()
                .id(v.getId())
                .code(v.getCode())
                .discountValue(v.getDiscountValue())
                .minOrder(v.getMinOrder())
                .expiredAt(v.getExpiredAt())
                .usageLimit(v.getUsageLimit())
                .requiredPoints(v.getRequiredPoints())
                .memberLevelLimit(v.getMemberLevelLimit())
                .build();
    }
}
