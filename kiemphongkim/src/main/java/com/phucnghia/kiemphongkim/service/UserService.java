package com.phucnghia.kiemphongkim.service;

import com.phucnghia.kiemphongkim.dto.request.LoginRequest;
import com.phucnghia.kiemphongkim.dto.request.UserRequest;
import com.phucnghia.kiemphongkim.dto.response.AuthResponse;
import com.phucnghia.kiemphongkim.dto.response.UserResponse;

public interface UserService {
    UserResponse register(UserRequest request);
    AuthResponse login(LoginRequest request);
    UserResponse me(String username); // lấy từ SecurityContext (username)
}
