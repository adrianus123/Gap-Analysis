package com.template.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.data.dto.request.ItemRequest;
import com.template.data.dto.response.ApiResponse;
import com.template.data.dto.response.ItemResponse;
import com.template.services.ItemService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/items")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping
    public ApiResponse<List<ItemResponse>> getItems() {
        return itemService.getItems();
    }

    @GetMapping("/{id}")
    public ApiResponse<ItemResponse> getItem(@PathVariable("id") String id) {
        return itemService.getItem(id);
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ApiResponse<ItemResponse> addItem(@ModelAttribute ItemRequest request) {
        return itemService.addItem(request);
    }

    @PutMapping(path = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ApiResponse<ItemResponse> updateItem(@PathVariable("id") String id, @ModelAttribute ItemRequest request) {
        return itemService.updateItem(id, request);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<ItemResponse> deleteItem(@PathVariable("id") String id) {
        return itemService.deleteItem(id);
    }
}
