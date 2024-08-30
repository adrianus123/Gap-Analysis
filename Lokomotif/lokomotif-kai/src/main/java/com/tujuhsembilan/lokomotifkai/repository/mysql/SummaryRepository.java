package com.tujuhsembilan.lokomotifkai.repository.mysql;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tujuhsembilan.lokomotifkai.model.Summary;

@Repository
public interface SummaryRepository extends JpaRepository<Summary, Integer> {
    List<Summary> findAllByOrderByTimestampsDesc();

    List<Summary> findTop10ByOrderByTimestampsDesc();
}
