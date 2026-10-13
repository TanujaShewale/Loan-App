package com.example.demo.Dao;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Loan;
import com.example.demo.Repo.LoanRepo;
import com.example.demo.Service.AdminService;

@Service
public class AdminDao implements AdminService {
	@Autowired
	LoanRepo l1;

	@Override
	public List<Loan> getbyStatus(String status) {
		
		return l1.findByStatus(status);
	}

	@Override
	public void rejectapp(int id) {
		List<Loan> lon=l1.findAllById(Collections.singleton(id));
		Loan lon1=lon.get(0);
		lon1.setStatus("Rejected");
		l1.save(lon1);
	}

	@Override
	public List<Loan> getsingledata(int id) {
		
		return l1.findAllById(Collections.singleton(id));
	}

	@Override
	public void approvApp(int id) {
		
		List<Loan> lon=l1.findAllById(Collections.singleton(id));
		Loan lon1=lon.get(0);
		lon1.setStatus("Approved");
		l1.save(lon1);
	}
	
}
