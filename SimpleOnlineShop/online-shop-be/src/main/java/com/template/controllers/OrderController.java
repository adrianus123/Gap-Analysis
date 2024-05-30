package com.template.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.data.dto.request.OrderRequest;
import com.template.data.dto.response.ApiResponse;
import com.template.data.dto.response.OrderResponse;
import com.template.services.OrderService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public ApiResponse<List<OrderResponse>> getOrders() {
        return orderService.getOrders();
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderResponse> getOrder(@PathVariable("id") String id) {
        return orderService.getOrder(id);
    }

    @PostMapping
    public ApiResponse<OrderResponse> addOrder(@RequestBody OrderRequest request) {
        return orderService.addOrder(request);
    }

    @PutMapping("/{id}")
    public ApiResponse<OrderResponse> updateOrder(@PathVariable("id") String id, @RequestBody OrderRequest request) {
        return orderService.updateOrder(id, request);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<OrderResponse> deleteOrder(@PathVariable("id") String id) {
        return orderService.deleteOrder(id);
    }
}
