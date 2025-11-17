package com.phucnghia.kiemphongkim.dto.response;

import com.phucnghia.kiemphongkim.entity.Role;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Set<Role> roles;
}
