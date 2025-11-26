package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemResponse {

    private Long id;

    private Long productId;
    private String productName;

    private Integer quantity;
    private Integer price;         // đơn giá
    private Integer totalPrice;    // quantity * price

    private String imageUrl;       // ảnh đại diện sản phẩm
}
