package com.phucnghia.kiemphongkim.controller;

import com.phucnghia.kiemphongkim.dto.response.UserResponse;
import com.phucnghia.kiemphongkim.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Lấy thông tin user đang đăng nhập
    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {
        // username lấy từ SecurityContext (được set trong JwtAuthFilter)
        return userService.me(authentication.getName());
    }
}
