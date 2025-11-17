package com.phucnghia.kiemphongkim.service;

import com.phucnghia.kiemphongkim.entity.User;
import com.phucnghia.kiemphongkim.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User u = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        // map sang UserDetails
        return org.springframework.security.core.userdetails.User
                .withUsername(u.getUsername()) // username trong token sẽ là username này
                .password(u.getPassword())
                .authorities(u.getRoles().stream().map(Enum::name).toArray(String[]::new))
                .build();
    }
}
