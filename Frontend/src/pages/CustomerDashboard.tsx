import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { customerService } from '../api/api';
import { Customer, Loan } from '../types';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Trash2,
  Wallet,
  Calendar,
  Briefcase,
  Landmark
} from 'lucide-react';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerData = localStorage.getItem('customer');
    if (!customerData || customerData === 'null' || customerData === 'undefined') {
      navigate('/login');
      return;
    }
    
    const storedCustomer = JSON.parse(customerData);
    if (storedCustomer) {
      fetchData(storedCustomer.id);
    }
  }, [navigate]);

  const fetchData = async (id: number) => {
    try {
      const [custRes, loanRes] = await Promise.all([
        customerService.getById(id),
        customerService.getLoansByCustomerId(id)
      ]);
      setCustomer(custRes.data[0]);
      setLoans(loanRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (lid: number) => {
    if (window.confirm('Are you sure you want to withdraw this loan application?')) {
      try {
        await customerService.withdrawLoan(lid);
        setLoans(loans.filter(l => l.lid !== lid));
      } catch (err) {
        alert('Failed to withdraw loan');
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900">Welcome back, {customer?.cname}!</h1>
        <p className="text-zinc-500 mt-1">Manage your loan applications and financial profile.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-2xl">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Total Applications</p>
              <p className="text-2xl font-bold text-zinc-900">{loans.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Approved Loans</p>
              <p className="text-2xl font-bold text-zinc-900">{loans.filter(l => l.status === 'Approved').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-2xl">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Pending Review</p>
              <p className="text-2xl font-bold text-zinc-900">{loans.filter(l => l.status === 'Pending').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden sticky top-28">
            <div className="bg-zinc-900 h-24" />
            <div className="px-6 pb-8 -mt-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg border-4 border-white mb-4">
                <User className="w-12 h-12 text-zinc-900" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900">{customer?.cname}</h2>
              <p className="text-zinc-500 mb-6 font-medium">Customer Account</p>
              
              <div className="space-y-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                <div className="flex items-center gap-3 text-zinc-600">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium">{customer?.cemail}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-600">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium">{customer?.cphone}</span>
                </div>
                <div className="flex items-start gap-3 text-zinc-600">
                  <MapPin className="w-4 h-4 mt-1 text-zinc-400" />
                  <span className="text-sm font-medium leading-relaxed">{customer?.cadd}</span>
                </div>
              </div>

              <Link 
                to="/apply-loan"
                className="mt-8 w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Apply for New Loan
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Loans List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-zinc-900">Your Loan Applications</h3>
            <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {loans.length} Total
            </span>
          </div>

          {loans.length === 0 ? (
            <div className="bg-white rounded-3xl border-2 border-dashed border-zinc-200 p-12 text-center">
              <div className="bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-zinc-400" />
              </div>
              <h4 className="text-lg font-bold text-zinc-900 mb-2">No loans found</h4>
              <p className="text-zinc-500 mb-6">You haven't applied for any loans yet.</p>
              <Link to="/apply-loan" className="text-emerald-600 font-bold hover:underline">
                Start your first application
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {loans.map((loan) => (
                <div 
                  key={loan.lid}
                  className="bg-white rounded-2xl border border-zinc-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-50 p-3 rounded-xl">
                        <Landmark className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-zinc-900">{loan.loancateg}</h4>
                        <p className="text-zinc-500 text-sm">{loan.loanpur}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {loan.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider border border-amber-100">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                      {loan.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {loan.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider border border-red-100">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-zinc-100">
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Amount</p>
                      <p className="font-bold text-zinc-900">₹{loan.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Tenure</p>
                      <p className="font-bold text-zinc-900">{loan.ten} Months</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Occupation</p>
                      <p className="font-bold text-zinc-900">{loan.occup}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      {loan.status === 'Pending' && (
                        <button 
                          onClick={() => handleWithdraw(loan.lid!)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Withdraw Application"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
