package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequest {

    @NotBlank(message = "Tài khoản phải có độ dài từ 4 đến 30 ký tự")
    @Size(min = 4, max = 30, message = "Tài khoản phải có độ dài từ 4 đến 30 ký tự")
    private String username;

    @NotBlank(message = "Vui lòng nhập email")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank(message = "Mật khẩu phải có độ dài từ 6 đến 100 ký tự")
    @Size(min = 6, max = 100, message = "Mật khẩu phải có độ dài từ 6 đến 100 ký tự")
    private String password;

    @NotBlank(message = "Họ và tên không được vượt quá 50 ký tự và ít nhất 6 ký tự")
    @Size(min = 6, max = 50, message = "Họ và tên phải từ 6 đến 50 ký tự")
    private String fullName;

    @NotNull(message = "Số điện thoại không được để trống")
//    @Pattern(regexp = "0\\d{9,10}", message = "Số điện thoại không hợp lệ")
    private int phoneNumber;

    @NotBlank(message = "Địa chỉ không được vượt quá 100 ký tự và ít nhất 10 ký tự")
    @Size(min = 10, max = 100, message = "Địa chỉ phải từ 10 đến 100 ký tự")
    private String address;
}
