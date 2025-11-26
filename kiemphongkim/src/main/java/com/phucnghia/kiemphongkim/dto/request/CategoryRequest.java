package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {

    private Long id;          // dùng cho update, create có thể bỏ qua

    @NotBlank(message = "Tên danh mục không được để trống")
    private String name;

    private Long parentId;    // null nếu là danh mục gốc
}
