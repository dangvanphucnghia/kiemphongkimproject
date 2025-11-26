package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ApplyVoucherRequest {

    @NotBlank(message = "Mã voucher không được để trống")
    private String code;
}
