package com.tujuhsembilan.lokomotifkai.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tujuhsembilan.lokomotifkai.model.Locomotive;
import com.tujuhsembilan.lokomotifkai.service.LokomotifService;

@RestController
@RequestMapping("/locomotive-management")
public class LokomotifController {
    private final LokomotifService lokomotifService;

    public LokomotifController(LokomotifService lokomotifService) {
        this.lokomotifService = lokomotifService;
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Locomotive>> getAllLocomotives(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(lokomotifService.getAllLocomotives(params));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Locomotive>> getLocomotives() {
        return ResponseEntity.ok(lokomotifService.getLocomotives());
    }
}
