package com.template.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.template.models.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Item getByItemId(int id);
}
