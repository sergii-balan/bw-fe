package com.balan.sergii.bw.fe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
//@EnableAutoConfiguration(exclude={RepositoryRestMvcAutoConfiguration.class})
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class, RepositoryRestMvcAutoConfiguration.class})
public class BwApp {

	public static void main(String[] args) {
        SpringApplication.run(BwApp.class, args);
	}
}
