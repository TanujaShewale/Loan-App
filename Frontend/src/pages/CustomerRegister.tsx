import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { customerService } from '../api/api';
import { User, Mail, Phone, Lock, MapPin, AlertCircle, ArrowRight, Landmark } from 'lucide-react';

export default function CustomerRegister() {
  const [formData, setFormData] = useState({
    cname: '',
    cemail: '',
    cphone: '',
    cpass: '',
    ccpass: '',
    cadd: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.cpass !== formData.ccpass) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await customerService.register(formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="bg-white/[0.03] backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/[0.08] shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-2xl mb-6 border border-emerald-500/20">
              <Landmark className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Initialize Account</h2>
            <p className="text-zinc-500 mt-2 font-light">Join the FinBridge infrastructure today</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-10 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Full Identity</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input
                  name="cname"
                  required
                  value={formData.cname}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/[0.1] rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-zinc-700"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Email Identity</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input
                  name="cemail"
                  type="email"
                  required
                  value={formData.cemail}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/[0.1] rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-zinc-700"
                  placeholder="john@infrastructure.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Phone Link</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input
                  name="cphone"
                  required
                  value={formData.cphone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/[0.1] rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-zinc-700"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input
                  name="cpass"
                  type="password"
                  required
                  value={formData.cpass}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/[0.1] rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-zinc-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Verify Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input
                  name="ccpass"
                  type="password"
                  required
                  value={formData.ccpass}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/[0.1] rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-zinc-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Physical Identity</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-zinc-600" />
                <textarea
                  name="cadd"
                  required
                  value={formData.cadd}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/[0.1] rounded-2xl text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none resize-none placeholder:text-zinc-700"
                  placeholder="Enter your full address"
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 text-zinc-950 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              >
                {loading ? 'Initializing...' : 'Create Account'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </div>
          </form>

          <div className="mt-12 pt-10 border-t border-white/[0.05] text-center">
            <p className="text-zinc-500 text-sm font-light">
              Already have an identity?{' '}
              <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                Authenticate
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
