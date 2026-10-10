import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { Bill, BillStatus } from '../../types/billing';
import { formatCurrency } from '../../utils/billingCalculator';
import {
  ReceiptText,
  Search,
  Filter,
  CheckCircle2,
  Printer,
  CreditCard,
  AlertCircle,
  FileSpreadsheet,
  Clock,
  Sparkles,
} from 'lucide-react';
import { NavTabId } from '../common/Sidebar';

interface Props {
  setActiveTab: (tab: NavTabId) => void;
  onOpenQuickPayment: () => void;
}

export const BillingView: React.FC<Props> = ({ setActiveTab, onOpenQuickPayment }) => {
  const {
    bills,
    readings,
    tariffs,
    batchGenerateBills,
    selectedBill,
    setSelectedBill,
  } = useWaterBilling();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const pendingReadingsCount = readings.filter((r) => r.status === 'Verified').length;

  const filteredBills = bills.filter((b) => {
    const matchesSearch =
      b.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.meterNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBatchGenerate = () => {
    const count = batchGenerateBills();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Billing & Invoices
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tariff-based automatic water charges, fixed surcharges, arrears forward, and printable customer notices.
          </p>
        </div>

        {pendingReadingsCount > 0 && (
          <button
            onClick={handleBatchGenerate}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Generate {pendingReadingsCount} Pending Bills</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by invoice #, account #, name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="All">All Billing Statuses</option>
            <option value="Unpaid">Unpaid Bills</option>
            <option value="Partial">Partial Payments</option>
            <option value="Paid">Fully Paid</option>
            <option value="Overdue">Overdue Arrears</option>
          </select>
        </div>
      </div>

      {/* Bills Data Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Invoice No. & Date</th>
                <th className="py-3 px-4">Customer & Account</th>
                <th className="py-3 px-4">Meter No.</th>
                <th className="py-3 px-4 text-right">Consumption</th>
                <th className="py-3 px-4 text-right">Current Charges</th>
                <th className="py-3 px-4 text-right">Arrears B/F</th>
                <th className="py-3 px-4 text-right">Total Payable</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBills.map((b) => (
                <tr key={b.billNo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-slate-900 block">{b.billNo}</span>
                    <span className="text-[11px] text-slate-500">{b.billingDate}</span>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{b.customerName}</p>
                    <p className="font-mono text-[11px] text-cyan-700">{b.accountNo}</p>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-700">
                    {b.meterNo}
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-slate-800">
                    {b.consumption} m³
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700">
                    {formatCurrency(b.waterCharge + b.meterRent + b.sanitationFee, tariffs.currencySymbol)}
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-500">
                    {formatCurrency(b.previousBalance, tariffs.currencySymbol)}
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                    {formatCurrency(b.totalPayable, tariffs.currencySymbol)}
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold">
                    <span className={b.balanceDue > 0 ? 'text-rose-600' : 'text-emerald-600'}>
                      {formatCurrency(b.balanceDue, tariffs.currencySymbol)}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[11px] text-slate-600">
                    {b.dueDate}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        b.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'Partial'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        title="Print / View Invoice"
                        onClick={() => setSelectedBill(b)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors cursor-pointer"
                      >
                        <Printer className="w-3 h-3 text-slate-600" />
                        <span>Print Bill</span>
                      </button>

                      {b.balanceDue > 0 && (
                        <button
                          title="Record Payment for Bill"
                          onClick={onOpenQuickPayment}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredBills.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-400 text-xs">
                    No billing invoices match this filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
