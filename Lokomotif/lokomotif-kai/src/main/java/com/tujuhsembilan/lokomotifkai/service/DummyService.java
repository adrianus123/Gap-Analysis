package com.tujuhsembilan.lokomotifkai.service;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.tujuhsembilan.lokomotifkai.dto.DummyDto;

@Service
public class DummyService {
    private static final String EXPRESS_API_URL = "http://localhost:3000";
    Logger logger = Logger.getLogger(getClass().getName());

    public String sendDummyDataScheduler(DummyDto param) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> dataToSend = new HashMap<>();
        dataToSend.put("data", param);

        ResponseEntity<String> response = restTemplate.postForEntity(EXPRESS_API_URL + "/receive-data", dataToSend,
                String.class);

        return response.getBody();
    }
}
