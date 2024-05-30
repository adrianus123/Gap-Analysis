package com.template.data.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponse {
    private Integer orderId;
    private String orderCode;
    private CustomerResponse customer;
    private LocalDateTime orderDate;
    private Double totalPrice;
    private List<OrderItemResponse> items;
}
