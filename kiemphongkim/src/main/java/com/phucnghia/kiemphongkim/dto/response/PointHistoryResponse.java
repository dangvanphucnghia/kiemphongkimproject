package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointHistoryResponse {

    private Long id;

    private String type;         // earn / redeem / order_bonus...
    private Integer points;
    private String description;

    private Date createdAt;
}
