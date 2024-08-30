package com.tujuhsembilan.lokomotifkai.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("locomotives")
public class Locomotive {
    @Id
    private String id;
    private String locoCode;
    private String locoName;
    private Double locoWeight;
    private Double locoLength;
    private Double locoWidth;
    private Double locoHeight;
    private String locoStatus;
    private String timestamps;
}
