package com.phucnghia.kiemphongkim.dto.response;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private Integer price;
    private int quantity;
    private Integer salePrice;
    private String description;
    private Integer stock;
    private String status;

    private Long categoryId;
    private String categoryName;

    private List<String> imageUrls;
    private List<ProductFilterResponse> filters;

    private Date createdAt;
    private Date updatedAt;
}
