
package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.Customer;
import com.example.demo.Model.Loan;
import com.example.demo.Service.CustomerService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    CustomerService s1;

    // Register Customer
    @PostMapping("/customers")
    public String registerCustomer(@RequestBody Customer c1) {

        s1.savedata(c1);
        return "Customer Registered Successfully";
    }

    // Get All Customers
    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {

        return s1.getData();
    }

    // Get Customer By ID
    @GetMapping("/customers/{id}")
    public List<Customer> getCustomerById(@PathVariable int id) {

        return s1.getsingledata(id);
    }
    @PutMapping("/customers/{id}")
    public Customer updateCustomer(@PathVariable int id, @RequestBody Customer c1) {

        Customer existingCustomer = s1.getsingledata(id).get(0);

        existingCustomer.setCname(c1.getCname());
        existingCustomer.setCemail(c1.getCemail());
        existingCustomer.setCphone(c1.getCphone());
        existingCustomer.setCpass(c1.getCpass());
        existingCustomer.setCcpass(c1.getCcpass());
        existingCustomer.setCadd(c1.getCadd());

        s1.savedata(existingCustomer);

        return existingCustomer;
    }

    // Delete Customer
    @DeleteMapping("/customers/{id}")
    public String deleteCustomer(@PathVariable int id) {

        s1.delete(id);
        return "Customer Deleted Successfully";
    }

    // Login
    @PostMapping("/login")
    public Customer login(@RequestBody Customer c1){

        Customer customer = s1.loginAuth(c1.getCemail(), c1.getCpass());

        if(customer == null){
            throw new RuntimeException("Invalid Email or Password");
        }

        return customer;
    }

    // Apply Loan
    @PostMapping("/customers/{id}/loan")
    public String applyLoan(@PathVariable int id, @RequestBody Loan l1) {

        Customer c = s1.getsingledata(id).get(0);
        l1.setCustomer(c);

        s1.saveloan(l1);

        return "Loan Applied Successfully";
    }

    // Get All Loans
    @GetMapping("/loans")
    public List<Loan> getAllLoans() {

        return s1.getloanData();
    }

    // Get Loan By Customer ID
    @GetMapping("/loans/customer/{id}")
    public List<Loan> getLoanByCustomerId(@PathVariable int id) {

        return s1.getloanDatabyId(id);
    }

    // Delete Loan
    @DeleteMapping("/loan/{lid}")
    public String deleteLoan(@PathVariable int lid) {

        s1.delLoanRecord(lid);
        return "Loan Withdrawn Successfully";
    }

}