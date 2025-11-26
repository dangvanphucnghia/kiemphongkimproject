package com.phucnghia.kiemphongkim.controller;

import com.phucnghia.kiemphongkim.dto.request.CategoryRequest;
import com.phucnghia.kiemphongkim.dto.response.CategoryResponse;
import com.phucnghia.kiemphongkim.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@RequestBody @Valid CategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(request));
    }

    @PutMapping("/{id}")
    public CategoryResponse update(@PathVariable Long id,
                                   @RequestBody @Valid CategoryRequest request) {
        return categoryService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public CategoryResponse getById(@PathVariable Long id) {
        return categoryService.getById(id);
    }

    @GetMapping
    public List<CategoryResponse> getAll() {
        return categoryService.getAll();
    }

    @GetMapping("/root")
    public List<CategoryResponse> getRootCategories() {
        return categoryService.getRootCategories();
    }

    @GetMapping("/{parentId}/children")
    public List<CategoryResponse> getChildren(@PathVariable Long parentId) {
        return categoryService.getChildren(parentId);
    }
}
