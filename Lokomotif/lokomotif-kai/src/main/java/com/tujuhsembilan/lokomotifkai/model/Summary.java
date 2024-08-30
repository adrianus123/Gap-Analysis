package com.tujuhsembilan.lokomotifkai.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "summary")
@EntityListeners(AuditingEntityListener.class)
public class Summary {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "summary_id")
    private Integer summaryId;

    @Column(name = "total_loco")
    private Long totalLoco;

    @Column(name = "total_loco_active")
    private Long totalLocoActive;

    @Column(name = "total_loco_in_active")
    private Long totalLocoInActive;

    @CreatedDate
    @Column(name = "timestamps")
    private LocalDateTime timestamps;
}
