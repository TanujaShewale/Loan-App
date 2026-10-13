package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Customer;

public interface CustomerRepo extends JpaRepository<Customer,Integer>{
	
	public Customer findByCemailAndCpass(String email,String pass);
	
}
