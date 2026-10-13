<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Registration | Apex Lending</title>
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

        .reg-container {
            background: var(--white);
            width: 100%;
            max-width: 600px;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .reg-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .reg-header h2 {
            color: #2c3e50;
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .reg-header p {
            color: #7f8c8d;
            font-size: 0.9rem;
        }

        /* Form Grid */
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .full-width { grid-column: span 2; }

        .input-group {
            margin-bottom: 15px;
            position: relative;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #444;
            font-size: 0.85rem;
        }

        input, select {
            width: 100%;
            padding: 12px 15px;
            border: 1.5px solid #eee;
            border-radius: 8px;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            outline: none;
        }

        input:focus {
            border-color: #3a7bd5;
            box-shadow: 0 0 8px rgba(58, 123, 213, 0.2);
        }

        /* Validation Styles */
        .error-msg {
            color: var(--error-color);
            font-size: 0.75rem;
            margin-top: 5px;
            display: none;
        }

        .invalid { border-color: var(--error-color) !important; }

        /* Button */
        .btn-submit {
            width: 100%;
            padding: 15px;
            background: var(--accent-gradient);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            margin-top: 20px;
            transition: transform 0.2s;
        }

        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(58, 123, 213, 0.3);
        }

        .login-link {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9rem;
            color: #7f8c8d;
        }

        .login-link a {
            color: #3a7bd5;
            text-decoration: none;
            font-weight: 600;
        }

        @media (max-width: 600px) {
            .form-grid { grid-template-columns: 1fr; }
            .full-width { grid-column: span 1; }
        }
    </style>
</head>
<body>

    <div class="reg-container">
        <div class="reg-header">
            <h2>Create Account</h2>
            <p>Join Apex Lending for quick and secure loan processing.</p>
        </div>

        <form id="registrationForm" action="DataStored" method="POST" onsubmit="return validateForm()">
            <div class="form-grid">
                <div class="input-group full-width">
                    <label for="fullName">Full Name (As per Identity Document)</label>
                    <input type="text" id="fullName" name="cname" placeholder="John Doe">
                    <div id="nameError" class="error-msg">Please enter your full name.</div>
                </div>

                <div class="input-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="cemail" placeholder="john@example.com">
                    <div id="emailError" class="error-msg">Enter a valid email address.</div>
                </div>

                <div class="input-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="cphone" placeholder="">
                    <div id="phoneError" class="error-msg">Enter a valid 10-digit number.</div>
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="cpass" placeholder="••••••••">
                    <div id="passError" class="error-msg">Minimum 8 characters.</div>
                </div>

                <div class="input-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword"name="ccpass" placeholder="••••••••">
                    <div id="confirmError" class="error-msg">Passwords do not match.</div>
                </div>

                <div class="input-group full-width">
                    <label for="address">Residential Address</label>
                    <input type="text" id="address" name="cadd" placeholder="123 Banking St, Finance City">
                    <div id="addressError" class="error-msg">Address is required.</div>
                </div>
            </div>

            <button type="submit" class="btn-submit">Register Now</button>
        </form>

        <div class="login-link">
            Already have an account? <a href="login.jsp">Login here</a>
        </div>
    </div>

    <script>
        function validateForm() {
            let isValid = true;

            // Elements
            const name = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const confirm = document.getElementById('confirmPassword');
            const address = document.getElementById('address');

            // Reset Errors
            document.querySelectorAll('.error-msg').forEach(msg => msg.style.display = 'none');
            document.querySelectorAll('input').forEach(input => input.classList.remove('invalid'));

            // Name Validation
            if (name.value.trim().length < 3) {
                showError('fullName', 'nameError');
                isValid = false;
            }

            // Email Validation (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError('email', 'emailError');
                isValid = false;
            }

            // Phone Validation (Simple 10 digit)
            if (phone.value.trim().length < 10) {
                showError('phone', 'phoneError');
                isValid = false;
            }

            // Password Validation
            if (password.value.length < 8) {
                showError('password', 'passError');
                isValid = false;
            }

            // Confirm Password
            if (confirm.value !== password.value || confirm.value === "") {
                showError('confirmPassword', 'confirmError');
                isValid = false;
            }

            // Address Validation
            if (address.value.trim() === "") {
                showError('address', 'addressError');
                isValid = false;
            }

            return isValid;
        }

        function showError(inputId, errorId) {
            document.getElementById(inputId).classList.add('invalid');
            document.getElementById(errorId).style.display = 'block';
        }
    </script>
</body>
</html>