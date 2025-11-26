package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {

    private Long id;
    private Long userId;

    private Integer totalPrice;
    private String status;          // pending, shipping, completed...

    private String voucherCode;     // có thể null nếu không dùng
    private List<OrderItemResponse> items;

    private Date createdAt;
}
