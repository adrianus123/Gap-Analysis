package com.template.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.template.models.OrderItem;
import com.template.models.OrderItemKey;

import jakarta.transaction.Transactional;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemKey> {
    OrderItem getById(OrderItemKey id);

    @Transactional
    void deleteByOrder_OrderId(int id);

    List<OrderItem> getByOrder_OrderId(int id);
}
