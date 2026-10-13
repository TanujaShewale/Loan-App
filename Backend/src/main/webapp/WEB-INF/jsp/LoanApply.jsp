<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apply for Loan | Apex Lending</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --sidebar-bg: #0f2027;
            --main-bg: #f4f7f6;
            --accent-blue: #3a7bd5;
            --accent-gradient: linear-gradient(90deg, #00d2ff, #3a7bd5);
            --white: #ffffff;
            --text-dark: #2c3e50;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            display: flex;
            background-color: var(--main-bg);
            min-height: 100vh;
        }

        /* --- Left Sidebar (Kept exactly the same) --- */
        .sidebar {
            width: 260px;
            background: var(--sidebar-bg);
            color: white;
            display: flex;
            flex-direction: column;
            padding: 30px 20px;
            position: fixed;
            height: 100%;
        }

        .sidebar .logo {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 50px;
            padding-left: 10px;
        }

        .sidebar .logo span { color: #00d2ff; }

        .nav-menu { list-style: none; }

        .nav-item {
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
            color: #bdc3c7;
            text-decoration: none;
            display: block;
        }

        .nav-item:hover, .nav-item.active {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }

        /* --- Right Side Content (Form Section) --- */
        .main-content {
            margin-left: 260px;
            width: calc(100% - 260px);
            padding: 40px;
            display: flex;
            flex-direction: column;
        }

        .header {
            margin-bottom: 30px;
        }

        .form-card {
            background: var(--white);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            max-width: 800px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .input-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 15px;
        }

        .full-width {
            grid-column: span 2;
        }

        label {
            font-weight: 600;
            color: var(--text-dark);
            font-size: 0.9rem;
        }

        input, select, textarea {
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
            transition: 0.3s;
        }

        input:focus, select:focus {
            border-color: var(--accent-blue);
        }

        .btn-submit {
            background: var(--accent-gradient);
            color: white;
            border: none;
            padding: 15px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 700;
            font-size: 1rem;
            margin-top: 20px;
            transition: 0.3s;
        }

        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(58, 123, 213, 0.4);
        }

        .section-title {
            margin: 20px 0 10px 0;
            color: var(--accent-blue);
            font-size: 1rem;
            font-weight: 700;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
        }
    </style>
</head>
<body>

    <div class="sidebar">
        <div class="logo">Apex<span>Lending</span></div>
        <nav class="nav-menu">
            <a href="dashboard.jsp" class="nav-item">Overview</a>
            <a href="/Applyed/${pp}"class="nav-item">My Loans</a>
            <a href="#" class="nav-item active">Apply For Loan</a>
            <a href="#" class="nav-item">Payments</a>
            <a href="#" class="nav-item">Calculators</a>
            <a href="#" class="nav-item">Settings</a>
            <a href="/" class="nav-item" style="margin-top: 100px; color: #e74c3c;">Logout</a>
        </nav>
    </div>

    <div class="main-content">
        <div class="header">
            <h1>Loan Application</h1>
            <p style="color: #7f8c8d;">Complete the details below to start your application process.</p>
        </div>

        <div class="form-card">
            <form action="/savedloan/${pp}"method="POST" onsubmit="return validateLoanForm()">
                
                <div class="form-grid">
                    <div class="section-title full-width">Loan Details</div>
                    
                   
                     <div class="input-group">
                        
                        <input type="number" name="customer.id" value="${pp}" required>
                    </div>
                    <div class="input-group">
                        <label for="loanType">Loan Category</label>
                        <select id="loanType" name="loancateg" required>
                            <option value="">Choose Loan Type</option>
                            <option value="Personal">Personal Loan</option>
                            <option value="Home">Home Loan</option>
                            <option value="Car">Car Loan</option>
                            <option value="Education">Education Loan</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <label for="amount">Required Amount ($)</label>
                        <input type="number" id="amount" name="amount" placeholder="e.g., 5000" required>
                    </div>

                    <div class="input-group">
                        <label for="tenure">Tenure (Months)</label>
                        <input type="number" id="tenure" name="ten" placeholder="e.g., 12" required>
                    </div>

                    <div class="input-group">
                        <label for="purpose">Purpose of Loan</label>
                        <input type="text" id="purpose" name="loanpur" placeholder="e.g., Medical, Travel" required>
                    </div>

                    <div class="section-title full-width">Employment Information</div>

                    <div class="input-group">
                        <label for="occupation">Occupation</label>
                        <select id="occupation" name="occup" required>
                            <option value="Salaried">Salaried</option>
                            <option value="Self-Employed">Self-Employed</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <label for="income">Monthly Income ($)</label>
                        <input type="number" id="income" name="monthinc" placeholder="e.g., 3000" required>
                    </div>

                    <div class="input-group full-width">
                        <label for="address">Current Residential Address</label>
                        <textarea id="address" name="ladd" rows="3" placeholder="Enter your full address" required></textarea>
                    </div>

                    <button type="submit" class="btn-submit full-width">Submit Application</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        function validateLoanForm() {
            const amount = document.getElementById('amount').value;
            const tenure = document.getElementById('tenure').value;

            if (amount <= 0) {
                alert("Please enter a valid amount.");
                return false;
            }
            if (tenure <= 0) {
                alert("Please enter a valid tenure.");
                return false;
            }
            return true;
        }
    </script>
</body>
</html>