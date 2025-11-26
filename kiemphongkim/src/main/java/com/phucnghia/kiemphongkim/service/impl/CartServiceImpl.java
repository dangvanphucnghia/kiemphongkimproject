package com.phucnghia.kiemphongkim.service.impl;

import com.phucnghia.kiemphongkim.dto.request.AddToCartRequest;
import com.phucnghia.kiemphongkim.dto.request.UpdateCartItemRequest;
import com.phucnghia.kiemphongkim.dto.response.CartItemResponse;
import com.phucnghia.kiemphongkim.dto.response.CartResponse;
import com.phucnghia.kiemphongkim.entity.*;
import com.phucnghia.kiemphongkim.repository.*;
import com.phucnghia.kiemphongkim.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    @Override
    public CartResponse getMyCart(String username) {
        User user = getUserByUsername(username);

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .user(user)
                                .createdAt(new Date())
                                .build()
                ));

        return toCartResponse(cart);
    }

    @Override
    public CartResponse addToCart(String username, AddToCartRequest request) {
        User user = getUserByUsername(username);
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .user(user)
                                .createdAt(new Date())
                                .build()
                ));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Sản phẩm không tồn tại"));

        // đơn giá: ưu tiên salePrice
        int price = product.getSalePrice() != null && product.getSalePrice() > 0
                ? product.getSalePrice()
                : product.getPrice();

        // tìm xem đã có item này trong giỏ chưa
        List<CartItem> items = cartItemRepository.findByCart_Id(cart.getId());
        CartItem existing = items.stream()
                .filter(i -> i.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + request.getQuantity());
            existing.setPrice(price); // cập nhật đơn giá mới
            cartItemRepository.save(existing);
        } else {
            CartItem item = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .price(price)
                    .build();
            cartItemRepository.save(item);
        }

        return toCartResponse(cart);
    }

    @Override
    public CartResponse updateItem(String username, UpdateCartItemRequest request) {
        User user = getUserByUsername(username);

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Giỏ hàng không tồn tại"));

        CartItem item = cartItemRepository.findById(request.getCartItemId())
                .orElseThrow(() -> new IllegalArgumentException("Sản phẩm trong giỏ không tồn tại"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new IllegalArgumentException("Sản phẩm không thuộc giỏ hàng của bạn");
        }

        item.setQuantity(request.getQuantity());
        cartItemRepository.save(item);

        return toCartResponse(cart);
    }

    @Override
    public CartResponse removeItem(String username, Long cartItemId) {
        User user = getUserByUsername(username);

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Giỏ hàng không tồn tại"));

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Sản phẩm trong giỏ không tồn tại"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new IllegalArgumentException("Sản phẩm không thuộc giỏ hàng của bạn");
        }

        cartItemRepository.delete(item);
        return toCartResponse(cart);
    }

    @Override
    public CartResponse clearCart(String username) {
        User user = getUserByUsername(username);

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Giỏ hàng không tồn tại"));

        List<CartItem> items = cartItemRepository.findByCart_Id(cart.getId());
        cartItemRepository.deleteAll(items);

        return toCartResponse(cart);
    }

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));
    }

    private CartResponse toCartResponse(Cart cart) {
        List<CartItem> items = cartItemRepository.findByCart_Id(cart.getId());

        List<CartItemResponse> itemResponses = items.stream()
                .map(i -> {
                    Product p = i.getProduct();
                    String imageUrl = productImageRepository.findByProduct_Id(p.getId())
                            .stream()
                            .findFirst()
                            .map(ProductImage::getImageUrl)
                            .orElse(null);

                    int totalPrice = i.getPrice() * i.getQuantity();

                    return CartItemResponse.builder()
                            .id(i.getId())
                            .productId(p.getId())
                            .productName(p.getName())
                            .quantity(i.getQuantity())
                            .price(i.getPrice())
                            .totalPrice(totalPrice)
                            .imageUrl(imageUrl)
                            .build();
                })
                .toList();

        int totalItems = itemResponses.size();
        int totalQuantity = itemResponses.stream()
                .mapToInt(CartItemResponse::getQuantity)
                .sum();
        int totalPrice = itemResponses.stream()
                .mapToInt(CartItemResponse::getTotalPrice)
                .sum();

        return CartResponse.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .items(itemResponses)
                .totalItems(totalItems)
                .totalQuantity(totalQuantity)
                .totalPrice(totalPrice)
                .createdAt(cart.getCreatedAt())
                .build();
    }
}
