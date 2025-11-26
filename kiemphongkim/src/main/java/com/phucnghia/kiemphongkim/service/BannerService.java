package com.phucnghia.kiemphongkim.service;

import com.phucnghia.kiemphongkim.dto.response.BannerResponse;

import java.util.List;

public interface BannerService {

    BannerResponse create(BannerResponse request);  // hoặc tạo BannerRequest riêng nếu muốn

    BannerResponse update(Long id, BannerResponse request);

    void delete(Long id);

    BannerResponse getById(Long id);

    List<BannerResponse> getAll();

    List<BannerResponse> getActiveBanners();    // status = active (hoặc ENABLED)
}
