package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateOrderRequest {

    // nếu dùng giỏ hàng theo user thì không cần items ở đây
    private String voucherCode;   // có thể null nếu không dùng voucher

    @NotBlank(message = "Địa chỉ nhận hàng không được để trống")
    private String shippingAddress;

    @NotBlank(message = "Số điện thoại nhận hàng không được để trống")
    private String shippingPhone;

    private String note;
}
