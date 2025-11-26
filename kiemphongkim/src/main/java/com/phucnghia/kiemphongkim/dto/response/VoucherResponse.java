package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoucherResponse {

    private Long id;
    private String code;

    private Integer discountValue;
    private Integer minOrder;

    private Date expiredAt;
    private Integer usageLimit;

    // cho hệ thống loyalty
    private Integer requiredPoints;      // điểm cần để đổi
    private String memberLevelLimit;     // GOLD / PLATINUM...
}
