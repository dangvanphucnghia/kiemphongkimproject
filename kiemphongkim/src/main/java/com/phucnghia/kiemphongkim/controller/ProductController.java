package com.phucnghia.kiemphongkim.controller;

import com.phucnghia.kiemphongkim.dto.request.ProductRequest;
import com.phucnghia.kiemphongkim.dto.response.ProductResponse;
import com.phucnghia.kiemphongkim.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> create(
            @Valid @ModelAttribute ProductRequest request,      // dữ liệu text
            @RequestPart(value = "images", required = false) List<MultipartFile> images // file ảnh
    ) {
        // Nếu có ảnh upload thì lưu file, build list URL, gán vào request
        if (images != null && !images.isEmpty()) {
            List<String> urls = images.stream()
                    .filter(f -> !f.isEmpty())
                    .map(this::saveImageFile)   // ⬅️ hàm helper bên dưới
                    .toList();
            request.setImageUrls(urls);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productService.create(request));
    }


    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void update(
            @PathVariable Long id,
            @Valid @ModelAttribute ProductRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        if (images != null && !images.isEmpty()) {
            List<String> urls = images.stream()
                    .filter(f -> !f.isEmpty())
                    .map(this::saveImageFile)
                    .toList();
            request.setImageUrls(urls);
        }

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
    private String saveImageFile(MultipartFile file) {
        try {
            // Thư mục uploads/products nằm cùng cấp với project (pom.xml)
            Path uploadPath = Paths.get("uploads", "products")
                    .toAbsolutePath()
                    .normalize();

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String filename = System.currentTimeMillis() + "_" + originalFilename;

            Path filePath = uploadPath.resolve(filename);
            file.transferTo(filePath.toFile());

            // URL để FE truy cập (khớp với addResourceHandler("/uploads/**"))
            return "/uploads/products/" + filename;
        } catch (Exception e) {
            throw new RuntimeException("Lỗi lưu file ảnh: " + e.getMessage(), e);
        }
    }


}
