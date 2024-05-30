package com.template.data.dto.request;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequest {
    private Integer customerId;
    private Double totalPrice;
    private List<OrderItemRequest> items;
}
