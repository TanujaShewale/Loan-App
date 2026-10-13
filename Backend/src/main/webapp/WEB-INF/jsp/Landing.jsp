<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apex Lending | Modern Loan Solutions</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary-gradient: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            --accent-gradient: linear-gradient(90deg, #00d2ff, #3a7bd5);
            --text-light: #f8f9fa;
            --white: #ffffff;
            --gray-soft: #f4f7f6;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            background-color: var(--gray-soft);
            color: #333;
            line-height: 1.6;
            overflow-x: hidden;
        }

        /* --- Navigation Bar --- */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 8%;
            background: var(--white);
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2c3e50;
            cursor: pointer;
        }

        .logo span { color: #3a7bd5; }

        .nav-links {
            display: flex;
            list-style: none;
        }

        .nav-links li a {
            text-decoration: none;
            color: #555;
            margin: 0 15px;
            font-weight: 500;
            transition: 0.3s;
        }

        .nav-links li a:hover { color: #3a7bd5; }

        .nav-buttons {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        /* --- All Button Styles --- */
        .btn-primary {
            background: var(--accent-gradient);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: 0.3s;
        }

        .btn-secondary {
            background: transparent;
            color: #555;
            border: 1.5px solid #ddd;
            padding: 10px 22px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: 0.3s;
        }

        .btn-secondary:hover {
            background: #f8f9fa;
            border-color: #3a7bd5;
            color: #3a7bd5;
        }

        .btn-primary-lg {
            background: var(--accent-gradient);
            color: white;
            border: none;
            padding: 16px 35px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 700;
            font-size: 1rem;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-outline {
            background: transparent;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.4);
            padding: 16px 35px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 700;
            font-size: 1rem;
            transition: 0.3s;
        }

        .btn-primary-lg:hover, .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(58, 123, 213, 0.4);
        }

        .btn-outline:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: white;
        }

        /* --- Hero Section --- */
        .hero {
            height: 85vh;
            background: var(--primary-gradient);
            color: var(--white);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 8%;
        }

        .hero-content {
            max-width: 600px;
        }

        .gradient-text {
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800;
        }

        .hero-content h1 {
            font-size: 3.8rem;
            line-height: 1.1;
            margin-bottom: 25px;
        }

        .hero-content p {
            font-size: 1.2rem;
            margin-bottom: 35px;
            opacity: 0.85;
        }

        .cta-group {
            display: flex;
            gap: 20px;
        }

        /* --- Visuals --- */
        .hero-visual {
            position: relative;
        }

        .floating-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.3);
            text-align: center;
            animation: float 5s ease-in-out infinite;
        }

        .floating-card h3 {
            font-size: 2rem;
            margin-top: 10px;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
        }

        /* Responsive Fix */
        @media (max-width: 968px) {
            .hero { flex-direction: column; text-align: center; padding-top: 50px; }
            .cta-group { justify-content: center; }
            .hero-content h1 { font-size: 2.5rem; }
            .hero-visual { margin-top: 50px; }
        }
    </style>
</head>
<body>

    <nav class="navbar">
        <div class="logo">Apex<span>Lending</span></div>
        <ul class="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="/LoanType">Loan Types</a></li>
            <li><a href="#">Calculator</a></li>
            <li><a href="#">Support</a></li>
        </ul>
        <div class="nav-buttons">
            <button class="btn-secondary" > <a href="Login" style="text-decoration: none; color:black;">Login</a></button>
            <button class="btn-primary" onclick="scrollToForm()">Apply Now</button>
        </div>
    </nav>

    <header class="hero">
        <div class="hero-content">
            <h1>Empowering Your <br><span class="gradient-text">Financial Future</span></h1>
            <p>Simple, transparent, and fast bank loans tailored to your life goals. Get approved in as little as 24 hours.</p>
            <div class="cta-group">
                <button class="btn-primary-lg" onclick="scrollToForm()">
    <a href="Register" style="text-decoration: none; color: white;">Start Application</a>
</button>
                <button class="btn-outline" onclick="openCalculator()">Check Rates</button>
            </div>
        </div>
        
        <div class="hero-visual">
            <div class="floating-card">
                <p>Personal Loan Rates</p>
                <h3>3.5% - 8.9%</h3>
                <p style="font-size: 0.8rem; margin-top: 10px; opacity: 0.7;">*Terms & Conditions Apply</p>
            </div>
        </div>
    </header>

    <script>
        function scrollToForm() {
            console.log("Navigating to application...");
            // Link this to your JSP form page
            // window.location.href = 'apply.jsp';
        }

        function openCalculator() {
            alert("Loan Calculator feature is being prepared!");
        }

        // Navbar interaction on scroll
        window.onscroll = function() {
            let nav = document.querySelector('.navbar');
            if (window.pageYOffset > 20) {
                nav.style.padding = "10px 8%";
            } else {
                nav.style.padding = "15px 8%";
            }
        };
    </script>
</body>
</html>