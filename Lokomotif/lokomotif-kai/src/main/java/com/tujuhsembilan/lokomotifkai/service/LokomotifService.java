package com.tujuhsembilan.lokomotifkai.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tujuhsembilan.lokomotifkai.dto.GeneralResponse;
import com.tujuhsembilan.lokomotifkai.model.Locomotive;
import com.tujuhsembilan.lokomotifkai.model.Summary;
import com.tujuhsembilan.lokomotifkai.repository.mongodb.LokomotifRepository;
import com.tujuhsembilan.lokomotifkai.repository.mysql.SummaryRepository;

@Service
public class LokomotifService {
    Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final SummaryRepository summaryRepository;
    private final LokomotifRepository lokomotifRepository;

    public LokomotifService(SummaryRepository summaryRepository, LokomotifRepository lokomotifRepository) {
        this.summaryRepository = summaryRepository;
        this.lokomotifRepository = lokomotifRepository;
    }

    public Page<Locomotive> getAllLocomotives(Map<String, String> params) {
        int page = Integer.parseInt(params.get("page"));
        int size = Integer.parseInt(params.get("size"));

        Pageable pageable = PageRequest.of(page, size);
        return lokomotifRepository.findAll(pageable);
    }

    public List<Locomotive> getLocomotives() {
        return lokomotifRepository.findAll();
    }

    public Summary storeSummary() {
        long totalLoco = lokomotifRepository.count();
        long totalLocoActive = lokomotifRepository.countByLocoStatus("Beroperasi");
        long totalLocoInActive = lokomotifRepository.countByLocoStatus("Tidak Beroperasi");

        Summary summary = new Summary();
        summary.setTotalLoco(totalLoco);
        summary.setTotalLocoActive(totalLocoActive);
        summary.setTotalLocoInActive(totalLocoInActive);
        summaryRepository.save(summary);

        logger.info("Summary successfully saved to database");
        return summary;
    }

    public GeneralResponse getSummary() {
        long totalLoco = lokomotifRepository.count();
        long totalLocoActive = lokomotifRepository.countByLocoStatus("Beroperasi");
        long totalLocoInActive = lokomotifRepository.countByLocoStatus("Tidak Beroperasi");

        GeneralResponse summary = new GeneralResponse();
        summary.setTotalLoco(totalLoco);
        summary.setTotalLocoActive(totalLocoActive);
        summary.setTotalLocoInActive(totalLocoInActive);

        return summary;

    }
}
