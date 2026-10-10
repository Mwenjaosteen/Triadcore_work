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

const MainAppContent: React.FC = () => {
  const {
    activePlatform,
    selectedBill,
    setSelectedBill,
    selectedPayment,
    setSelectedPayment,
  } = useWaterBilling();

  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');

  // Trigger modals from dashboard or header
  const [openNewCustomerModal, setOpenNewCustomerModal] = useState(false);
  const [openNewReadingModal, setOpenNewReadingModal] = useState(false);
  const [openNewPaymentModal, setOpenNewPaymentModal] = useState(false);

  const handleQuickAction = () => {
    setOpenNewReadingModal(true);
    setActiveTab('readings');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Universal Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickAction={activePlatform === 'web' ? handleQuickAction : undefined}
      />

      {/* Main Layout Area */}
      {activePlatform === 'web' ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Navigation Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content Workspace */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl mx-auto w-full">
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
        </div>
      ) : (
        /* Mobile App View (App-Based experience) */
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-5xl mx-auto w-full">
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
