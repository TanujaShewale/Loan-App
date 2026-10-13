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

        .user-profile {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .avatar {
            width: 45px;
            height: 45px;
            background: var(--accent-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        /* --- Stats Cards --- */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }

        .card {
            background: var(--white);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .card h3 {
            font-size: 0.9rem;
            color: #7f8c8d;
            margin-bottom: 10px;
        }

        .card .value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--text-dark);
        }

        .card .trend {
            font-size: 0.8rem;
            margin-top: 10px;
            color: #27ae60;
        }

        /* --- Loan Table --- */
        .loan-section {
            background: var(--white);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .loan-section h2 {
            margin-bottom: 20px;
            font-size: 1.2rem;
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
        }

        .status {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .status.approved { background: #e8f5e9; color: #2e7d32; }
        .status.pending { background: #fff3e0; color: #ef6c00; }
        .status.paid { background: #e3f2fd; color: #1565c0; }

        .btn-apply {
            background: var(--accent-gradient);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size:10px;
        }
        
        /* Container for the operation buttons */
.action-group {
    display: flex;
    gap: 8px; /* Space between buttons */
    align-items: center;
}

/* Specific styling for Edit/Delete links to look like buttons */
.btn-action {
    text-decoration: none; /* Removes the underline */
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    color: white;
    display: inline-block;
    transition: opacity 0.2s;
}

.btn-edit {
    background: var(--accent-gradient);
}

.btn-delete {
    background: linear-gradient(90deg, #ff4d4d, #f05252);
}

.btn-action:hover {
    opacity: 0.8;
    color: white;
}s
    </style>
</head>
<body>

    <div class="sidebar">
        <div class="logo">Apex<span>Lending</span></div>
        <nav class="nav-menu">
            <a href="#" class="nav-item">Overview</a>
            <a href="/Applyed/${kk[0].id}" class="nav-item">My Loans</a>
            <a href="/Applyforloan/${kk[0].id}" class="nav-item">ApplyForLoan</a>
            <a href="#" class="nav-item">Payments</a>
            <a href="#" class="nav-item">Calculators</a>
            <a href="#" class="nav-item">Settings</a>
            <a href="/" class="nav-item" style="margin-top: 100px; color: #e74c3c;">Logout</a>
        </nav>
    </div>

    <div class="main-content">
        <div class="header">
            <div>
                <h1>Welcome back, John!</h1>
                <p style="color: #7f8c8d;">Here is what's happening with your loans today.</p>
            </div>
            <div class="user-profile">
                <button class="btn-apply" onclick="window.location.href='apply-loan.jsp'">+ New Loan</button>
                <div class="avatar">JD</div>
            </div>
        </div>

        <div class="stats-grid">
            <div class="card">
                <h3>Total Loan Amount</h3>
                <div class="value">24,500.00</div>
                <div class="trend">Active Loans: 2</div>
            </div>
            <div class="card">
                <h3>Next Payment</h3>
                <div class="value">450.00</div>
                <div class="trend" style="color: #e67e22;">Due in 5 days</div>
            </div>
            <div class="card">
                <h3>Amount Paid</h3>
                <div class="value">8,200.00</div>
                <div class="trend">35% of total</div>
            </div>
        </div>

        <div class="loan-section">
            <h2>Active Loan Applications</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Password</th>
                        <th>Confirm Pass</th>
                        <th>Address</th>
                        <th>Operation</th>
                        
                    </tr>
                </thead>
                <tbody>
               <c:forEach items="${kk}" var="e">
                    <tr>
                        <td>${e.cname}</td>
                        <td>${e.cemail}</td>
                        <td>${e.cphone}</td>
                        <td>${e.cpass}</td>
                        <td>${e.ccpass}</td>
                        <td>${e.cadd}</td>
                        <td>
    						<div class="action-group">
       						<a class="btn-action btn-edit" href="/EditData/${e.id}">Edit</a>
        					<a class="btn-action btn-delete" href="/RecordDeleted/${e.id}">Delete</a>
    						</div>
						</td>
                    </tr>
                   </c:forEach>
                </tbody>
            </table>
        </div>
    </div>

</body>
</html>