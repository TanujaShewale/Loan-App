
package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.Admin;
import com.example.demo.Model.Loan;
import com.example.demo.Service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    AdminService s3;

    // Admin Login
    @PostMapping("/login")
    public String adminLogin(@RequestBody Admin a1){

        if(a1.getAusername().equals("Umesh") && a1.getApassword().equals("Umesh@123")){
            return "Admin Login Successful";
        }

        return "Invalid Username or Password";
    }

    // Get Pending Loan Applications
    @GetMapping("/loans/pending")
    public List<Loan> getPendingLoans(){

        return s3.getbyStatus("Pending");
    }

    // Get Approved Loans
    @GetMapping("/loans/approved")
    public List<Loan> getApprovedLoans(){

        return s3.getbyStatus("Approved");
    }

    // Get Rejected Loans
    @GetMapping("/loans/rejected")
    public List<Loan> getRejectedLoans(){

        return s3.getbyStatus("Rejected");
    }

    // Approve Loan
    @PutMapping("/loan/{id}/approve")
    public String approveLoan(@PathVariable int id){

        s3.approvApp(id);

        return "Loan Approved Successfully";
    }

    // Reject Loan
    @PutMapping("/loan/{id}/reject")
    public String rejectLoan(@PathVariable int id){

        s3.rejectapp(id);

        return "Loan Rejected Successfully";
    }

}
