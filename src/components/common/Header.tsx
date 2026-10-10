import React from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { NavTabId } from './Sidebar';
import {
  Smartphone,
  Monitor,
  Users,
  PlusCircle,
  RotateCcw,
} from 'lucide-react';

interface Props {
  onQuickAction?: () => void;
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
}

export const Header: React.FC<Props> = ({ onQuickAction, activeTab, setActiveTab }) => {
  const {
    activePlatform,
    setActivePlatform,
    currentUser,
    setCurrentUser,
    users,
    settings,
  } = useWaterBilling();

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark with brand badge */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-cyan-600 flex items-center justify-center shadow-xs">
            <img
              src="/src/assets/images/water_utility_badge_1791655144096.jpg"
              alt="ZUCAR Water"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-slate-900 leading-tight">
              ZUCAR Water Billing
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-none">
              Standard Utility Suite
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation / Platform Mode Switcher & Quick Navigation */}
        <div className="flex items-center gap-2">
          {/* Web vs App Switcher */}
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActivePlatform('web')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePlatform === 'web'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-cyan-600" />
              <span>Web Portal</span>
            </button>
            <button
              onClick={() => setActivePlatform('mobile')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activePlatform === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-600" />
              <span>Mobile App</span>
            </button>
          </div>
        </div>

        {/* Zone 3: Active User Switcher & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* User Role Selector */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="text-slate-400">User:</span>
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quick Action</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
