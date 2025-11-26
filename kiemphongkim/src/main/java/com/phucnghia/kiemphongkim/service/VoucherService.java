package com.phucnghia.kiemphongkim.service;

import com.phucnghia.kiemphongkim.dto.request.ApplyVoucherRequest;
import com.phucnghia.kiemphongkim.dto.request.VoucherRequest;
import com.phucnghia.kiemphongkim.dto.response.VoucherExchangeResponse;
import com.phucnghia.kiemphongkim.dto.response.VoucherResponse;

import java.util.List;

public interface VoucherService {

    // Admin CRUD
    VoucherResponse create(VoucherRequest request);

    VoucherResponse update(Long id, VoucherRequest request);

    void delete(Long id);

    VoucherResponse getById(Long id);

    List<VoucherResponse> getAll();

    VoucherResponse getByCode(String code);

    boolean existsByCode(String code);

    // Apply voucher cho user (validate minOrder, date, usage, cấp bậc,...)
    VoucherResponse applyVoucher(String username, ApplyVoucherRequest request);

    // Đổi voucher bằng điểm
    VoucherExchangeResponse exchangeVoucherByPoints(String username, String voucherCode);

    // Lịch sử đổi voucher của user
    List<VoucherExchangeResponse> getMyVoucherExchangeHistory(String username);
}
