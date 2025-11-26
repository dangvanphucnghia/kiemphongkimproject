package com.phucnghia.kiemphongkim.controller;

import com.phucnghia.kiemphongkim.dto.request.ApplyVoucherRequest;
import com.phucnghia.kiemphongkim.dto.request.VoucherRequest;
import com.phucnghia.kiemphongkim.dto.response.VoucherExchangeResponse;
import com.phucnghia.kiemphongkim.dto.response.VoucherResponse;
import com.phucnghia.kiemphongkim.service.VoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vouchers")
@RequiredArgsConstructor
public class VoucherController {

    private final VoucherService voucherService;

    // ====== ADMIN CRUD ======

    @PostMapping
    public ResponseEntity<VoucherResponse> create(@RequestBody @Valid VoucherRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(voucherService.create(request));
    }

    @PutMapping("/{id}")
    public VoucherResponse update(@PathVariable Long id,
                                  @RequestBody @Valid VoucherRequest request) {
        return voucherService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        voucherService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public VoucherResponse getById(@PathVariable Long id) {
        return voucherService.getById(id);
    }

    @GetMapping
    public List<VoucherResponse> getAll() {
        return voucherService.getAll();
    }

    // ====== USER: apply & exchange & history ======

    @PostMapping("/apply")
    public VoucherResponse applyVoucher(Authentication authentication,
                                        @RequestBody @Valid ApplyVoucherRequest request) {
        // username hiện chỉ dùng để validate theo user nếu sau này cần
        return voucherService.applyVoucher(authentication.getName(), request);
    }

    @PostMapping("/exchange/{code}")
    public VoucherExchangeResponse exchangeVoucher(Authentication authentication,
                                                   @PathVariable String code) {
        return voucherService.exchangeVoucherByPoints(authentication.getName(), code);
    }

    @GetMapping("/exchange/history")
    public List<VoucherExchangeResponse> getMyExchangeHistory(Authentication authentication) {
        return voucherService.getMyVoucherExchangeHistory(authentication.getName());
    }
}
