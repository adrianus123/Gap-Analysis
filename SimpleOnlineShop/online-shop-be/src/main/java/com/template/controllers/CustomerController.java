package com.template.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.data.dto.request.CreateUpdateCustomer;
import com.template.data.dto.response.ApiResponse;
import com.template.data.dto.response.CustomerResponse;
import com.template.services.CustomerService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping
    public ApiResponse<List<CustomerResponse>> getCustomers() {
        return customerService.getCustomers();
    }

    @GetMapping("/{id}")
    public ApiResponse<CustomerResponse> getCustomer(@PathVariable("id") String id) {
        return customerService.getCustomer(id);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResponse<CustomerResponse> addCustomer(@ModelAttribute CreateUpdateCustomer request) throws IOException {
        return customerService.addCustomer(request);
    }

    @PutMapping(path = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResponse<CustomerResponse> updateCustomer(@PathVariable("id") String id,
            @ModelAttribute CreateUpdateCustomer request) {
        return customerService.updateCustomer(id, request);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<CustomerResponse> deleteCustomer(@PathVariable("id") String id) {
        return customerService.deleteCustomer(id);
    }
}
