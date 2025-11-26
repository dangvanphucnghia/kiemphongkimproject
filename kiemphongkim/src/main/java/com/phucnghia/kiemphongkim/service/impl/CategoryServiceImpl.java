package com.phucnghia.kiemphongkim.service.impl;

import com.phucnghia.kiemphongkim.dto.request.CategoryRequest;
import com.phucnghia.kiemphongkim.dto.response.CategoryResponse;
import com.phucnghia.kiemphongkim.entity.ProductCategory;
import com.phucnghia.kiemphongkim.repository.ProductCategoryRepository;
import com.phucnghia.kiemphongkim.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final ProductCategoryRepository categoryRepository;

    @Override
    public CategoryResponse create(CategoryRequest request) {
        ProductCategory parent = null;
        if (request.getParentId() != null) {
            parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Danh mục cha không tồn tại"));
        }

        ProductCategory c = ProductCategory.builder()
                .name(request.getName())
                .parent(parent)
                .build();

        c = categoryRepository.save(c);
        return toResponse(c);
    }

    @Override
    public CategoryResponse update(Long id, CategoryRequest request) {
        ProductCategory c = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Danh mục không tồn tại"));

        ProductCategory parent = null;
        if (request.getParentId() != null) {
            parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Danh mục cha không tồn tại"));
        }

        c.setName(request.getName());
        c.setParent(parent);

        c = categoryRepository.save(c);
        return toResponse(c);
    }

    @Override
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalArgumentException("Danh mục không tồn tại");
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryResponse getById(Long id) {
        ProductCategory c = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Danh mục không tồn tại"));
        return toResponse(c);
    }

    @Override
    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<CategoryResponse> getRootCategories() {
        return categoryRepository.findByParentIsNull()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<CategoryResponse> getChildren(Long parentId) {
        return categoryRepository.findByParent_Id(parentId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private CategoryResponse toResponse(ProductCategory c) {
        return CategoryResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .parentId(c.getParent() != null ? c.getParent().getId() : null)
                .build();
    }
}
