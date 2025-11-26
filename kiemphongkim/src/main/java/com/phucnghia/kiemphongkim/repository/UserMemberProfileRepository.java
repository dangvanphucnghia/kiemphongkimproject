package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.User;
import com.phucnghia.kiemphongkim.entity.UserMemberProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserMemberProfileRepository extends JpaRepository<UserMemberProfile, Long> {
    Optional<UserMemberProfile> findByUser(User user);
    Optional<UserMemberProfile> findByUserId(Long userId);
}
