package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Loan {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer lid;
	private String loancateg;
	private String amount;
	private int ten;
	private String loanpur;
	private String occup;
	private float monthinc;
	private String ladd ;
	private String status="Pending";
    @ManyToOne
    @JoinColumn(name = "customer_id")   // foreign key column
    @JsonBackReference
    private Customer customer;

	public Integer getLid() {
		return lid;
	}

	public void setLid(Integer lid) {
		this.lid = lid;
	}

	public String getLoancateg() {
		return loancateg;
	}

	public void setLoancateg(String loancateg) {
		this.loancateg = loancateg;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public int getTen() {
		return ten;
	}

	public void setTen(int ten) {
		this.ten = ten;
	}

	public String getLoanpur() {
		return loanpur;
	}

	public void setLoanpur(String loanpur) {
		this.loanpur = loanpur;
	}

	public String getOccup() {
		return occup;
	}

	public void setOccup(String occup) {
		this.occup = occup;
	}

	public float getMonthinc() {
		return monthinc;
	}

	public void setMonthinc(float monthinc) {
		this.monthinc = monthinc;
	}

	public String getLadd() {
		return ladd;
	}

	public void setLadd(String ladd) {
		this.ladd = ladd;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Loan [lid=" + lid + ", loancateg=" + loancateg + ", amount=" + amount + ", ten=" + ten + ", loanpur="
				+ loanpur + ", occup=" + occup + ", monthinc=" + monthinc + ", ladd=" + ladd + ", status=" + status
				+ ", customer=" + customer + "]";
	}

	


	
    
    
	
}
