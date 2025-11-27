package com.phucnghia.kiemphongkim.controller;

import com.phucnghia.kiemphongkim.dto.request.ProductRequest;
import com.phucnghia.kiemphongkim.dto.response.ProductResponse;
import com.phucnghia.kiemphongkim.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody @Valid ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(request));
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                                  @RequestBody @Valid ProductRequest request) {
        productService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable Long id) {
        return productService.getById(id);
    }

    @GetMapping
    public List<ProductResponse> getAll() {
        return productService.getAll();
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductResponse> getByCategory(@PathVariable Long categoryId) {
        return productService.getByCategory(categoryId);
    }

    @GetMapping("/search")
    public List<ProductResponse> search(@RequestParam("keyword") String keyword) {
        return productService.searchByName(keyword);
    }

    @GetMapping("/status/{status}")
    public List<ProductResponse> getByStatus(@PathVariable String status) {
        return productService.getByStatus(status);
    }
}
