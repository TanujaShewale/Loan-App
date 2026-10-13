import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { customerService } from '../api/api';
import { 
  Landmark, 
  Wallet, 
  Calendar, 
  Briefcase, 
  Target, 
  MapPin, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

const loanCategories = [
  { name: 'Personal Loan', rate: '11.2%' },
  { name: 'Home Loan', rate: '8.5%' },
  { name: 'Car Loan', rate: '9.2%' },
  { name: 'Education Loan', rate: '7.8%' },
  { name: 'Business Loan', rate: '10.5%' },
];

export default function ApplyLoan() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loancateg: 'Personal Loan',
    amount: '',
    ten: 12,
    loanpur: '',
    occup: '',
    monthinc: 0,
    ladd: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const customer = localStorage.getItem('customer');
    if (!customer || customer === 'null' || customer === 'undefined') {
      navigate('/login');
    }
  }, [navigate]);

  const selectedCategory = loanCategories.find(c => c.name === formData.loancateg);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const customer = JSON.parse(localStorage.getItem('customer') || 'null');
    if (!customer) {
      navigate('/login');
      return;
    }

    try {
      await customerService.applyLoan(customer.id, formData);
      alert('Loan application submitted successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'ten' || name === 'monthinc' ? Number(value) : value });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden"
      >
        <div className="bg-zinc-900 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-3">Apply for a Loan</h2>
            <p className="text-zinc-400 text-lg">Quick, transparent, and secure financial solutions.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-10">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-10">
            {/* Loan Category */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-zinc-900 ml-1">Loan Category</label>
              <div className="relative">
                <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <select
                  name="loancateg"
                  value={formData.loancateg}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none font-medium"
                >
                  {loanCategories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              {selectedCategory && (
                <p className="text-xs font-bold text-emerald-600 ml-1">
                  Current Interest Rate: {selectedCategory.rate} p.a.
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-zinc-900 ml-1">Loan Amount (₹)</label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  name="amount"
                  type="number"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                  placeholder="e.g. 50000"
                />
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-zinc-900 ml-1">Tenure (Months)</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  name="ten"
                  type="number"
                  required
                  min="3"
                  max="120"
                  value={formData.ten}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                />
              </div>
            </div>

            {/* Occupation */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-zinc-900 ml-1">Occupation</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  name="occup"
                  required
                  value={formData.occup}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                  placeholder="e.g. Software Engineer"
                />
              </div>
            </div>

            {/* Monthly Income */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-zinc-900 ml-1">Monthly Income (₹)</label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  name="monthinc"
                  type="number"
                  required
                  value={formData.monthinc}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                  placeholder="e.g. 45000"
                />
              </div>
            </div>

            {/* Loan Purpose */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-zinc-900 ml-1">Loan Purpose</label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  name="loanpur"
                  required
                  value={formData.loanpur}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                  placeholder="e.g. Home Renovation"
                />
              </div>
            </div>

            {/* Loan Address */}
            <div className="md:col-span-2 space-y-3">
              <label className="block text-sm font-bold text-zinc-900 ml-1">Current Address for Loan</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                <textarea
                  name="ladd"
                  required
                  rows={3}
                  value={formData.ladd}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none font-medium"
                  placeholder="Enter address for verification"
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
              {!loading && <ArrowRight className="w-6 h-6" />}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
