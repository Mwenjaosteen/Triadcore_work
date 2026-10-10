import React from 'react';
import { Payment } from '../../types/billing';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { formatCurrency } from '../../utils/billingCalculator';
import { Printer, X, CheckCircle, Receipt } from 'lucide-react';

interface Props {
  payment: Payment;
  onClose: () => void;
}

export const PaymentReceiptModal: React.FC<Props> = ({ payment, onClose }) => {
  const { settings, tariffs, customers, bills } = useWaterBilling();

  const customer = customers.find((c) => c.accountNo === payment.accountNo);
  const bill = bills.find((b) => b.billNo === payment.billNo);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-2 sm:my-8 max-h-[92vh] flex flex-col">
        {/* Controls */}
        <div className="no-print flex items-center justify-between px-4 sm:px-5 py-3 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold">Payment Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors cursor-pointer min-h-[36px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Close receipt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 bg-white text-slate-900 overflow-y-auto">
          <div className="text-center pb-4 border-b border-dashed border-slate-300">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-cyan-600 overflow-hidden">
              <img
                src="/src/assets/images/water_utility_badge_1791655144096.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-base font-bold tracking-tight text-slate-900">{settings.utilityName}</h2>
            <p className="text-xs text-slate-500">{settings.physicalAddress}</p>
            <p className="text-xs text-slate-500">Helpline: {settings.contactPhone}</p>
            <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <CheckCircle className="w-3 h-3" />
              OFFICIAL PAYMENT RECEIPT
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Receipt Number:</span>
              <span className="font-mono font-bold text-slate-900">{payment.receiptNo}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Date & Time:</span>
              <span className="font-medium text-slate-800">{payment.paymentDate}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Customer Name:</span>
              <span className="font-semibold text-slate-900">{payment.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Account Number:</span>
              <span className="font-mono font-semibold text-slate-900">{payment.accountNo}</span>
            </div>
            {customer && (
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Meter Number:</span>
                <span className="font-mono text-slate-700">{customer.meterNo}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Invoice Reference:</span>
              <span className="font-mono text-slate-700">{payment.billNo}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Payment Channel:</span>
              <span className="font-semibold text-slate-800">{payment.method}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Transaction Ref / Cheque:</span>
              <span className="font-mono font-semibold text-cyan-700">{payment.reference}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Cashier / Channel:</span>
              <span className="text-slate-700">{payment.cashierName}</span>
            </div>
          </div>

          {/* Amount Paid Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Amount Received</span>
            <p className="text-2xl font-mono font-bold text-slate-900 mt-0.5">
              {formatCurrency(payment.amount, tariffs.currencySymbol)}
            </p>
            {customer && (
              <p className="text-xs text-slate-500 mt-1">
                Outstanding Balance Remaining: <span className="font-mono font-semibold text-slate-800">{formatCurrency(customer.currentBalance, tariffs.currencySymbol)}</span>
              </p>
            )}
          </div>

          <div className="text-center text-[10px] text-slate-400 border-t border-dashed border-slate-300 pt-3 space-y-0.5">
            <p>System Generated Receipt · ZUCAR Water Billing System</p>
            <p>Retain this receipt for your records. Water is life, conserve every drop.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
