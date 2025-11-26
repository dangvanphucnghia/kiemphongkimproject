package com.phucnghia.kiemphongkim.controller;

import com.phucnghia.kiemphongkim.dto.request.AdjustPointRequest;
import com.phucnghia.kiemphongkim.dto.response.*;
import com.phucnghia.kiemphongkim.service.LoyaltyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loyalty")
@RequiredArgsConstructor
public class LoyaltyController {

    private final LoyaltyService loyaltyService;

    // Thông tin cơ bản hội viên của user
    @GetMapping("/profile")
    public UserMemberProfileResponse getMyProfile(Authentication authentication) {
        return loyaltyService.getMyProfile(authentication.getName());
    }

    // Dashboard hội viên (điểm, hạng, ưu đãi, lịch sử, voucher khả dụng)
    @GetMapping("/dashboard")
    public LoyaltyDashboardResponse getMyDashboard(Authentication authentication) {
        return loyaltyService.getMyDashboard(authentication.getName());
    }

    // Lịch sử điểm
    @GetMapping("/points/history")
    public List<PointHistoryResponse> getMyPointHistory(Authentication authentication) {
        return loyaltyService.getMyPointHistory(authentication.getName());
    }

    // Ưu đãi theo hạng
    @GetMapping("/benefits/{levelId}")
    public List<MemberBenefitResponse> getBenefitsByLevel(@PathVariable Long levelId) {
        return loyaltyService.getBenefitsByLevel(levelId);
    }

    // Admin: chỉnh điểm user
    @PostMapping("/points/adjust")
    public UserMemberProfileResponse adjustUserPoints(@RequestBody @Valid AdjustPointRequest request) {
        return loyaltyService.adjustUserPoints(request);
    }
}
