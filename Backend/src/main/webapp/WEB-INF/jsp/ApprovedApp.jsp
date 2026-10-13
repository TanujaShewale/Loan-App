<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Console | Apex Lending</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --admin-dark: #1a1c23;
            --admin-sidebar: #24262d;
            --accent-purple: #7e3ff2; /* Admin uses a purple/blue theme for distinction */
            --success: #0e9f6e;
            --danger: #f05252;
            --white: #ffffff;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }

        body { display: flex; background-color: #f9fafb; min-height: 100vh; }

        /* --- Sidebar --- */
        .sidebar {
            width: 250px;
            background: var(--admin-sidebar);
            color: #9e9e9e;
            padding: 25px;
            position: fixed;
            height: 100%;
        }

        .sidebar h2 { color: white; margin-bottom: 40px; font-size: 1.2rem; }

        .nav-link {
            padding: 12px;
            display: block;
            color: #9e9e9e;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 10px;
            transition: 0.3s;
        }

        .nav-link.active, .nav-link:hover {
            background: rgba(255,255,255,0.05);
            color: white;
        }

        /* --- Main --- */
        .main { margin-left: 250px; width: 100%; padding: 40px; }

        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .badge {
            background: var(--accent-purple);
            color: white;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
        }

        /* --- Stat Cards --- */
        .grid-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }

        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.03);
            border: 1px solid #edf2f7;
        }

        .stat-card p { font-size: 0.85rem; color: #718096; margin-bottom: 5px; }
        .stat-card h3 { font-size: 1.5rem; color: #1a202c; }

        /* --- Applications Table --- */
        .table-container {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        table { width: 100%; border-collapse: collapse; }

        th { background: #f8fafc; text-align: left; padding: 15px; color: #4a5568; font-size: 0.8rem; text-transform: uppercase; }

        td { padding: 18px 15px; border-bottom: 1px solid #edf2f7; font-size: 0.9rem; }

        .client-info { display: flex; align-items: center; gap: 10px; }
        .client-info span { font-weight: 600; }

        .action-btn {
            padding: 6px 12px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.8rem;
            transition: 0.2s;
        }

        .btn-approve { background: #def7ec; color: var(--success); margin-right: 5px; }
        .btn-approve:hover { background: var(--success); color: white; }

        .btn-reject { background: #fde8e8; color: var(--danger); }
        .btn-reject:hover { background: var(--danger); color: white; }

    </style>
</head>
<body>

    <aside class="sidebar">
        <h2>Apex Admin</h2>
        <nav>
            <a href="" class="nav-link">Dashboard</a>
            <a href="PendingApp" class="nav-link">Loan Requests <span class="badge">5</span></a>
            <a href="#" class="nav-link active">Approved Loans</a>
            <a href="Rejected" class="nav-link">Rejected Loans</a>
            <a href="#" class="nav-link">Reports</a>
            <a href="index.jsp" class="nav-link" style="margin-top: 50px;">Sign Out</a>
        </nav>
    </aside>

    <main class="main">
        <div class="top-bar">
            <h1>Manager Overview</h1>
            <div class="user-info">
                <strong>Admin: Umesh Bhoiwade</strong>
            </div>
        </div>

        <div class="grid-stats">
            <div class="stat-card">
                <p>New Applications</p>
                <h3>${count}</h3>
            </div>
            <div class="stat-card">
                <p>Total Disbursed</p>
                <h3>$1.2M</h3>
            </div>
            <div class="stat-card">
                <p>Pending Approval</p>
                <h3 style="color: var(--accent-purple);">05</h3>
            </div>
            <div class="stat-card">
                <p>Default Rate</p>
                <h3>0.8%</h3>
            </div>
        </div>

        <div class="table-container">
            <div style="padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                <h2 style="font-size: 1.1rem;">Incoming Loan Applications</h2>
                <input type="text" placeholder="Search customer..." style="padding: 5px 10px; border-radius: 5px; border: 1px solid #ddd;">
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
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
                <c:forEach items="${lon}" var="e">
                    <tr>
                        
                        <td>${e.customer.cname}</td>
                       <td>${e.loancateg}</td>
                        <td>${e.amount}</td>
                        <td>${e.ten}</td>
                        <td>${e.loanpur}</td>
                        <td>${e.occup}</td>
                        <td>${e.ladd}</td>
                        <td>
                            <button class="action-btn btn-approve" onclick="processLoan('approve', '${e.customer.cname}')">${e.status}</button>
                        </td>
                   
                    </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </main>

    <script>
        function processLoan(action, name) {
            if(confirm('Are you sure you want to ' + action + ' the loan for ' + name + '?')) {
                alert('Loan ' + (action === 'approve' ? 'Approved' : 'Rejected') + ' successfully.');
                // Here you would typically use AJAX or redirect to a Servlet to update the DB
            }
        }
    </script>
</body>
</html>