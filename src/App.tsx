import React, { useState } from 'react';
import { WaterBillingProvider, useWaterBilling } from './context/WaterBillingContext';
import { Header } from './components/common/Header';
import { Sidebar, NavTabId } from './components/common/Sidebar';
import { ManagementDashboard } from './components/dashboard/ManagementDashboard';
import { CustomerManagement } from './components/customers/CustomerManagement';
import { MeterManagement } from './components/meters/MeterManagement';
import { MeterReadingsView } from './components/readings/MeterReadingsView';
import { BillingView } from './components/billing/BillingView';
import { PaymentsView } from './components/payments/PaymentsView';
import { StatementsView } from './components/statements/StatementsView';
import { ReportsView } from './components/reports/ReportsView';
import { AdministrationView } from './components/admin/AdministrationView';
import { MobileAppContainer } from './components/mobile/MobileAppContainer';
import { BillInvoiceModal } from './components/modals/BillInvoiceModal';
import { PaymentReceiptModal } from './components/modals/PaymentReceiptModal';
import {
  LayoutDashboard,
  FileSpreadsheet,
  ReceiptText,
  CreditCard,
  Menu,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activePlatform,
    selectedBill,
    setSelectedBill,
    selectedPayment,
    setSelectedPayment,
    readings,
    bills,
  } = useWaterBilling();

  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Trigger modals from dashboard or header
  const [openNewCustomerModal, setOpenNewCustomerModal] = useState(false);
  const [openNewReadingModal, setOpenNewReadingModal] = useState(false);
  const [openNewPaymentModal, setOpenNewPaymentModal] = useState(false);

  const handleQuickAction = () => {
    setOpenNewReadingModal(true);
    setActiveTab('readings');
  };

  const pendingBillsCount = readings.filter((r) => r.status === 'Verified').length;
  const unpaidBillsCount = bills.filter((b) => b.status === 'Unpaid' || b.status === 'Overdue').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Universal Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickAction={activePlatform === 'web' ? handleQuickAction : undefined}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Layout Area */}
      {activePlatform === 'web' ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Navigation Sidebar (Desktop Static + Mobile Drawer) */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Main Content Workspace */}
          <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8 pb-24 lg:pb-8 max-w-7xl mx-auto w-full">
            {activeTab === 'dashboard' && (
              <ManagementDashboard
                setActiveTab={setActiveTab}
                onOpenQuickReading={() => {
                  setOpenNewReadingModal(true);
                  setActiveTab('readings');
                }}
                onOpenQuickPayment={() => {
                  setOpenNewPaymentModal(true);
                  setActiveTab('payments');
                }}
                onOpenNewCustomer={() => {
                  setOpenNewCustomerModal(true);
                  setActiveTab('customers');
                }}
              />
            )}

            {activeTab === 'customers' && (
              <CustomerManagement
                setActiveTab={setActiveTab}
                openNewModal={openNewCustomerModal}
                setOpenNewModal={setOpenNewCustomerModal}
              />
            )}

            {activeTab === 'meters' && <MeterManagement />}

            {activeTab === 'readings' && (
              <MeterReadingsView
                setActiveTab={setActiveTab}
                openNewModal={openNewReadingModal}
                setOpenNewModal={setOpenNewReadingModal}
              />
            )}

            {activeTab === 'billing' && (
              <BillingView
                setActiveTab={setActiveTab}
                onOpenQuickPayment={() => {
                  setOpenNewPaymentModal(true);
                  setActiveTab('payments');
                }}
              />
            )}

            {activeTab === 'payments' && (
              <PaymentsView
                openNewModal={openNewPaymentModal}
                setOpenNewModal={setOpenNewPaymentModal}
              />
            )}

            {activeTab === 'statements' && <StatementsView />}

            {activeTab === 'reports' && <ReportsView />}

            {activeTab === 'admin' && <AdministrationView />}
          </main>

          {/* Mobile Bottom Navigation Bar (Visible only on screens < lg in Web mode) */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-lg">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors cursor-pointer ${
                activeTab === 'dashboard' ? 'text-cyan-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-[10px] mt-0.5 tracking-tight">Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('readings')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors cursor-pointer relative ${
                activeTab === 'readings' ? 'text-cyan-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="text-[10px] mt-0.5 tracking-tight">Readings</span>
              {pendingBillsCount > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-cyan-600" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors cursor-pointer relative ${
                activeTab === 'billing' ? 'text-cyan-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ReceiptText className="w-4 h-4" />
              <span className="text-[10px] mt-0.5 tracking-tight">Bills</span>
              {unpaidBillsCount > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors cursor-pointer ${
                activeTab === 'payments' ? 'text-cyan-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-[10px] mt-0.5 tracking-tight">Payments</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span className="text-[10px] mt-0.5 tracking-tight">More</span>
            </button>
          </nav>
        </div>
      ) : (
        /* Mobile App View (App-Based experience) */
        <main className="flex-1 overflow-y-auto p-2.5 sm:p-6 md:p-8 max-w-5xl mx-auto w-full">
          <MobileAppContainer />
        </main>
      )}

      {/* Global Invoice Modal */}
      {selectedBill && (
        <BillInvoiceModal
          bill={selectedBill}
          onClose={() => setSelectedBill(null)}
        />
      )}

      {/* Global Payment Receipt Modal */}
      {selectedPayment && (
        <PaymentReceiptModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <WaterBillingProvider>
      <MainAppContent />
    </WaterBillingProvider>
  );
}

