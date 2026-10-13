import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Landmark, User, LogOut, ShieldCheck, LayoutDashboard, Zap } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use a more robust way to get auth state
  const customerRaw = localStorage.getItem('customer');
  const isCustomerLoggedIn = customerRaw && customerRaw !== 'null' && customerRaw !== 'undefined';
  const customer = isCustomerLoggedIn ? JSON.parse(customerRaw!) : null;
  
  const isAdminLoggedIn = localStorage.getItem('isAdmin') === 'true';
  // An admin should not be logged in as a customer at the same time in this logic
  const isAdmin = isAdminLoggedIn && !isCustomerLoggedIn;

  const handleLogout = () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('isAdmin');
    // Force a full refresh to clear any state
    window.location.href = '/';
  };

  return (
    <nav className="bg-[#02040a]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-emerald-500 p-2.5 rounded-xl group-hover:rotate-12 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Landmark className="w-6 h-6 text-zinc-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">Fin<span className="text-emerald-500">Bridge</span></span>
              <span className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest mt-0.5">Financial Solutions</span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            {!customer && !isAdmin ? (
              <>
                <Link to="/" className={`text-sm font-semibold transition-colors ${location.pathname === '/' ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'}`}>Home</Link>
                <Link to="/login" className={`text-sm font-semibold transition-colors ${location.pathname === '/login' ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'}`}>Login</Link>
                <Link to="/admin/login" className={`text-sm font-semibold transition-colors ${location.pathname === '/admin/login' ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'}`}>Admin</Link>
                <Link to="/register" className="bg-emerald-500 text-zinc-950 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {customer && (
                  <>
                    <Link to="/dashboard" className={`flex items-center gap-2 text-sm font-semibold transition-colors ${location.pathname === '/dashboard' ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'}`}>
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link to="/apply-loan" className={`flex items-center gap-2 text-sm font-semibold transition-colors ${location.pathname === '/apply-loan' ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'}`}>
                      <Zap className="w-4 h-4" />
                      Apply Loan
                    </Link>
                  </>
                )}
                {isAdmin && (
                  <Link to="/admin/dashboard" className={`flex items-center gap-2 text-sm font-semibold transition-colors ${location.pathname === '/admin/dashboard' ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'}`}>
                    <ShieldCheck className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}
                <div className="h-6 w-px bg-white/10 mx-2" />
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
