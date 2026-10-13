import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { adminService, customerService } from '../api/api';
import { Customer, Loan } from '../types';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Landmark,
  ShieldCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filterStatus, setFilterStatus] = useState<'Pending' | 'Approved' | 'Rejected' | 'All'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'loans' | 'customers'>('loans');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Loan | 'customerName'; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdmin') === 'true';
    const isCustomerLoggedIn = localStorage.getItem('customer') !== null && localStorage.getItem('customer') !== 'null';
    
    if (!isAdminLoggedIn || isCustomerLoggedIn) {
      localStorage.removeItem('isAdmin'); // Clear stale admin session if customer is logged in
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [filterStatus, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [custRes, loanRes] = await Promise.all([
        customerService.getAll(),
        filterStatus === 'All' 
          ? customerService.getAllLoans()
          : filterStatus === 'Pending' ? adminService.getPendingLoans()
          : filterStatus === 'Approved' ? adminService.getApprovedLoans()
          : adminService.getRejectedLoans()
      ]);
      setCustomers(custRes.data);
      setLoans(loanRes.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') {
        await adminService.approveLoan(id);
      } else {
        await adminService.rejectLoan(id);
      }
      fetchData();
    } catch (err) {
      alert(`Failed to ${action} loan`);
    }
  };

  const handleSort = (key: keyof Loan | 'customerName') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredLoans = loans
    .filter(loan => {
      const searchLower = searchQuery.toLowerCase();
      return (
        loan.customer?.cname.toLowerCase().includes(searchLower) ||
        loan.loancateg.toLowerCase().includes(searchLower) ||
        loan.amount.toString().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      
      let valA: any = key === 'customerName' ? a.customer?.cname : a[key as keyof Loan];
      let valB: any = key === 'customerName' ? b.customer?.cname : b[key as keyof Loan];

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

  const filteredCustomers = customers.filter(cust => 
    cust.cname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.cemail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.cphone.includes(searchQuery)
  );

  const stats = [
    { label: 'Total Customers', value: customers.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Loans', value: loans.filter(l => l.status === 'Pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Approved', value: loans.filter(l => l.status === 'Approved').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rejected', value: loans.filter(l => l.status === 'Rejected').length, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900">Admin Command Center</h1>
        <p className="text-zinc-500 mt-2">Manage loan applications and monitor customer activity.</p>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.bg} p-3 rounded-2xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Distribution Bar */}
      <div className="mb-10 bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-zinc-900">Loan Portfolio Health</h4>
            <p className="text-sm text-zinc-500">Distribution of all processed loan applications</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
            <ShieldCheck className="w-3 h-3" />
            Live System
          </div>
        </div>
        <div className="h-4 w-full bg-zinc-100 rounded-full overflow-hidden flex shadow-inner">
          {['Approved', 'Pending', 'Rejected'].map((status, i) => {
            const count = loans.filter(l => l.status === status).length;
            const percentage = loans.length > 0 ? (count / loans.length) * 100 : 0;
            const colors = ['bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];
            return (
              <motion.div 
                key={status}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`${colors[i]} h-full relative group`}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  {status}: {count} ({percentage.toFixed(1)}%)
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-8 mt-6">
          {['Approved', 'Pending', 'Rejected'].map((status, i) => {
            const colors = ['bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];
            const count = loans.filter(l => l.status === status).length;
            return (
              <div key={status} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${colors[i]}`} />
                <div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">{status}</span>
                  <span className="text-sm font-bold text-zinc-900">{count} Applications</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden min-h-[600px]">
        {/* Tabs */}
        <div className="flex border-b border-zinc-100 bg-zinc-50/50">
          <button 
            onClick={() => setActiveTab('loans')}
            className={`px-10 py-6 text-sm font-bold uppercase tracking-widest transition-all border-b-2 relative ${activeTab === 'loans' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
          >
            Loan Applications
            {activeTab === 'loans' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />}
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`px-10 py-6 text-sm font-bold uppercase tracking-widest transition-all border-b-2 relative ${activeTab === 'customers' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
          >
            Customer Directory
            {activeTab === 'customers' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />}
          </button>
        </div>

        <div className="p-8">
          {/* Global Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-3 bg-zinc-100/50 p-1.5 rounded-2xl border border-zinc-200 w-full md:w-auto">
              {['Pending', 'Approved', 'Rejected', 'All'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${filterStatus === status ? 'bg-white shadow-md text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab === 'loans' ? 'applications' : 'customers'}...`} 
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:ring-2 focus:ring-zinc-900 focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          {activeTab === 'loans' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-zinc-100">
                    <th onClick={() => handleSort('customerName')} className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px] cursor-pointer hover:text-zinc-900 transition-colors">
                      Customer
                    </th>
                    <th onClick={() => handleSort('loancateg')} className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px] cursor-pointer hover:text-zinc-900 transition-colors">
                      Loan Category
                    </th>
                    <th onClick={() => handleSort('amount')} className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px] cursor-pointer hover:text-zinc-900 transition-colors">
                      Amount
                    </th>
                    <th className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Income/Job</th>
                    <th className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Status</th>
                    <th className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {filteredLoans.map((loan) => (
                    <tr key={loan.lid} className="group hover:bg-zinc-50/50 transition-colors">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center font-bold text-zinc-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                            {loan.customer?.cname?.[0] || 'C'}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900">{loan.customer?.cname}</p>
                            <p className="text-xs text-zinc-500">{loan.customer?.cemail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <p className="font-bold text-zinc-900">{loan.loancateg}</p>
                        <p className="text-xs text-zinc-500">{loan.ten} Months Tenure</p>
                      </td>
                      <td className="py-6">
                        <p className="font-bold text-zinc-900">₹{loan.amount.toLocaleString()}</p>
                        <p className="text-xs text-zinc-400 italic">Principal Amount</p>
                      </td>
                      <td className="py-6">
                        <p className="font-bold text-zinc-900">₹{loan.monthinc.toLocaleString()}/mo</p>
                        <p className="text-xs text-zinc-500">{loan.occup}</p>
                      </td>
                      <td className="py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                          loan.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          loan.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            loan.status === 'Pending' ? 'bg-amber-500' :
                            loan.status === 'Approved' ? 'bg-emerald-500' :
                            'bg-rose-500'
                          }`} />
                          {loan.status}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        {loan.status === 'Pending' ? (
                          <div className="flex items-center justify-end gap-3">
                            <button 
                              onClick={() => handleAction(loan.lid!, 'approve')}
                              className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                              title="Approve Application"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleAction(loan.lid!, 'reject')}
                              className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                              title="Reject Application"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2 text-zinc-400">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Finalized</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredLoans.length === 0 && (
                <div className="py-32 text-center">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-zinc-200" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">No applications found</h3>
                  <p className="text-zinc-500">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-zinc-100">
                    <th className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Customer</th>
                    <th className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Contact Information</th>
                    <th className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Residential Address</th>
                    <th className="pb-5 font-bold text-zinc-400 uppercase tracking-widest text-[10px] text-right">Unique ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="group hover:bg-zinc-50/50 transition-colors">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center font-bold text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            {cust.cname[0]}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900">{cust.cname}</p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Verified Member</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm text-zinc-600">
                            <div className="w-7 h-7 bg-zinc-100 rounded-lg flex items-center justify-center">
                              <Mail className="w-3.5 h-3.5 text-zinc-400" />
                            </div>
                            {cust.cemail}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-zinc-600">
                            <div className="w-7 h-7 bg-zinc-100 rounded-lg flex items-center justify-center">
                              <Phone className="w-3.5 h-3.5 text-zinc-400" />
                            </div>
                            {cust.cphone}
                          </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className="flex items-start gap-3 max-w-xs">
                          <Landmark className="w-4 h-4 text-zinc-300 mt-1 shrink-0" />
                          <p className="text-sm text-zinc-600 leading-relaxed">{cust.cadd}</p>
                        </div>
                      </td>
                      <td className="py-6 text-right">
                        <span className="px-3 py-1 bg-zinc-100 text-zinc-500 rounded-lg font-mono text-xs font-bold">
                          ID-{cust.id.toString().padStart(4, '0')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCustomers.length === 0 && (
                <div className="py-32 text-center">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-zinc-200" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">No customers found</h3>
                  <p className="text-zinc-500">We couldn't find any customers matching your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
