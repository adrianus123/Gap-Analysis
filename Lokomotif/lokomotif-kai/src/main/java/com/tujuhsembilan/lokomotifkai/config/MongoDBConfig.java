package com.tujuhsembilan.lokomotifkai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.tujuhsembilan.lokomotifkai.repository.mongodb", mongoTemplateRef = "mongoTemplate")
public class MongoDBConfig {

}
