package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.User;
import com.phucnghia.kiemphongkim.entity.VoucherExchange;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoucherExchangeRepository extends JpaRepository<VoucherExchange, Long> {
    List<VoucherExchange> findByUserOrderByCreatedAtDesc(User user);
}
