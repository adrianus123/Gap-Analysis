package com.tujuhsembilan.lokomotifkai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.tujuhsembilan.lokomotifkai.repository.mysql", entityManagerFactoryRef = "entityManagerFactory")
public class MySQLConfig {

}
