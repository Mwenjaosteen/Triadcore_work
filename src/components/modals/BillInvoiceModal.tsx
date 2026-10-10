import React from 'react';
import { Bill } from '../../types/billing';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { formatCurrency } from '../../utils/billingCalculator';
import { Printer, X, Droplets, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  bill: Bill;
  onClose: () => void;
}

export const BillInvoiceModal: React.FC<Props> = ({ bill, onClose }) => {
  const { settings, tariffs, recordPayment } = useWaterBilling();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-2 sm:my-8 max-h-[92vh] flex flex-col">
        {/* Modal Controls (Hidden in print) */}
        <div className="no-print flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2 truncate">
            <span className="text-xs sm:text-sm font-semibold tracking-wide truncate">Official Water Invoice</span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-mono truncate">· {bill.billNo}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors cursor-pointer min-h-[36px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Close invoice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 text-slate-900 bg-white overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-4 sm:pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white shadow-sm overflow-hidden shrink-0">
                <img
                  src="/src/assets/images/water_utility_badge_1791655144096.jpg"
                  alt="ZUCAR Water Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900">{settings.utilityName}</h1>
                <p className="text-[11px] sm:text-xs text-slate-500">{settings.tagline} · Powered by {settings.vendorName}</p>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{settings.physicalAddress} · Tel: {settings.contactPhone}</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] sm:text-xs font-semibold text-cyan-700 tracking-wider">WATER BILL & NOTICE</span>
              <p className="text-base sm:text-lg font-mono font-bold text-slate-900 mt-0.5">{bill.billNo}</p>
              <p className="text-[11px] sm:text-xs text-slate-500">Billing Date: <span className="font-medium text-slate-700">{bill.billingDate}</span></p>
              <p className="text-[11px] sm:text-xs text-red-600 font-semibold mt-0.5">Due Date: {bill.dueDate}</p>
            </div>
          </div>

          {/* Customer & Meter Meta Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Customer Information</span>
              <p className="font-semibold text-slate-900 text-sm">{bill.customerName}</p>
              <p className="text-slate-600">Account No: <span className="font-mono font-semibold text-slate-800">{bill.accountNo}</span></p>
              <p className="text-slate-600">Address: {bill.address}</p>
              <p className="text-slate-600">Zone / Estate: {bill.estateZone}</p>
              <p className="text-slate-600">Phone: {bill.customerPhone}</p>
            </div>

            <div className="space-y-1 sm:pl-4 sm:border-l border-slate-200">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Meter & Consumption Details</span>
              <p className="text-slate-600">Meter Number: <span className="font-mono font-semibold text-slate-800">{bill.meterNo}</span></p>
              <p className="text-slate-600">Customer Category: <span className="font-medium text-slate-900">{bill.category}</span></p>
              <p className="text-slate-600">Billing Period: <span className="font-medium text-slate-900">{bill.billingPeriod}</span></p>
              <div className="mt-2 pt-2 border-t border-slate-200 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Previous</span>
                  <span className="font-mono font-bold text-slate-800 text-xs sm:text-sm">{bill.previousReading} m³</span>
                </div>
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Current</span>
                  <span className="font-mono font-bold text-slate-800 text-xs sm:text-sm">{bill.currentReading} m³</span>
                </div>
                <div className="bg-cyan-50 p-1.5 rounded border border-cyan-200">
                  <span className="text-[10px] text-cyan-700 font-semibold block">Consumption</span>
                  <span className="font-mono font-bold text-cyan-800 text-xs sm:text-sm">{bill.consumption} m³</span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Calculation Breakdown (Slide 6 Automatic Billing) */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Itemized Water & Surcharge Charges</h3>
            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-xs text-left min-w-[340px]">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 text-right">Units (m³)</th>
                    <th className="py-2.5 px-3 text-right">Rate ({tariffs.currencySymbol}/m³)</th>
                    <th className="py-2.5 px-3 text-right">Amount ({tariffs.currencySymbol})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bill.breakdown.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2 px-3 text-slate-800">Water Consumption Tier ({item.range})</td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-600">{item.volumeM3} m³</td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-600">{item.rate.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums font-medium text-slate-900">{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  {bill.breakdown.length === 0 && (
                    <tr>
                      <td className="py-2 px-3 text-slate-800">Base Minimum Consumption</td>
                      <td className="py-2 px-3 text-right font-mono">0 m³</td>
                      <td className="py-2 px-3 text-right font-mono">0.00</td>
                      <td className="py-2 px-3 text-right font-mono">0.00</td>
                    </tr>
                  )}
                  <tr className="bg-slate-50 font-medium">
                    <td colSpan={3} className="py-2 px-3 text-slate-700">Subtotal Water Charge</td>
                    <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-900">{bill.waterCharge.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-2 px-3 text-slate-600">Fixed Meter Rent & Maintenance Fee</td>
                    <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-900">{bill.meterRent.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-2 px-3 text-slate-600">Sanitation & Sewerage Levy (10%)</td>
                    <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-900">{bill.sanitationFee.toFixed(2)}</td>
                  </tr>
                  {bill.penaltyFee > 0 && (
                    <tr className="text-red-700">
                      <td colSpan={3} className="py-2 px-3 font-medium">Late Payment Penalty (5%)</td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums font-semibold">{bill.penaltyFee.toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Summary & Arrears */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="font-semibold text-slate-800 uppercase tracking-wider text-[10px] block">Payment Methods</span>
              <div className="space-y-1 text-slate-600">
                <p>1. <span className="font-semibold text-slate-800">M-Pesa Paybill:</span> {settings.paybillNumber}</p>
                <p className="pl-4 text-slate-500">Account No: <span className="font-mono font-semibold text-cyan-700">{bill.accountNo}</span></p>
                <p>2. <span className="font-semibold text-slate-800">Bank Deposit:</span> {settings.bankName}</p>
                <p className="pl-4 text-slate-500">A/C: {settings.bankAccount}</p>
                <p>3. <span className="font-semibold text-slate-800">In Person:</span> Utility Cash Office Teller</p>
              </div>
              <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-200">
                Payments made after the due date incur a 5% statutory penalty.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                <span>Previous Balance / Arrears:</span>
                <span className="font-mono tabular-nums font-semibold text-slate-800">{formatCurrency(bill.previousBalance, tariffs.currencySymbol)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                <span>Current Month Charges:</span>
                <span className="font-mono tabular-nums font-semibold text-slate-800">
                  {formatCurrency(bill.waterCharge + bill.meterRent + bill.sanitationFee + bill.penaltyFee, tariffs.currencySymbol)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                <span>Payments Received:</span>
                <span className="font-mono tabular-nums font-semibold text-emerald-600">
                  -{formatCurrency(bill.amountPaid, tariffs.currencySymbol)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-bold text-slate-900 bg-slate-50 px-2 rounded-lg">
                <span>TOTAL AMOUNT PAYABLE:</span>
                <span className="font-mono tabular-nums text-cyan-700 text-base">
                  {formatCurrency(bill.balanceDue, tariffs.currencySymbol)}
                </span>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  bill.status === 'Paid'
                    ? 'bg-emerald-100 text-emerald-800'
                    : bill.status === 'Partial'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {bill.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  Status: {bill.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="border-t border-slate-200 pt-4 text-center text-[10px] text-slate-400">
            <p>Thank you for conserving water. Standard Water Billing Management System by {settings.vendorName}.</p>
            <p className="mt-0.5">Customer Support Hotline: {settings.contactPhone} · Email: {settings.contactEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
