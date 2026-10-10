import React, { useState } from 'react';
import { useFFTC } from '../../context/FFTCContext';
import {
  X,
  User,
  ShieldCheck,
  Trees,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalCourseToEnroll,
    courses,
    login,
    register,
  } = useFFTC();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Nyandarua County');
  const [location, setLocation] = useState('Ol\'Kalou');
  const [farmSize, setFarmSize] = useState('2.5');
  const [occupation, setOccupation] = useState('Smallholder Farmer');
  const [errorMsg, setErrorMsg] = useState('');

  if (!authModalOpen) return null;

  const targetCourse = courses.find((c) => c.id === authModalCourseToEnroll);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address');
      return;
    }
    const success = login(email, password);
    if (!success) {
      setErrorMsg('Invalid email or password. You can also use the 1-Click Demo Profiles below.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg('Please fill in your full name and email address');
      return;
    }
    register({
      name,
      email,
      phone: phone || '0700 000 000',
      county,
      location,
      farmSizeAcres: parseFloat(farmSize) || 2.0,
      occupation,
      role: 'learner',
    });
  };

  const handleQuickLogin = (demoEmail: string) => {
    login(demoEmail, 'demo123');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="bg-emerald-950 text-white p-5 sm:p-6 border-b border-emerald-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-400">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                  FFTC Learner Authentication
                </h3>
                <p className="text-xs text-emerald-300">
                  {targetCourse
                    ? `Enrolling in: ${targetCourse.title}`
                    : 'Access Courses, Practicals & Certification'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setAuthModalOpen(false)}
              className="p-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {targetCourse && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-900/80 border border-emerald-700/60 flex items-center gap-2.5 text-xs">
              <span className="px-2 py-0.5 rounded bg-amber-400 text-emerald-950 font-bold text-[10px]">
                {targetCourse.code}
              </span>
              <span className="text-emerald-100 truncate">
                Login is required to verify learner records and issue accredited TVETA certificates.
              </span>
            </div>
          )}
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
              mode === 'login'
                ? 'border-emerald-800 text-emerald-950 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Learner Login
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
              mode === 'register'
                ? 'border-emerald-800 text-emerald-950 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address / Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. mary.kariuki@farmforestry.or.ke"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (or leave blank for demo)"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>Log In & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Joseph Gicheru"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. j.gicheru@gmail.com"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0712 000 000"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    County
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Nyandarua County">Nyandarua County</option>
                    <option value="Nakuru County">Nakuru County</option>
                    <option value="Laikipia County">Laikipia County</option>
                    <option value="Nyeri County">Nyeri County</option>
                    <option value="Kiambu County">Kiambu County</option>
                    <option value="Other County">Other County</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Location / Ward
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Gathanji Ward"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Farm Size (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    placeholder="2.5"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Role / Category
                  </label>
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Smallholder Farmer">Smallholder Farmer</option>
                    <option value="Youth Tree Grower">Youth Tree Grower</option>
                    <option value="Nursery Operator">Nursery Operator</option>
                    <option value="Extension Officer">Extension Officer</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>Register & Enrol in Course</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick 1-Click Evaluation Accounts */}
          <div className="pt-4 border-t border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant 1-Click Demo Profiles (For Quick Evaluation):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('mary.kariuki@farmforestry.or.ke')}
                className="p-2 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/90 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-[11px]">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Mary Kariuki</span>
                </div>
                <div className="text-[10px] text-emerald-700 truncate">
                  Learner · 2 Modules Done
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('john.mwangi@gmail.com')}
                className="p-2 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/90 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px]">
                  <Trees className="w-3.5 h-3.5 text-blue-700" />
                  <span>John Mwangi</span>
                </div>
                <div className="text-[10px] text-blue-700 truncate">
                  Youth · Certified CFFB
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin@fftc.or.ke')}
                className="p-2 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/90 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-purple-900 font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                  <span>Admin Dr. Kimani</span>
                </div>
                <div className="text-[10px] text-purple-700 truncate">
                  Full Administrator Access
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
