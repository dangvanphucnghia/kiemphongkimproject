package com.phucnghia.kiemphongkim.service;

import com.phucnghia.kiemphongkim.dto.request.CategoryRequest;
import com.phucnghia.kiemphongkim.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(Long id, CategoryRequest request);

    void delete(Long id);

    CategoryResponse getById(Long id);

    List<CategoryResponse> getAll();

    List<CategoryResponse> getRootCategories();     // parent = null

    List<CategoryResponse> getChildren(Long parentId);
}
