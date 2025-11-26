package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.User;
import com.phucnghia.kiemphongkim.entity.Voucher;
import com.phucnghia.kiemphongkim.entity.VoucherUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoucherUserRepository extends JpaRepository<VoucherUser, Long> {
    List<VoucherUser> findByUser(User user);
    List<VoucherUser> findByUser_Id(Long userId);
    Optional<VoucherUser> findByUserAndVoucher(User user, Voucher voucher);
    boolean existsByVoucher_IdAndUser_Id(Long voucherId, Long userId);
}
