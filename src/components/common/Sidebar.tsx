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
}

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
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

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-61px)] flex flex-col justify-between p-4">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Core Modules
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
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
            Need on-site meter readings or customer self-service? Switch to the mobile touch app.
          </p>
          <button
            onClick={() => setActivePlatform('mobile')}
            className="w-full py-1.5 px-2 bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
          >
            Launch Mobile App
          </button>
        </div>

        <div className="px-3 py-1 text-[11px] text-slate-400">
          ZUCAR IT SOLUTIONS · v1.0 Standard
        </div>
      </div>
    </aside>
  );
};
