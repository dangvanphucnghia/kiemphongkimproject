package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductFilterRequest {

    @NotBlank(message = "Kiểu filter không được để trống")
    private String filterType;   // ví dụ: loai_go, vi_tri, nhom

    @NotBlank(message = "Giá trị filter không được để trống")
    private String filterValue;  // ví dụ: Bach xanh, Phong khach ...
}
