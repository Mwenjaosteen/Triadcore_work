import React, { useState } from 'react';
import { useFFTC, FFTCTabId } from '../../context/FFTCContext';
import {
  Trees,
  Award,
  BookOpen,
  CheckCircle2,
  Menu,
  X,
  User,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  LogIn,
  LogOut,
  ChevronDown,
} from 'lucide-react';

export const FFTCHeader: React.FC = () => {
  const {
    currentUser,
    isLoggedIn,
    isAdmin,
    activeTab,
    setActiveTab,
    setAuthModalOpen,
    logout,
    login,
  } = useFFTC();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const completedCount = currentUser?.completedModules.length || 0;
  const progressPercent = Math.round((completedCount / 7) * 100);

  const navItems: { id: FFTCTabId; label: string; icon: React.ElementType }[] = [
    { id: 'curriculum', label: 'CFFB Curriculum', icon: BookOpen },
    { id: 'exercises', label: 'Field Exercises & Tools', icon: Trees },
    { id: 'assessment', label: 'Competency Assessment', icon: CheckCircle2 },
    { id: 'manuals', label: '10 Manuals Directory', icon: GraduationCap },
    { id: 'policy', label: 'Policies & TGAN Info', icon: User },
    { id: 'certificate', label: 'Certificate (CFFB)', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-emerald-950 text-white shadow-md border-b border-emerald-800/60">
      {/* Top Banner Stripe */}
      <div className="bg-emerald-900/95 text-emerald-200 px-4 py-1 text-[11px] flex items-center justify-between border-b border-emerald-800/40">
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold text-emerald-100">FARM FORESTRY TRAINING CENTER (FFTC)</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-emerald-300">Tree Growers Association of Nyandarua (TGAN)</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline text-emerald-400">Nyandarua County, Kenya</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 font-mono text-[10px]">
          <span className="text-emerald-300">30 Credit Hours</span>
          <span>·</span>
          <span className="text-amber-300 font-semibold">TVETA Aligned</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-3.5 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Emblem */}
        <div
          onClick={() => setActiveTab('curriculum')}
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-emerald-800 border border-emerald-600/50 flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/src/assets/images/fftc_logo_emblem_1791668840881.jpg"
              alt="FFTC Emblem"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-tight flex items-center gap-1.5">
              <span>FFTC E-Learning Portal</span>
              {isAdmin && (
                <span className="px-1.5 py-0.2 rounded bg-purple-900 text-purple-200 text-[10px] font-mono border border-purple-600">
                  ADMIN
                </span>
              )}
            </div>
            <div className="text-[11px] text-emerald-300 font-medium leading-none">
              Certificate in Farm Forestry Basics (CFFB)
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-emerald-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Admin Tab Link */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-purple-800 text-white shadow-xs border border-purple-500'
                : 'text-purple-300 hover:text-white hover:bg-purple-950/80 border border-purple-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
            <span>Admin Portal</span>
          </button>
        </nav>

        {/* Right Section: Auth & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Progress pill on medium+ screens */}
          {isLoggedIn && !isAdmin && (
            <div className="hidden lg:flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-xl border border-emerald-800 text-xs">
              <div className="w-16 h-2 bg-emerald-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-mono text-emerald-300 font-semibold">{progressPercent}%</span>
            </div>
          )}

          {/* Auth Action Buttons */}
          {isLoggedIn && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 border border-emerald-700/60 text-xs transition-colors cursor-pointer"
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                  isAdmin ? 'bg-purple-700 text-white' : 'bg-emerald-700 text-amber-300'
                }`}>
                  {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : (currentUser.name?.charAt(0) || 'U')}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-bold text-white text-[11px] leading-tight truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-300 capitalize leading-none">
                    {isAdmin ? 'System Admin' : `${currentUser.enrolledCourses.length} Courses`}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-150"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <div className="font-bold text-xs text-slate-900">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">{currentUser.email}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                      {currentUser.county} · {currentUser.occupation}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                    <span>My Courses & Catalog</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('admin')}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-purple-50 flex items-center gap-2 text-purple-900"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                    <span>Admin Portal (Manage Curriculums)</span>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={logout}
                      className="w-full px-3.5 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In / Enrol</span>
            </button>
          )}

          {/* Mobile Menu Hamburger (Visible < xl) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Visible on screens < xl when toggled) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-emerald-800 bg-emerald-950 px-4 py-3 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-emerald-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white'
                      : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              setActiveTab('admin');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-purple-950 border border-purple-800 text-purple-200 font-bold text-xs"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Admin Portal (Manage Curriculums)</span>
            </div>
            <span className="text-[10px] bg-purple-800 px-2 py-0.5 rounded font-mono">
              STAFF
            </span>
          </button>

          {!isLoggedIn ? (
            <button
              onClick={() => {
                setAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-extrabold text-xs flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In or Create Learner Account</span>
            </button>
          ) : (
            <div className="pt-2 flex items-center justify-between text-xs text-emerald-300">
              <div>
                Logged in as: <strong className="text-white">{currentUser?.name || 'Learner'}</strong>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-rose-400 hover:text-rose-300 font-semibold"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
