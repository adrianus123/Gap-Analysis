package com.template.data.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CreateUpdateItem {
    private MultipartFile itemPic = null;
    private String itemName;
    private Integer itemStock;
    private Double itemPrice;
}
