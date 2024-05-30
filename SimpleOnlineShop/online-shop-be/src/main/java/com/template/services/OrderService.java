package com.template.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.template.data.MessageProperties;
import com.template.data.dto.request.OrderItemRequest;
import com.template.data.dto.request.OrderRequest;
import com.template.data.dto.response.ApiResponse;
import com.template.data.dto.response.CustomerResponse;
import com.template.data.dto.response.OrderItemResponse;
import com.template.data.dto.response.OrderResponse;
import com.template.models.Customer;
import com.template.models.Item;
import com.template.models.Order;
import com.template.models.OrderItem;
import com.template.models.OrderItemKey;
import com.template.repositories.CustomerRepository;
import com.template.repositories.ItemRepository;
import com.template.repositories.OrderItemRepository;
import com.template.repositories.OrderRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private MessageProperties messageProperties;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ItemRepository itemRepository;

    public ApiResponse<List<OrderResponse>> getOrders() {
        List<OrderResponse> orderResponses = new ArrayList<>();

        try {
            List<Order> orders = orderRepository.findAll();
            for (Order order : orders) {
                OrderResponse response = orderResponseBuilder(order);
                orderResponses.add(response);
            }

            return responseBuilder(orderResponses, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<OrderResponse> getOrder(String id) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException();
            }

            Order order = orderRepository.getByOrderId(Integer.parseInt(id));
            if (order == null) {
                throw new EntityNotFoundException(messageProperties.getMessage("order.not.found"));
            }

            OrderResponse response = orderResponseBuilder(order);
            return responseBuilder(response, HttpStatus.OK.value(), HttpStatus.OK.name());
        } catch (Exception e) {
            return responseBuilder(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
    }

    public ApiResponse<OrderResponse> addOrder(OrderRequest request) {
        Customer customer = customerRepository.getByCustomerId(request.getCustomerId());

        Order newOrder = Order.builder()
                .orderCode("ORDER-" + randomNumber())
                .orderDate(LocalDateTime.now())
                .customer(customer)
                .build();

        try {
            Order order = orderRepository.save(newOrder);
            if (!ObjectUtils.isEmpty(order)) {
                for (OrderItemRequest orderItem : request.getItems()) {
                    Item item = itemRepository.getByItemId(orderItem.getItemId());

                    OrderItem orderedItem = OrderItem.builder()
                            .id(new OrderItemKey(order.getOrderId(), orderItem.getItemId()))
                            .quantity(orderItem.getQuantity())
                            .itemPrice(item.getItemPrice())
                            .order(order)
                            .item(item)
                            .build();

                    orderItemRepository.save(orderedItem);
                }
            }

            customer.setLastOrderDate(LocalDate.now());
            customerRepository.save(customer);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return responseBuilder(null, HttpStatus.CREATED.value(), HttpStatus.CREATED.name());
    }

    public ApiResponse<OrderResponse> updateOrder(String id, OrderRequest request) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException("Id is empty");
            }

            Order order = orderRepository.getByOrderId(Integer.parseInt(id));
            if (order == null) {
                throw new EntityNotFoundException("Not found");
            }

            // Update Order Data
            order.setCustomer(customerRepository.getByCustomerId(request.getCustomerId()));
            order.setTotalPrice(request.getTotalPrice());
            orderRepository.save(order);

            // Set Order Item
            orderItemRepository.deleteByOrder_OrderId(Integer.parseInt(id));
            for (OrderItemRequest orderItem : request.getItems()) {
                Item item = itemRepository.getByItemId(orderItem.getItemId());

                OrderItem orderedItem = OrderItem.builder()
                        .id(new OrderItemKey(order.getOrderId(), orderItem.getItemId()))
                        .quantity(orderItem.getQuantity())
                        .itemPrice(item.getItemPrice())
                        .order(order)
                        .item(item)
                        .build();

                orderItemRepository.save(orderedItem);
            }

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return responseBuilder(null, HttpStatus.OK.value(), HttpStatus.OK.name());
    }

    public ApiResponse<OrderResponse> deleteOrder(String id) {
        try {
            if (id.isEmpty()) {
                throw new EntityNotFoundException();
            }

            Order order = orderRepository.getByOrderId(Integer.parseInt(id));
            if (order == null) {
                throw new EntityNotFoundException();
            }

            orderItemRepository.deleteByOrder_OrderId(Integer.parseInt(id));
            orderRepository.deleteById(Integer.parseInt(id));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return responseBuilder(null, HttpStatus.OK.value(), HttpStatus.OK.name());
    }

    protected OrderResponse orderResponseBuilder(Order order) {
        List<OrderItemResponse> orderItemResponses = new ArrayList<>();

        try {
            List<OrderItem> orderItems = orderItemRepository.getByOrder_OrderId(order.getOrderId());
            for (OrderItem orderItem : orderItems) {
                OrderItemResponse response = orderItemResponseBuilder(orderItem);
                orderItemResponses.add(response);
            }
        } catch (Exception e) {
            throw new RuntimeException();
        }

        CustomerResponse customer = CustomerResponse.builder().customerId(order.getCustomer().getCustomerId())
                .customerName(order.getCustomer().getCustomerName())
                .customerPhone(order.getCustomer().getCustomerPhone())
                .build();

        return OrderResponse.builder()
                .orderId(order.getOrderId())
                .orderCode(order.getOrderCode())
                .orderDate(order.getOrderDate())
                .totalPrice(order.getTotalPrice())
                .customer(customer)
                .items(orderItemResponses)
                .build();
    }

    protected OrderItemResponse orderItemResponseBuilder(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .orderId(orderItem.getOrder().getOrderId())
                .itemId(orderItem.getItem().getItemId())
                .itemPrice(orderItem.getItemPrice())
                .quantity(orderItem.getQuantity())
                .subTotal(orderItem.getQuantity() * orderItem.getItemPrice())
                .build();
    }

    protected <T> ApiResponse<T> responseBuilder(T data, int statusCode,
            String statusMessage) {
        return ApiResponse.<T>builder()
                .data(data)
                .statusCode(statusCode)
                .statusMessage(statusMessage)
                .build();
    }

    protected String randomNumber() {
        Random random = new Random();
        int randomNumber = random.nextInt(1000000000);
        return String.format("%08d", randomNumber);
    }
}
