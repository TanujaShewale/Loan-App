<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Loan Types | FinBridge</title>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<style>

:root{
--primary-gradient: linear-gradient(135deg,#0f2027,#203a43,#2c5364);
--accent-gradient: linear-gradient(90deg,#00d2ff,#3a7bd5);
--white:#ffffff;
--soft:#f4f7f6;
}

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Inter',sans-serif;
}

body{
background:var(--soft);
}

/* NAVBAR */

.navbar{
display:flex;
justify-content:space-between;
align-items:center;
padding:15px 8%;
background:white;
box-shadow:0 2px 10px rgba(0,0,0,0.05);
}

.logo{
font-size:1.5rem;
font-weight:700;
}

.logo span{
color:#3a7bd5;
}

.nav-links{
display:flex;
list-style:none;
}

.nav-links li a{
text-decoration:none;
color:#555;
margin:0 15px;
font-weight:500;
}

.nav-links li a:hover{
color:#3a7bd5;
}

.btn-primary{
background:var(--accent-gradient);
color:white;
border:none;
padding:10px 20px;
border-radius:6px;
cursor:pointer;
font-weight:600;
}

/* HEADER */

.header{
background:var(--primary-gradient);
color:white;
text-align:center;
padding:70px 20px;
}

.header h1{
font-size:2.8rem;
margin-bottom:10px;
}

.header p{
opacity:0.8;
}

/* LOAN CARDS */

.container{
width:85%;
margin:auto;
margin-top:50px;
margin-bottom:80px;
}

.grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:30px;
}

.card{
background:white;
padding:35px;
border-radius:14px;
text-align:center;
box-shadow:0 10px 25px rgba(0,0,0,0.08);
transition:0.3s;
}

.card:hover{
transform:translateY(-8px);
}

.card i{
font-size:45px;
background:var(--accent-gradient);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
margin-bottom:15px;
}

.card h3{
margin-bottom:10px;
}

.card p{
font-size:14px;
color:#6b7280;
margin-bottom:20px;
}

.apply-btn{
background:var(--accent-gradient);
border:none;
padding:10px 20px;
color:white;
border-radius:6px;
text-decoration:none;
font-weight:600;
}

.apply-btn:hover{
opacity:0.9;
}

/* RESPONSIVE */

@media(max-width:900px){
.grid{
grid-template-columns:1fr;
}
}

</style>
</head>

<body>

<!-- NAVBAR -->

<nav class="navbar">
<div class="logo">Fin<span>Bridge</span></div>

<ul class="nav-links">
<li><a href="/">Home</a></li>
<li><a href="/LoanType">Loan Types</a></li>
<li><a href="#">Calculator</a></li>
<li><a href="#">Support</a></li>
</ul>

<button class="btn-primary">
<a href="Login" style="text-decoration:none;color:white;">Login</a>
</button>

</nav>

<!-- HEADER -->

<section class="header">
<h1>Explore Our Loan Options</h1>
<p>Choose a loan tailored to your financial needs</p>
</section>

<!-- LOAN TYPES -->

<div class="container">

<div class="grid">

<!-- PERSONAL -->

<div class="card">
<i class="fas fa-user"></i>
<h3>Personal Loan</h3>
<p>Quick personal loans for travel, medical emergencies and daily needs.</p>
<a href="/applyLoan/Personal" class="apply-btn">Apply Now</a>
</div>

<!-- HOME -->

<div class="card">
<i class="fas fa-home"></i>
<h3>Home Loan</h3>
<p>Finance your dream house with flexible EMI plans.</p>
<a href="/applyLoan/Home" class="apply-btn">Apply Now</a>
</div>

<!-- EDUCATION -->

<div class="card">
<i class="fas fa-graduation-cap"></i>
<h3>Education Loan</h3>
<p>Support higher studies in India or abroad.</p>
<a href="/applyLoan/Education" class="apply-btn">Apply Now</a>
</div>

<!-- CAR -->

<div class="card">
<i class="fas fa-car"></i>
<h3>Car Loan</h3>
<p>Buy your dream car with affordable loan plans.</p>
<a href="/applyLoan/Car" class="apply-btn">Apply Now</a>
</div>

<!-- BUSINESS -->

<div class="card">
<i class="fas fa-briefcase"></i>
<h3>Business Loan</h3>
<p>Grow your business with quick funding.</p>
<a href="/applyLoan/Business" class="apply-btn">Apply Now</a>
</div>

<!-- GOLD -->

<div class="card">
<i class="fas fa-coins"></i>
<h3>Gold Loan</h3>
<p>Get instant loan against gold assets.</p>
<a href="/applyLoan/Gold" class="apply-btn">Apply Now</a>
</div>

</div>

</div>

</body>
</html>