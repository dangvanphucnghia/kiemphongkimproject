package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserUpdateRequest {

    @NotBlank(message = "Họ và tên không được để trống")
    @Size(min = 6, max = 50, message = "Họ và tên phải từ 6 đến 50 ký tự")
    private String fullName;

    @NotNull(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "0\\d{9,10}", message = "Số điện thoại không hợp lệ")
    private int phoneNumber;

    @NotBlank(message = "Địa chỉ không được để trống")
    @Size(min = 10, max = 100, message = "Địa chỉ phải từ 10 đến 100 ký tự")
    private String address;
}
