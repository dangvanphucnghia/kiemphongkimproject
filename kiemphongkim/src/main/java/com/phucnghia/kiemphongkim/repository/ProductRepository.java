package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.Product;
import com.phucnghia.kiemphongkim.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(ProductCategory category);
    List<Product> findByCategory_Id(Long categoryId);
    List<Product> findByStatus(String status);
    List<Product> findByNameContainingIgnoreCase(String name);
}
