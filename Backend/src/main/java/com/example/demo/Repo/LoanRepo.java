package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Loan;



public interface LoanRepo extends JpaRepository<Loan,Integer> {
	
	
	public List<Loan>  findByCustomerId(int customer);
	public List<Loan>  findByStatus(String status);
	
}
