package com.phucnghia.kiemphongkim.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserRequest {
    @NotBlank @Size(min = 4, max = 30)
    private String username;

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 6, max = 100)
    private String password;
}
