import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Landmark } from 'lucide-react';
import Home from './pages/Home';
import CustomerLogin from './pages/CustomerLogin';
import CustomerRegister from './pages/CustomerRegister';
import AdminLogin from './pages/AdminLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ApplyLoan from './pages/ApplyLoan';

function PrivateRoute({ children, role }: { children: React.ReactNode, role: 'customer' | 'admin' }) {
  const customer = localStorage.getItem('customer');
  const isAdmin = localStorage.getItem('isAdmin');

  // Strict check for customer
  if (role === 'customer' && (!customer || customer === 'null' || customer === 'undefined')) {
    return <Navigate to="/login" replace />;
  }
  
  // Strict check for admin
  if (role === 'admin' && isAdmin !== 'true') {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main className="relative">
        {children}
      </main>
      <footer className="bg-black border-t border-white/[0.05] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Landmark className="w-5 h-5 text-zinc-950" />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">Fin<span className="text-emerald-500">Bridge</span></span>
          </div>
          <div className="flex justify-center gap-8 mb-8 text-sm font-medium text-zinc-500">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Solutions</Link>
            <Link to="/" className="hover:text-emerald-400 transition-colors">Infrastructure</Link>
            <Link to="/" className="hover:text-emerald-400 transition-colors">Security</Link>
            <Link to="/" className="hover:text-emerald-400 transition-colors">Contact</Link>
          </div>
          <p className="text-zinc-600 text-xs tracking-widest uppercase font-bold">© 2026 FinBridge Infrastructure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/register" element={<CustomerRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute role="customer">
                <CustomerDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/apply-loan" 
            element={
              <PrivateRoute role="customer">
                <ApplyLoan />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
