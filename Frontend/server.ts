import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Middleware to identify this as the Mock Backend
  app.use((req, res, next) => {
    res.setHeader('X-Backend-Type', 'Mock-Node-JS');
    next();
  });

  // In-memory data store (simulating the database)
  let customers = [
    {
      id: 1,
      cname: "John Doe",
      cemail: "john@example.com",
      cphone: "1234567890",
      cpass: "password123",
      ccpass: "password123",
      cadd: "123 Main St, City"
    }
  ];

  let loans = [
    {
      lid: 101,
      loancateg: "Personal Loan",
      amount: "50000",
      ten: 12,
      loanpur: "Home Renovation",
      occup: "Engineer",
      monthinc: 45000,
      ladd: "123 Main St, City",
      status: "Pending",
      customer_id: 1
    }
  ];

  let nextCustomerId = 2;
  let nextLoanId = 102;

  // Customer Routes
  app.post('/api/customers', (req, res) => {
    const customer = { ...req.body, id: nextCustomerId++ };
    customers.push(customer);
    res.send("Customer Registered Successfully");
  });

  app.get('/api/customers', (req, res) => {
    res.json(customers);
  });

  app.get('/api/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.filter(c => c.id === id);
    res.json(customer);
  });

  app.put('/api/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
      customers[index] = { ...customers[index], ...req.body, id };
      res.json(customers[index]);
    } else {
      res.status(404).send("Customer not found");
    }
  });

  app.delete('/api/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    customers = customers.filter(c => c.id !== id);
    res.send("Customer Deleted Successfully");
  });

  app.post('/api/login', (req, res) => {
    const { cemail, cpass } = req.body;
    const customer = customers.find(c => c.cemail === cemail && cpass === c.cpass);
    if (!customer) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    res.json(customer);
  });

  app.post('/api/customers/:id/loan', (req, res) => {
    const id = parseInt(req.params.id);
    const loan = { ...req.body, lid: nextLoanId++, customer_id: id, status: "Pending" };
    loans.push(loan);
    res.send("Loan Applied Successfully");
  });

  app.get('/api/loans', (req, res) => {
    // Join with customer data
    const result = loans.map(l => ({
      ...l,
      customer: customers.find(c => c.id === l.customer_id)
    }));
    res.json(result);
  });

  app.get('/api/loans/customer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = loans.filter(l => l.customer_id === id);
    res.json(result);
  });

  app.delete('/api/loan/:lid', (req, res) => {
    const lid = parseInt(req.params.lid);
    loans = loans.filter(l => l.lid !== lid);
    res.send("Loan Withdrawn Successfully");
  });

  // Admin Routes
  app.post('/api/admin/login', (req, res) => {
    const { ausername, apassword } = req.body;
    if (ausername === "Umesh" && apassword === "Umesh@123") {
      res.send("Admin Login Successful");
    } else {
      res.send("Invalid Username or Password");
    }
  });

  app.get('/api/admin/loans/:status', (req, res) => {
    const status = req.params.status.charAt(0).toUpperCase() + req.params.status.slice(1);
    const result = loans
      .filter(l => l.status === status)
      .map(l => ({
        ...l,
        customer: customers.find(c => c.id === l.customer_id)
      }));
    res.json(result);
  });

  app.put('/api/admin/loan/:id/approve', (req, res) => {
    const id = parseInt(req.params.id);
    const loan = loans.find(l => l.lid === id);
    if (loan) {
      loan.status = "Approved";
      res.send("Loan Approved Successfully");
    } else {
      res.status(404).send("Loan not found");
    }
  });

  app.put('/api/admin/loan/:id/reject', (req, res) => {
    const id = parseInt(req.params.id);
    const loan = loans.find(l => l.lid === id);
    if (loan) {
      loan.status = "Rejected";
      res.send("Loan Rejected Successfully");
    } else {
      res.status(404).send("Loan not found");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
