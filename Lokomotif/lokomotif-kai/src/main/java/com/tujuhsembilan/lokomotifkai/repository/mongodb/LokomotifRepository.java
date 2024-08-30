package com.tujuhsembilan.lokomotifkai.repository.mongodb;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tujuhsembilan.lokomotifkai.model.Locomotive;

@Repository
public interface LokomotifRepository extends MongoRepository<Locomotive, String> {
    long countByLocoStatus(String locoStatus);

}
