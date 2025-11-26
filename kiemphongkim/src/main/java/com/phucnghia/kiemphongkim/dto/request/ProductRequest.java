package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class ProductRequest {

    private Long id;  // dùng cho update, tạo mới thì null

    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    @NotNull(message = "Giá sản phẩm không được để trống")
    @Positive(message = "Giá sản phẩm phải lớn hơn 0")
    private Integer price;

    @Positive(message = "Giá khuyến mãi phải lớn hơn 0")
    private Integer salePrice;

    @NotBlank(message = "Mô tả sản phẩm không được để trống")
    private String description;

    @NotNull(message = "Số lượng tồn kho không được để trống")
    @Min(value = 0, message = "Số lượng tồn kho không được âm")
    private Integer stock;

    @NotNull(message = "Danh mục sản phẩm không được để trống")
    private Long categoryId;

    // active / hidden ...
    @NotBlank(message = "Trạng thái sản phẩm không được để trống")
    private String status;

    // Danh sách ảnh
    private List<@NotBlank(message = "Đường dẫn ảnh không được để trống") String> imageUrls;

    // Danh sách filter
    private List<ProductFilterRequest> filters;
}
