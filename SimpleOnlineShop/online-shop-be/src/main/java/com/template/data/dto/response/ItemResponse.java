package com.template.data.dto.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemResponse {
    private Integer itemId;
    private String itemCode;
    private String itemPic;
    private String itemName;
    private Integer itemStock;
    private Double itemPrice;
    private Boolean isAvailable;
    private LocalDate lastRestock;
}
