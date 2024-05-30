package com.template.data.dto.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerResponse {
    private Integer customerId;
    private String customerCode;
    private String customerPic;
    private String customerName;
    private String customerPhone;
    private String customerAddress;
    private Boolean isActive;
    private LocalDate lastOrderDate;
}
