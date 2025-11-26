package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    List<ProductCategory> findByParentIsNull();
    List<ProductCategory> findByParent_Id(Long parentId);
}
