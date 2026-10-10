import React from 'react';
import {
  LayoutDashboard,
  Users,
  Gauge,
  FileSpreadsheet,
  ReceiptText,
  CreditCard,
  FileText,
  BarChart3,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { useWaterBilling } from '../../context/WaterBillingContext';

export type NavTabId =
  | 'dashboard'
  | 'customers'
  | 'meters'
  | 'readings'
  | 'billing'
  | 'payments'
  | 'statements'
  | 'reports'
  | 'admin';

interface Props {
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  isOpen = false,
  onClose,
}) => {
  const { readings, bills, setActivePlatform } = useWaterBilling();

  const pendingBillsCount = readings.filter((r) => r.status === 'Verified').length;
  const unpaidBillsCount = bills.filter((b) => b.status === 'Unpaid' || b.status === 'Overdue').length;

  const navItems: { id: NavTabId; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'meters', label: 'Meter Management', icon: Gauge },
    { id: 'readings', label: 'Meter Readings', icon: FileSpreadsheet, badge: pendingBillsCount > 0 ? pendingBillsCount : undefined },
    { id: 'billing', label: 'Billing & Invoices', icon: ReceiptText, badge: unpaidBillsCount > 0 ? unpaidBillsCount : undefined },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'statements', label: 'Statements & Receipts', icon: FileText },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'admin', label: 'Administration & Tariffs', icon: ShieldCheck },
  ];

  const sidebarContent = (
    <div className="w-68 sm:w-64 shrink-0 bg-white border-r border-slate-200 h-full flex flex-col justify-between p-4 overflow-y-auto">
      <div className="space-y-2">
        {/* Mobile drawer header with close button */}
        <div className="lg:hidden flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md overflow-hidden bg-cyan-600">
              <img
                src="/src/assets/images/water_utility_badge_1791655144096.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-bold text-slate-900">Navigation Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Core Modules
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Launch Mobile App Banner in Sidebar */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-cyan-950 font-bold text-xs">
            <Smartphone className="w-4 h-4 text-cyan-600" />
            <span>Field Reader & App</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Need on-site meter readings or customer self-service? Switch to mobile touch mode.
          </p>
          <button
            onClick={() => {
              setActivePlatform('mobile');
              if (onClose) onClose();
            }}
            className="w-full py-2 px-2 bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center min-h-[40px] flex items-center justify-center"
          >
            Launch Mobile App
          </button>
        </div>

        <div className="px-3 py-1 text-[11px] text-slate-400">
          ZUCAR IT SOLUTIONS · v1.0 Standard
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Static Sidebar */}
      <aside className="hidden lg:block h-[calc(100vh-61px)] sticky top-[61px] shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative z-10 w-68 sm:w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

