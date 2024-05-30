package com.template.data.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemResponse {
    private Integer orderId;
    private Integer itemId;
    private Integer quantity;
    private Double itemPrice;
    private Double subTotal;
}
