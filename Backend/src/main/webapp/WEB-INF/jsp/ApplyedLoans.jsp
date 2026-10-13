<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Apex Lending</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --sidebar-bg: #0f2027;
            --main-bg: #f4f7f6;
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

        /* --- Sidebar --- */
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
        }

        .sidebar .logo span { color: #00d2ff; }

        .nav-menu { list-style: none; }

        .nav-item {
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            color: #bdc3c7;
            text-decoration: none;
            display: block;
            transition: 0.3s;
        }

        .nav-item:hover, .nav-item.active {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }

        /* --- Main Content --- */
        .main-content {
            margin-left: 260px;
            width: calc(100% - 260px);
            padding: 40px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .btn-apply {
            background: var(--accent-gradient);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 12px;
            text-decoration: none;
        }

        /* --- Loan Table Section --- */
        .loan-section {
            background: var(--white);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .loan-section h2 {
            margin-bottom: 20px;
            font-size: 1.2rem;
            color: var(--text-dark);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            text-align: left;
            padding: 15px;
            border-bottom: 2px solid #f4f7f6;
            color: #7f8c8d;
            font-size: 0.85rem;
        }

        td {
            padding: 15px;
            border-bottom: 1px solid #f4f7f6;
            font-size: 0.9rem;
            color: var(--text-dark);
        }

        /* --- Warning / Status Button --- */
        .btn-warning {
            background: linear-gradient(90deg, #f39c12, #e67e22);
            color: white;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            border: none;
            cursor: default; /* Since it's showing status, not acting as a link */
        }
        .btn-primary{
        	background: linear-gradient(90deg, #27ae60, #2ecc71);
            color: white;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            border: none;
            cursor: default;
        }
        .with{
        color: white;
        text-decoration: none;
        }
        .newloan{
        color: white;
        	text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="sidebar">
        <div class="logo">Apex<span>Lending</span></div>
        <nav class="nav-menu">
            <a href="#" class="nav-item">Overview</a>
            <a href="/Applyed/${pp}" class="nav-item">My Loans</a>
            <a href="/Applyforloan/${pp}" class="nav-item">ApplyForLoan</a>
            <a href="#" class="nav-item">Payments</a>
            <a href="#" class="nav-item">Calculators</a>
            <a href="#" class="nav-item">Settings</a>
            <a href="/" class="nav-item" style="margin-top: 100px; color: #e74c3c;">Logout</a>
        </nav>
    </div>

    <div class="main-content">
        <div class="header">
            <div>
                <h1>Welcome back, </h1>
                <p style="color: #7f8c8d;">Here is what's happening with your loans today.</p>
            </div>
            <div class="user-profile">
                <button class="btn-apply" onclick="window.location.href='apply-loan.jsp'"><a href="/Applyforloan/${pp}" class="newloan">+ New Loan</a></button>
              
            </div>
        </div>


        <div class="loan-section">
            <h2>Active Loan Applications</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Tenure(Month)</th>
                        <th>Purpose</th>
                        <th>Occupation</th>
                        <th>Address</th>
                        <th>Status</th>
                        
                    </tr>
                </thead>
                <tbody>
               <c:forEach items="${ll}" var="e">
                    <tr>
                        <td>${e.loancateg}</td>
                        <td>${e.amount}</td>
                        <td>${e.ten}</td>
                        <td>${e.loanpur}</td>
                        <td>${e.occup}</td>
                        <td>${e.ladd}</td>
                        <td>
                        <button type="button" class="btn btn-warning">${e.status}</button>
                        <button type="button" class="btn btn-primary"><a href="/withdraw/${e.lid}" class="with">Withdraw</a></button>
						</td>
                    </tr>
                   </c:forEach>
                </tbody>
            </table>
        </div>
    </div>

</body>
</html>