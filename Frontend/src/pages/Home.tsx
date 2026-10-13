import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Landmark, Wallet, Home as HomeIcon, Car, GraduationCap, Briefcase } from 'lucide-react';

const loanTypes = [
  {
    icon: HomeIcon,
    title: 'Home Loan',
    rate: '8.5%',
    description: 'Turn your dream home into reality with our flexible mortgage options.',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Car,
    title: 'Car Loan',
    rate: '9.2%',
    description: 'Drive your dream car today with quick approval and low interest rates.',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: GraduationCap,
    title: 'Education Loan',
    rate: '7.8%',
    description: 'Invest in your future with our comprehensive student loan programs.',
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    icon: Briefcase,
    title: 'Business Loan',
    rate: '10.5%',
    description: 'Scale your business with capital designed for growth and innovation.',
    color: 'bg-amber-50 text-amber-600'
  },
  {
    icon: Wallet,
    title: 'Personal Loan',
    rate: '11.2%',
    description: 'Quick cash for your personal needs with minimal documentation.',
    color: 'bg-rose-50 text-rose-600'
  }
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#02040a]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-emerald-500/10 to-transparent blur-[120px] opacity-50" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        
        {/* Starry background simulation */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase mb-10 border border-emerald-500/20 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4" />
                Next-Gen Financial Infrastructure
              </span>
              <h1 className="text-7xl lg:text-9xl font-bold tracking-tight text-white mb-10 leading-[0.85]">
                Bridging Your <br />
                <span className="text-emerald-500">Financial Future.</span>
              </h1>
              <p className="text-xl text-zinc-400 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
                FinBridge provides high-liquidity loan solutions with institutional-grade security 
                and lightning-fast processing. Experience the future of capital.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-12 py-5 bg-emerald-500 text-zinc-950 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:scale-[1.05] active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all active:scale-95 backdrop-blur-md"
                >
                  Client Dashboard
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-white mb-4">Capital Solutions</h2>
              <p className="text-zinc-500">Tailored financial instruments designed for modern requirements.</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent mx-8 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanTypes.map((loan, index) => (
              <motion.div
                key={loan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="bg-white/[0.02] p-10 rounded-[2.5rem] border border-white/[0.05] backdrop-blur-sm transition-all group cursor-default"
              >
                <div className={`w-16 h-16 ${loan.color.replace('bg-', 'bg-opacity-10 bg-')} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner`}>
                  <loan.icon className="w-8 h-8" />
                </div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white">{loan.title}</h3>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold text-xl block leading-none">{loan.rate}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Fixed p.a.</span>
                  </div>
                </div>
                <p className="text-zinc-500 leading-relaxed mb-10 text-sm font-light">
                  {loan.description}
                </p>
                <Link 
                  to="/register" 
                  className="inline-flex items-center gap-3 text-xs font-bold text-emerald-500 uppercase tracking-[0.2em] group-hover:text-emerald-400 transition-colors"
                >
                  Initialize
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-40 border-t border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="space-y-8 p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05]"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <Zap className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Algorithmic Processing</h3>
              <p className="text-zinc-500 leading-relaxed font-light">
                Our proprietary risk assessment engine processes data points in real-time, 
                delivering approval decisions with unprecedented speed.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="space-y-8 p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05]"
            >
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <ShieldCheck className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Encrypted Infrastructure</h3>
              <p className="text-zinc-500 leading-relaxed font-light">
                Multi-layer security protocols ensure your financial data remains 
                sovereign and protected against all external vectors.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="space-y-8 p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05]"
            >
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <CheckCircle2 className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Transparent Ledger</h3>
              <p className="text-zinc-500 leading-relaxed font-light">
                Complete visibility into your loan lifecycle with no hidden fees 
                or obfuscated terms. Financial clarity by design.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-[4rem] p-16 lg:p-32 text-center relative overflow-hidden border border-white/[0.05] shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-10 relative z-10 leading-tight">
                Ready to bridge the <br />gap to your goals?
              </h2>
              <p className="text-zinc-500 text-xl mb-16 max-w-2xl mx-auto relative z-10 font-light">
                Join the elite network of FinBridge clients and access the 
                capital you need to scale your vision.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-3 px-14 py-6 bg-emerald-500 text-zinc-950 rounded-[2rem] font-bold text-xl hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 relative z-10 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
              >
                Initialize Account
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
