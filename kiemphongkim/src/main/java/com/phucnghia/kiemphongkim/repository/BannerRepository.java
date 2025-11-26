package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    List<Banner> findByStatus(String status);
}
