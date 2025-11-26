package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AdjustPointRequest {

    @NotNull(message = "UserId không được để trống")
    private Long userId;

    @NotNull(message = "Số điểm không được để trống")
    @Min(value = -100000, message = "Số điểm không hợp lệ")
    private Integer points; // có thể âm nếu trừ điểm

    private String reason;
}
