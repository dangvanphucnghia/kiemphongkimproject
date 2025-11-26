package com.phucnghia.kiemphongkim.service.impl;

import com.phucnghia.kiemphongkim.dto.request.CreateOrderRequest;
import com.phucnghia.kiemphongkim.dto.response.OrderItemResponse;
import com.phucnghia.kiemphongkim.dto.response.OrderResponse;
import com.phucnghia.kiemphongkim.entity.*;
import com.phucnghia.kiemphongkim.repository.*;
import com.phucnghia.kiemphongkim.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final VoucherRepository voucherRepository;

    @Override
    public OrderResponse createOrderFromCart(String username, CreateOrderRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Giỏ hàng trống"));

        List<CartItem> cartItems = cartItemRepository.findByCart_Id(cart.getId());
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Giỏ hàng trống");
        }

        int total = cartItems.stream()
                .mapToInt(i -> i.getQuantity() * i.getPrice())
                .sum();

        Voucher voucher = null;
        if (request.getVoucherCode() != null && !request.getVoucherCode().isBlank()) {
            voucher = voucherRepository.findByCode(request.getVoucherCode())
                    .orElseThrow(() -> new IllegalArgumentException("Voucher không tồn tại"));
            // TODO: validate minOrder, expiredAt, usageLimit, level, ...
            if (voucher.getMinOrder() != null && total < voucher.getMinOrder()) {
                throw new IllegalArgumentException("Đơn hàng không đạt giá trị tối thiểu để áp dụng voucher");
            }
            if (voucher.getDiscountValue() != null) {
                total = Math.max(0, total - voucher.getDiscountValue());
            }
        }

        Order order = Order.builder()
                .user(user)
                .totalPrice(total)
                .voucher(voucher)
                .status("PENDING")
                .createdAt(new Date())
                .build();

        order = orderRepository.save(order);

        for (CartItem ci : cartItems) {
            OrderItem oi = OrderItem.builder()
                    .order(order)
                    .product(ci.getProduct())
                    .quantity(ci.getQuantity())
                    .price(ci.getPrice())
                    .build();
            orderItemRepository.save(oi);
        }

        // clear cart
        cartItemRepository.deleteAll(cartItems);

        return toOrderResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(String username, Long orderId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Đơn hàng không tồn tại"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Bạn không có quyền xem đơn hàng này");
        }

        return toOrderResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));

        return orderRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::toOrderResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::toOrderResponse)
                .toList();
    }

    @Override
    public OrderResponse updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Đơn hàng không tồn tại"));

        order.setStatus(status);
        order = orderRepository.save(order);

        return toOrderResponse(order);
    }

    private OrderResponse toOrderResponse(Order o) {
        List<OrderItem> items = orderItemRepository.findByOrder_Id(o.getId());

        List<OrderItemResponse> itemResponses = items.stream()
                .map(i -> OrderItemResponse.builder()
                        .id(i.getId())
                        .productId(i.getProduct().getId())
                        .productName(i.getProduct().getName())
                        .quantity(i.getQuantity())
                        .price(i.getPrice())
                        .totalPrice(i.getPrice() * i.getQuantity())
                        .build())
                .toList();

        return OrderResponse.builder()
                .id(o.getId())
                .userId(o.getUser().getId())
                .totalPrice(o.getTotalPrice())
                .status(o.getStatus())
                .voucherCode(o.getVoucher() != null ? o.getVoucher().getCode() : null)
                .items(itemResponses)
                .createdAt(o.getCreatedAt())
                .build();
    }
}
