package com.phucnghia.kiemphongkim.repository;

import com.phucnghia.kiemphongkim.entity.ProductFilter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductFilterRepository extends JpaRepository<ProductFilter, Long> {
    List<ProductFilter> findByProduct_Id(Long productId);
    List<ProductFilter> findByFilterTypeAndFilterValue(String filterType, String filterValue);
}
