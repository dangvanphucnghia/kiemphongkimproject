package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoucherExchangeResponse {

    private Long id;

    private Long userId;
    private Long voucherId;

    private String voucherCode;

    private Integer pointsSpent;

    private Date createdAt;
}
