package com.template.data.dto.request;

import lombok.Data;

@Data
public class OrderItemRequest {
    private Integer itemId;
    private Integer quantity;
}
