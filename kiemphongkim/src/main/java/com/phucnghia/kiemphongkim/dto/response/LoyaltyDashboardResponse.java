package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoyaltyDashboardResponse {

    private UserResponse user;
    private UserMemberProfileResponse profile;
    private List<MemberBenefitResponse> benefits;
    private List<PointHistoryResponse> pointHistory;
    private List<VoucherResponse> availableVouchers;
}
