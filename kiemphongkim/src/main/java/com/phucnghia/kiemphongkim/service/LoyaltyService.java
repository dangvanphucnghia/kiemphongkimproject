package com.phucnghia.kiemphongkim.service;

import com.phucnghia.kiemphongkim.dto.request.AdjustPointRequest;
import com.phucnghia.kiemphongkim.dto.response.*;

import java.util.List;

public interface LoyaltyService {

    // Thông tin cơ bản hội viên của user
    UserMemberProfileResponse getMyProfile(String username);

    // Dashboard hội viên (điểm, hạng, ưu đãi, lịch sử điểm, voucher khả dụng)
    LoyaltyDashboardResponse getMyDashboard(String username);

    // Lịch sử điểm
    List<PointHistoryResponse> getMyPointHistory(String username);

    // Ưu đãi theo hạng
    List<MemberBenefitResponse> getBenefitsByLevel(Long levelId);

    // Admin: chỉnh điểm cho user
    UserMemberProfileResponse adjustUserPoints(AdjustPointRequest request);
}
