package com.phucnghia.kiemphongkim.service.impl;

import com.phucnghia.kiemphongkim.dto.response.BannerResponse;
import com.phucnghia.kiemphongkim.entity.Banner;
import com.phucnghia.kiemphongkim.repository.BannerRepository;
import com.phucnghia.kiemphongkim.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BannerServiceImpl implements BannerService {

    private final BannerRepository bannerRepository;

    @Override
    public BannerResponse create(BannerResponse request) {
        Banner b = Banner.builder()
                .title(request.getTitle())
                .imageUrl(request.getImageUrl())
                .link(request.getLink())
                .status(request.getStatus())
                .build();

        b = bannerRepository.save(b);
        return toResponse(b);
    }

    @Override
    public BannerResponse update(Long id, BannerResponse request) {
        Banner b = bannerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Banner không tồn tại"));

        b.setTitle(request.getTitle());
        b.setImageUrl(request.getImageUrl());
        b.setLink(request.getLink());
        b.setStatus(request.getStatus());

        b = bannerRepository.save(b);
        return toResponse(b);
    }

    @Override
    public void delete(Long id) {
        if (!bannerRepository.existsById(id)) {
            throw new IllegalArgumentException("Banner không tồn tại");
        }
        bannerRepository.deleteById(id);
    }

    @Override
    public BannerResponse getById(Long id) {
        Banner b = bannerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Banner không tồn tại"));
        return toResponse(b);
    }

    @Override
    public List<BannerResponse> getAll() {
        return bannerRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<BannerResponse> getActiveBanners() {
        return bannerRepository.findByStatus("ACTIVE")
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private BannerResponse toResponse(Banner b) {
        return BannerResponse.builder()
                .id(b.getId())
                .title(b.getTitle())
                .imageUrl(b.getImageUrl())
                .link(b.getLink())
                .status(b.getStatus())
                .build();
    }
}
