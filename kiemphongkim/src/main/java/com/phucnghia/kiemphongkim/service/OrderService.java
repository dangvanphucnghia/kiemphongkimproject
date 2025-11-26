package com.phucnghia.kiemphongkim.service;

import com.phucnghia.kiemphongkim.dto.request.CreateOrderRequest;
import com.phucnghia.kiemphongkim.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse createOrderFromCart(String username, CreateOrderRequest request);

    OrderResponse getOrderById(String username, Long orderId);   // đảm bảo thuộc về user

    List<OrderResponse> getMyOrders(String username);

    // Cho admin:
    List<OrderResponse> getAllOrders();

    OrderResponse updateStatus(Long orderId, String status);
}
