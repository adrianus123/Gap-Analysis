package com.template.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.template.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order getByOrderId(int id);
}
