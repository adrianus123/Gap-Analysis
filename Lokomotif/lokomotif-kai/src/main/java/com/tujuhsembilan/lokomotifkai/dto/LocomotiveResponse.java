package com.tujuhsembilan.lokomotifkai.dto;

import org.springframework.data.domain.Page;

import com.tujuhsembilan.lokomotifkai.model.Locomotive;

import lombok.Data;

@Data
public class LocomotiveResponse {
    private Page<Locomotive> data;
    private int totalPages;
    private long totalItems;
}
