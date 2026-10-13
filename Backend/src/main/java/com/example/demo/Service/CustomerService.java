package com.example.demo.Service;

import java.util.List;

import com.example.demo.Model.Customer;
import com.example.demo.Model.Loan;


public interface CustomerService {
	
	public void savedata(Customer c1);
	
	public List<Customer> getData();
	
	public void delete(int id );

	public List<Customer> getsingledata(int id);
	
	public Customer loginAuth(String email,String pass);
	
	public void saveloan(Loan l1);
	
	public List<Loan> getloanData();
	
	public List<Loan> getloanDatabyId(int id);
	public void delLoanRecord(int lid);
	public List<Loan> getsingleloan(int id);
}
