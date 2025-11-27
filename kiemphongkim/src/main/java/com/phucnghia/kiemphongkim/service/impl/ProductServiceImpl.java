package com.phucnghia.kiemphongkim.service.impl;

import com.phucnghia.kiemphongkim.dto.request.ProductFilterRequest;
import com.phucnghia.kiemphongkim.dto.request.ProductRequest;
import com.phucnghia.kiemphongkim.dto.response.ProductFilterResponse;
import com.phucnghia.kiemphongkim.dto.response.ProductResponse;
import com.phucnghia.kiemphongkim.entity.Product;
import com.phucnghia.kiemphongkim.entity.ProductCategory;
import com.phucnghia.kiemphongkim.entity.ProductFilter;
import com.phucnghia.kiemphongkim.entity.ProductImage;
import com.phucnghia.kiemphongkim.repository.ProductCategoryRepository;
import com.phucnghia.kiemphongkim.repository.ProductFilterRepository;
import com.phucnghia.kiemphongkim.repository.ProductImageRepository;
import com.phucnghia.kiemphongkim.repository.ProductRepository;
import com.phucnghia.kiemphongkim.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductFilterRepository productFilterRepository;

    @Override
    public ProductResponse create(ProductRequest request) {
        ProductCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Danh mục không tồn tại"));

        Date now = new Date();
        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .salePrice(request.getSalePrice())
                .description(request.getDescription())
                .stock(request.getStock())
                .status(request.getStatus())
                .category(category)
                .createdAt(now)
                .updatedAt(now)
                .build();

        product = productRepository.save(product);

        // images
        if (request.getImageUrls() != null) {
            for (String url : request.getImageUrls()) {
                if (url == null || url.isBlank()) continue;
                ProductImage img = ProductImage.builder()
                        .product(product)
                        .imageUrl(url)
                        .build();
                productImageRepository.save(img);
            }
        }

        // filters
        if (request.getFilters() != null) {
            for (ProductFilterRequest f : request.getFilters()) {
                ProductFilter pf = ProductFilter.builder()
                        .product(product)
                        .filterType(f.getFilterType())
                        .filterValue(f.getFilterValue())
                        .build();
                productFilterRepository.save(pf);
            }
        }

        return toProductResponse(product);
    }

    @Override
    public void update(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sản phẩm không tồn tại"));

        ProductCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Danh mục không tồn tại"));

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setSalePrice(request.getSalePrice());
        product.setDescription(request.getDescription());
        product.setStock(request.getStock());
        product.setStatus(request.getStatus());
        product.setCategory(category);
        product.setUpdatedAt(new Date());

        product = productRepository.save(product);

        // cập nhật images: xoá hết, thêm lại
        productImageRepository.deleteAll(productImageRepository.findByProduct_Id(product.getId()));
        if (request.getImageUrls() != null) {
            for (String url : request.getImageUrls()) {
                if (url == null || url.isBlank()) continue;
                ProductImage img = ProductImage.builder()
                        .product(product)
                        .imageUrl(url)
                        .build();
                productImageRepository.save(img);
            }
        }

        // cập nhật filters: xoá hết, thêm lại
        productFilterRepository.deleteAll(productFilterRepository.findByProduct_Id(product.getId()));
        if (request.getFilters() != null) {
            for (ProductFilterRequest f : request.getFilters()) {
                ProductFilter pf = ProductFilter.builder()
                        .product(product)
                        .filterType(f.getFilterType())
                        .filterValue(f.getFilterValue())
                        .build();
                productFilterRepository.save(pf);
            }
        }
    }

    @Override
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Sản phẩm không tồn tại");
        }
        productImageRepository.deleteAll(productImageRepository.findByProduct_Id(id));
        productFilterRepository.deleteAll(productFilterRepository.findByProduct_Id(id));
        productRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getById(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sản phẩm không tồn tại"));
        return toProductResponse(p);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toProductResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getByCategory(Long categoryId) {
        return productRepository.findByCategory_Id(categoryId)
                .stream()
                .map(this::toProductResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> searchByName(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::toProductResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getByStatus(String status) {
        return productRepository.findByStatus(status)
                .stream()
                .map(this::toProductResponse)
                .toList();
    }

    private ProductResponse toProductResponse(Product p) {
        List<ProductImage> imgs = productImageRepository.findByProduct_Id(p.getId());
        List<String> imageUrls = imgs.stream()
                .map(ProductImage::getImageUrl)
                .toList();

        List<ProductFilter> filters = productFilterRepository.findByProduct_Id(p.getId());
        List<ProductFilterResponse> filterResponses = filters.stream()
                .map(f -> ProductFilterResponse.builder()
                        .id(f.getId())
                        .filterType(f.getFilterType())
                        .filterValue(f.getFilterValue())
                        .build())
                .toList();

        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .quantity(p.getQuantity())
                .salePrice(p.getSalePrice())
                .description(p.getDescription())
                .stock(p.getStock())
                .status(p.getStatus())
                .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
                .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                .imageUrls(imageUrls)
                .filters(filterResponses)
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .build();
    }
}
