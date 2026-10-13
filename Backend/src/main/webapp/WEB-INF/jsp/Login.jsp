<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Login | Apex Lending</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary-gradient: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            --accent-gradient: linear-gradient(90deg, #00d2ff, #3a7bd5);
            --white: #ffffff;
            --error-color: #ff4d4d;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            background: var(--primary-gradient);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .login-container {
            background: var(--white);
            width: 100%;
            max-width: 400px;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            text-align: center;
        }

        .logo-area {
            font-size: 1.8rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .logo-area span { color: #3a7bd5; }

        .login-header h2 {
            color: #333;
            font-size: 1.5rem;
            margin-bottom: 8px;
        }

        .login-header p {
            color: #7f8c8d;
            font-size: 0.9rem;
            margin-bottom: 30px;
        }

        .input-group {
            text-align: left;
            margin-bottom: 20px;
            position: relative;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #444;
            font-size: 0.85rem;
        }

        input {
            width: 100%;
            padding: 12px 15px;
            border: 1.5px solid #eee;
            border-radius: 8px;
            font-size: 0.95rem;
            transition: all 0.3s ease;
        }

        input:focus {
            border-color: #3a7bd5;
            outline: none;
            box-shadow: 0 0 8px rgba(58, 123, 213, 0.2);
        }

        .options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            margin-bottom: 25px;
        }

        .options a {
            color: #3a7bd5;
            text-decoration: none;
            font-weight: 600;
        }

        .btn-login {
            width: 100%;
            padding: 14px;
            background: var(--accent-gradient);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(58, 123, 213, 0.4);
        }

        .signup-footer {
            margin-top: 25px;
            font-size: 0.9rem;
            color: #7f8c8d;
        }

        .signup-footer a {
            color: #3a7bd5;
            text-decoration: none;
            font-weight: 600;
        }

        /* Error Message Style */
        .error-box {
            background: #ffe5e5;
            color: var(--error-color);
            padding: 10px;
            border-radius: 5px;
            font-size: 0.85rem;
            margin-bottom: 20px;
            display: none;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <div class="logo-area">Apex<span>Lending</span></div>
        
        <div class="login-header">
            <h2>Welcome Back</h2>
            <p>Please enter your details to login.</p>
        </div>

        <div id="errorMessage" class="error-box">Invalid email or password.</div>

        <form id="loginForm" action="LoginAuth" method="POST" onsubmit="return handleLogin(event)">
            <div class="input-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="name@company.com" required>
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="pass" placeholder="••••••••" required>
            </div>

            <div class="options">
                <label style="display: flex; align-items: center; font-weight: 400; cursor: pointer;">
                    <input type="checkbox" style="width: auto; margin-right: 8px;"> Remember me
                </label>
                <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" class="btn-login">Secure Login</button>
        </form>

        <div class="signup-footer">
            Don't have an account? <a href="register.jsp">Sign up free</a>
        </div>
    </div>

    <script>
        function handleLogin(e) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorBox = document.getElementById('errorMessage');

            // Basic Client-side check
            if (email === "" || password === "") {
                e.preventDefault();
                errorBox.style.display = 'block';
                errorBox.innerText = "All fields are required.";
                return false;
            }
            
            // If validation passes, the form will submit to LoginServlet
            return true;
        }
    </script>
</body>
</html>