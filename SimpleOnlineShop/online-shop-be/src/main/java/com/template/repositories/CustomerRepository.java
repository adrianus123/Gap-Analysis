package com.template.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.template.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer getByCustomerId(int id);
}
