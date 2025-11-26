package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

@Data
public class VoucherRequest {

    private Long id;  // update thì có, create thì null

    @NotBlank(message = "Mã voucher không được để trống")
    private String code;

    @NotNull(message = "Giá trị giảm giá không được để trống")
    @Positive(message = "Giá trị giảm giá phải lớn hơn 0")
    private Integer discountValue;

    @NotNull(message = "Đơn tối thiểu không được để trống")
    @PositiveOrZero(message = "Đơn tối thiểu phải >= 0")
    private Integer minOrder;

    @NotNull(message = "Ngày hết hạn không được để trống")
    private Date expiredAt;

    @NotNull(message = "Số lần sử dụng tối đa không được để trống")
    @Positive(message = "Số lần sử dụng phải > 0")
    private Integer usageLimit;

    // dùng cho hệ thống điểm thành viên
    private Integer requiredPoints;      // số điểm cần để đổi
    private String memberLevelLimit;     // hạn chế hạng: GOLD/PLATINUM...
}
