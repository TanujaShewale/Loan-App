package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import com.example.demo.Model.Loan;

public interface AdminService {


	public List<Loan> getbyStatus(String Status);
	public List<Loan> getsingledata(int id);
	public void rejectapp(int id);
	public void approvApp(int id);
	
}
