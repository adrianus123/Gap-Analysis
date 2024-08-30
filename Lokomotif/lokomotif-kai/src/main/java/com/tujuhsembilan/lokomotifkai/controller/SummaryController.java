package com.tujuhsembilan.lokomotifkai.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tujuhsembilan.lokomotifkai.model.Summary;
import com.tujuhsembilan.lokomotifkai.service.SummaryService;

@RestController
@RequestMapping("/summary-management")
public class SummaryController {
    private final SummaryService summaryService;

    public SummaryController(SummaryService summaryService) {
        this.summaryService = summaryService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Summary>> getSummary() {
        return ResponseEntity.ok(summaryService.getSummary());
    }

    @GetMapping("/latest")
    public ResponseEntity<List<Summary>> getTop10Summary() {
        return ResponseEntity.ok(summaryService.getTop10Summary());
    }
}
