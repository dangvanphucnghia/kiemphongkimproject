package com.phucnghia.kiemphongkim.service;

import com.phucnghia.kiemphongkim.dto.request.ProductRequest;
import com.phucnghia.kiemphongkim.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse create(ProductRequest request);

    ProductResponse update(Long id, ProductRequest request);

    void delete(Long id);

    ProductResponse getById(Long id);

    List<ProductResponse> getAll();

    List<ProductResponse> getByCategory(Long categoryId);

    List<ProductResponse> searchByName(String keyword);

    List<ProductResponse> getByStatus(String status); // active / hidden...
}
