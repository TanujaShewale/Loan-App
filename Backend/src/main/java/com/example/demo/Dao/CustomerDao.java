package com.example.demo.Dao;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.demo.Model.Customer;
import com.example.demo.Model.Loan;
import com.example.demo.Repo.CustomerRepo;
import com.example.demo.Repo.LoanRepo;
import com.example.demo.Service.CustomerService;


@Service
public class CustomerDao implements CustomerService {
	
	
	@Autowired
	CustomerRepo jr;
	@Autowired
	LoanRepo lr;
	
	
	@Override
	public void savedata(Customer c1) {
		jr.save(c1);
		
		
	}


	@Override
	public List<Customer> getData() {
		// TODO Auto-generated method stub
		return jr.findAll();
	}


	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		
		jr.deleteById(id);
		
	}


	@Override
	public List<Customer> getsingledata(int id) {
		return jr.findAllById(Collections.singleton(id));
		
	}


	@Override
	public Customer  loginAuth(String email, String pass) {
		
		return jr.findByCemailAndCpass(email, pass);
		
	}

//--------------------------------------------------------------------------------------------------------------------------------------
	@Override
	public void saveloan(Loan l1) {
		lr.save(l1);
		
	}


	@Override
	public List<Loan> getloanData() {
	
		
		return lr.findAll();
	}
	@Override
	public List<Loan> getloanDatabyId(int id) {
	
		
		return lr. findByCustomerId(id);
	}


	@Override
	public void delLoanRecord(int lid) {
		lr.deleteById(lid);
		
	}


	@Override
	public List<Loan> getsingleloan(int id) {
		// TODO Auto-generated method stub
		return lr.findAllById(Collections.singleton(id));
	}




	

}
