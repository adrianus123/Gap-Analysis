package com.template.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.template.data.MessageProperties;
import com.template.data.dto.request.CreateUpdateCustomer;
import com.template.data.dto.response.ApiResponse;
import com.template.data.dto.response.CustomerResponse;
import com.template.models.Customer;
import com.template.repositories.CustomerRepository;
import com.template.services.minio.MinioService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MessageProperties messageProperties;

    @Autowired
    private MinioService minioService;

    @Value("${minio.bucketName}")
    private String bucketName;

    public ApiResponse<List<CustomerResponse>> getCustomers() {
        List<CustomerResponse> customerResponses = new ArrayList<>();

        try {
            List<Customer> customers = customerRepository.findAll();
            for (Customer customer : customers) {
                if (customer.getIsActive()) {
                    CustomerResponse response = customerResponseBuilder(customer);
                    customerResponses.add(response);
                }
            }

            return responseBuilder(customerResponses, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<CustomerResponse> getCustomer(String id) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException();
            }

            Customer customer = customerRepository.getByCustomerId(Integer.parseInt(id));
            if (customer == null || !customer.getIsActive()) {
                throw new EntityNotFoundException(messageProperties.getMessage("customer.not.found"));
            }

            CustomerResponse response = customerResponseBuilder(customer);
            return responseBuilder(response, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<CustomerResponse> addCustomer(CreateUpdateCustomer request) {
        Customer newCustomer = Customer.builder()
                .customerName(request.getCustomerName())
                .customerPic(imageName(request.getCustomerPic(), request.getCustomerName()))
                .customerCode("CUS-" + randomNumber())
                .customerAddress(request.getCustomerAddress())
                .customerPhone(request.getCustomerPhone())
                .isActive(true)
                .build();

        try {
            Customer customer = customerRepository.save(newCustomer);
            CustomerResponse response = customerResponseBuilder(customer);

            return responseBuilder(response, HttpStatus.CREATED.value(), HttpStatus.CREATED.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<CustomerResponse> updateCustomer(String id, CreateUpdateCustomer request) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException();
            }

            Customer customer = customerRepository.getByCustomerId(Integer.parseInt(id));
            if (customer == null || !customer.getIsActive()) {
                throw new EntityNotFoundException(messageProperties.getMessage("customer.not.found"));
            }

            // Delete existing image in minio
            minioService.delete(customer.getCustomerPic(), bucketName);

            // Update customer data
            customer.setCustomerName(request.getCustomerName());
            customer.setCustomerPic(imageName(request.getCustomerPic(), request.getCustomerName()));
            customer.setCustomerPhone(request.getCustomerPhone());
            customer.setCustomerAddress(request.getCustomerAddress());
            customerRepository.save(customer);

            CustomerResponse response = customerResponseBuilder(customer);

            return responseBuilder(response, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<CustomerResponse> deleteCustomer(String id) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException();
            }

            Customer customer = customerRepository.getByCustomerId(Integer.parseInt(id));
            if (customer == null || !customer.getIsActive()) {
                throw new EntityNotFoundException(messageProperties.getMessage("customer.not.found"));
            }

            // Set customer status inactive
            customer.setIsActive(false);
            customerRepository.save(customer);

            return responseBuilder(null, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    protected <T> ApiResponse<T> responseBuilder(T data, int statusCode,
            String statusMessage) {
        return ApiResponse.<T>builder()
                .data(data)
                .statusCode(statusCode)
                .statusMessage(statusMessage)
                .build();
    }

    protected CustomerResponse customerResponseBuilder(Customer customer) {
        return CustomerResponse.builder()
                .customerId(customer.getCustomerId())
                .customerCode(customer.getCustomerCode())
                .customerPic(generateLink(customer.getCustomerPic()))
                .customerName(customer.getCustomerName())
                .customerPhone(customer.getCustomerPhone())
                .customerAddress(customer.getCustomerAddress())
                .isActive(customer.getIsActive())
                .lastOrderDate(customer.getLastOrderDate())
                .build();
    }

    protected String randomNumber() {
        Random random = new Random();
        int randomNumber = random.nextInt(1000000000);
        return String.format("%08d", randomNumber);
    }

    protected String imageName(MultipartFile file, String name) {
        return minioService.upload(file, bucketName, name);
    }

    protected String generateLink(String objectName) {
        try {
            return minioService.getLink(bucketName, objectName, 3600L);
        } catch (Exception e) {
            return null;
        }
    }

}
