import React from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { NavTabId } from './Sidebar';
import {
  Smartphone,
  Monitor,
  Menu,
  X,
  PlusCircle,
} from 'lucide-react';

interface Props {
  onQuickAction?: () => void;
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<Props> = ({
  onQuickAction,
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const {
    activePlatform,
    setActivePlatform,
    currentUser,
    setCurrentUser,
    users,
    settings,
  } = useWaterBilling();

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-6 py-2.5 sm:py-3.5">
        {/* Left: Mobile Menu Hamburger (Visible on < lg) & Brand wordmark */}
        <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0">
          {activePlatform === 'web' && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <div className="w-8 h-8 rounded-lg overflow-hidden bg-cyan-600 flex items-center justify-center shadow-xs shrink-0">
            <img
              src="/src/assets/images/water_utility_badge_1791655144096.jpg"
              alt="ZUCAR Water"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold tracking-tight text-slate-900 leading-tight">
              ZUCAR Water
            </div>
            <div className="hidden sm:block text-[11px] text-slate-500 font-medium leading-none">
              Billing & Utility Suite
            </div>
          </div>
        </div>

        {/* Center: Platform Mode Switcher (Web vs App) */}
        <div className="flex items-center">
          <div className="inline-flex items-center p-0.5 sm:p-1 bg-slate-100 rounded-lg sm:rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setActivePlatform('web');
                setIsMobileMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md sm:rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-0 ${
                activePlatform === 'web'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span className="hidden xs:inline">Web Portal</span>
              <span className="xs:hidden">Web</span>
            </button>
            <button
              onClick={() => {
                setActivePlatform('mobile');
                setIsMobileMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md sm:rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-0 ${
                activePlatform === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span className="hidden xs:inline">Mobile App</span>
              <span className="xs:hidden">App</span>
            </button>
          </div>
        </div>

        {/* Right: User Switcher & Action button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* User selector on tablet/desktop */}
          <div className="hidden md:flex items-center gap-1.5 text-xs">
            <select
              value={currentUser.id}
              onChange={(e) => {
                const u = users.find((x) => x.id === e.target.value);
                if (u) setCurrentUser(u);
              }}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          {onQuickAction && (
            <button
              onClick={onQuickAction}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer min-h-[36px]"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Quick Action</span>
              <span className="sm:hidden">Action</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

