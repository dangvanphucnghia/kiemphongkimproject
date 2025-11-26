package com.phucnghia.kiemphongkim.controller;

import com.phucnghia.kiemphongkim.dto.response.BannerResponse;
import com.phucnghia.kiemphongkim.service.BannerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

    // Admin tạo banner
    @PostMapping
    public ResponseEntity<BannerResponse> create(@RequestBody @Valid BannerResponse request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bannerService.create(request));
    }

    @PutMapping("/{id}")
    public BannerResponse update(@PathVariable Long id,
                                 @RequestBody @Valid BannerResponse request) {
        return bannerService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bannerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Admin xem tất cả
    @GetMapping
    public List<BannerResponse> getAll() {
        return bannerService.getAll();
    }

    // Frontend dùng: chỉ lấy banner ACTIVE
    @GetMapping("/active")
    public List<BannerResponse> getActiveBanners() {
        return bannerService.getActiveBanners();
    }
}
