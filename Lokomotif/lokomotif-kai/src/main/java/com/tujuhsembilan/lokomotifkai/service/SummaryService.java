package com.tujuhsembilan.lokomotifkai.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tujuhsembilan.lokomotifkai.model.Summary;
import com.tujuhsembilan.lokomotifkai.repository.mysql.SummaryRepository;

@Service
public class SummaryService {
    private final SummaryRepository summaryRepository;

    public SummaryService(SummaryRepository summaryRepository) {
        this.summaryRepository = summaryRepository;
    }

    public List<Summary> getSummary() {
        return summaryRepository.findAllByOrderByTimestampsDesc();
    }

    public List<Summary> getTop10Summary() {
        return summaryRepository.findTop10ByOrderByTimestampsDesc();
    }
}
