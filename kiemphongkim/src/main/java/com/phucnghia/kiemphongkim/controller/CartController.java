package com.phucnghia.kiemphongkim.controller;

import com.phucnghia.kiemphongkim.dto.request.AddToCartRequest;
import com.phucnghia.kiemphongkim.dto.request.UpdateCartItemRequest;
import com.phucnghia.kiemphongkim.dto.response.CartResponse;
import com.phucnghia.kiemphongkim.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public CartResponse getMyCart(Authentication authentication) {
        return cartService.getMyCart(authentication.getName());
    }

    @PostMapping("/add")
    public CartResponse addToCart(Authentication authentication,
                                  @RequestBody @Valid AddToCartRequest request) {
        return cartService.addToCart(authentication.getName(), request);
    }

    @PutMapping("/item")
    public CartResponse updateItem(Authentication authentication,
                                   @RequestBody @Valid UpdateCartItemRequest request) {
        return cartService.updateItem(authentication.getName(), request);
    }

    @DeleteMapping("/item/{cartItemId}")
    public CartResponse removeItem(Authentication authentication,
                                   @PathVariable Long cartItemId) {
        return cartService.removeItem(authentication.getName(), cartItemId);
    }

    @DeleteMapping("/clear")
    public CartResponse clearCart(Authentication authentication) {
        return cartService.clearCart(authentication.getName());
    }
}
