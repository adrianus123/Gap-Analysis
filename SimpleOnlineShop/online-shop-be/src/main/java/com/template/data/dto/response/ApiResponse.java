package com.template.data.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponse<T> {
    private T data;
    private Integer statusCode;
    private String statusMessage;
}
