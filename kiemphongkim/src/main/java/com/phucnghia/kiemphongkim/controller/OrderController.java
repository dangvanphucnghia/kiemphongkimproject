package com.phucnghia.kiemphongkim.controller;

import com.phucnghia.kiemphongkim.dto.request.CreateOrderRequest;
import com.phucnghia.kiemphongkim.dto.response.OrderResponse;
import com.phucnghia.kiemphongkim.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // User tạo đơn hàng từ giỏ
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(Authentication authentication,
                                                     @RequestBody @Valid CreateOrderRequest request) {
        OrderResponse res = orderService.createOrderFromCart(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    // Đơn hàng của user đang login
    @GetMapping("/my")
    public List<OrderResponse> getMyOrders(Authentication authentication) {
        return orderService.getMyOrders(authentication.getName());
    }

    @GetMapping("/{id}")
    public OrderResponse getById(Authentication authentication,
                                 @PathVariable Long id) {
        return orderService.getOrderById(authentication.getName(), id);
    }

    // Admin - toàn bộ đơn hàng
    @GetMapping
    public List<OrderResponse> getAll() {
        return orderService.getAllOrders();
    }

    // Admin - cập nhật trạng thái
    @PatchMapping("/{id}/status")
    public OrderResponse updateStatus(@PathVariable Long id,
                                      @RequestParam String status) {
        return orderService.updateStatus(id, status);
    }
}
