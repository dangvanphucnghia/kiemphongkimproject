package com.phucnghia.kiemphongkim.service.impl;

import com.phucnghia.kiemphongkim.config.JwtService;
import com.phucnghia.kiemphongkim.dto.request.LoginRequest;
import com.phucnghia.kiemphongkim.dto.request.UserRequest;
import com.phucnghia.kiemphongkim.dto.response.AuthResponse;
import com.phucnghia.kiemphongkim.dto.response.UserResponse;
import com.phucnghia.kiemphongkim.entity.Role;
import com.phucnghia.kiemphongkim.entity.User;
import com.phucnghia.kiemphongkim.repository.UserRepository;
import com.phucnghia.kiemphongkim.service.JpaUserDetailsService;
import com.phucnghia.kiemphongkim.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JpaUserDetailsService userDetailsService;

    @Override
    public UserResponse register(UserRequest req) {
        if (userRepository.existsByUsername(req.getUsername()))
            throw new IllegalArgumentException("Username đã tồn tại");
        if (userRepository.existsByEmail(req.getEmail()))
            throw new IllegalArgumentException("Email đã tồn tại");
        if (userRepository.existsByPhoneNumber(req.getPhoneNumber()))
            throw new IllegalArgumentException("Số điện thoại đã tồn tại");

        Date now = new Date();

        User u = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword()))
                .fullname(req.getFullName())
                .phoneNumber(req.getPhoneNumber())
                .address(req.getAddress())
                .createdAt(now)
                .updatedAt(now)
                .roles(Set.of(Role.ROLE_USER))
                .build();

        u = userRepository.save(u);
        return toUserResponse(u);
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        // xác thực username/email + password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsernameOrEmail(),
                        req.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(req.getUsernameOrEmail());
        String token = jwtService.generateToken(userDetails);

        User user = userRepository
                .findByUsernameOrEmail(req.getUsernameOrEmail(), req.getUsernameOrEmail())
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));

        return AuthResponse.builder()
                .token(token)
                .user(toUserResponse(user))
                .build();
    }

    @Override
    public UserResponse me(String username) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));
        return toUserResponse(u);
    }

    private UserResponse toUserResponse(User u) {
        return UserResponse.builder()
                .id(u.getId())
                .username(u.getUsername())
                .email(u.getEmail())
                .fullName(u.getFullname())        // field trong entity là fullname
                .phoneNumber(u.getPhoneNumber())
                .address(u.getAddress())
                .roles(
                        u.getRoles().stream()
                                .map(Role::name)
                                .toList()
                )
                .build();
    }
}
