package com.phucnghia.kiemphongkim.service;

import com.phucnghia.kiemphongkim.dto.request.AddToCartRequest;
import com.phucnghia.kiemphongkim.dto.request.UpdateCartItemRequest;
import com.phucnghia.kiemphongkim.dto.response.CartResponse;

public interface CartService {

    CartResponse getMyCart(String username);

    CartResponse addToCart(String username, AddToCartRequest request);

    CartResponse updateItem(String username, UpdateCartItemRequest request);

    CartResponse removeItem(String username, Long cartItemId);

    CartResponse clearCart(String username);
}
