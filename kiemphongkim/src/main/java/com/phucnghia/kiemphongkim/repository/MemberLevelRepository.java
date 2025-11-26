package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.MemberLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberLevelRepository extends JpaRepository<MemberLevel, Long> {
    Optional<MemberLevel> findByName(String name);
}
