package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.PointHistory;
import com.phucnghia.kiemphongkim.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointHistoryRepository extends JpaRepository<PointHistory, Long> {
    List<PointHistory> findByUserOrderByCreatedAtDesc(User user);
}
