package com.template.data.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CreateUpdateCustomer {
    private String customerName;
    private MultipartFile customerPic = null;
    private String customerPhone;
    private String customerAddress;
}
