package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartResponse {

    private Long id;
    private Long userId;

    private List<CartItemResponse> items;

    private Integer totalItems;    // tổng số item
    private Integer totalQuantity; // tổng số lượng sản phẩm
    private Integer totalPrice;    // tổng tiền

    private Date createdAt;
}
