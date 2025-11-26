package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.Order;
import com.phucnghia.kiemphongkim.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    List<Order> findByUser_IdOrderByCreatedAtDesc(Long userId);
    List<Order> findByStatus(String status);
}
