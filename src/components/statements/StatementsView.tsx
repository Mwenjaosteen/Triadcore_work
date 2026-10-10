import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { Customer } from '../../types/billing';
import { formatCurrency } from '../../utils/billingCalculator';
import {
  FileText,
  Printer,
  Download,
  Search,
  User,
  Gauge,
  MapPin,
  Phone,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const StatementsView: React.FC = () => {
  const {
    customers,
    bills,
    payments,
    settings,
    tariffs,
    selectedCustomer,
    setSelectedCustomer,
  } = useWaterBilling();

  const [activeAccountNo, setActiveAccountNo] = useState<string>(
    selectedCustomer ? selectedCustomer.accountNo : customers[0]?.accountNo || ''
  );

  const customer = customers.find((c) => c.accountNo === activeAccountNo) || customers[0];

  // Build combined ledger sorted by date
  const customerBills = bills.filter((b) => b.accountNo === customer?.accountNo);
  const customerPayments = payments.filter((p) => p.accountNo === customer?.accountNo);

  interface LedgerRow {
    date: string;
    refNo: string;
    description: string;
    type: 'INVOICE' | 'PAYMENT';
    debit: number;
    credit: number;
    runningBalance: number;
  }

  const rawEntries: {
    date: string;
    refNo: string;
    description: string;
    type: 'INVOICE' | 'PAYMENT';
    debit: number;
    credit: number;
  }[] = [];

  customerBills.forEach((b) => {
    rawEntries.push({
      date: b.billingDate,
      refNo: b.billNo,
      description: `Water Bill (${b.billingPeriod}) - ${b.consumption} m³`,
      type: 'INVOICE',
      debit: b.totalPayable - b.previousBalance,
      credit: 0,
    });
  });

  customerPayments.forEach((p) => {
    rawEntries.push({
      date: p.paymentDate.split(' ')[0],
      refNo: p.receiptNo,
      description: `Payment via ${p.method} (Ref: ${p.reference})`,
      type: 'PAYMENT',
      debit: 0,
      credit: p.amount,
    });
  });

  rawEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let bal = 0;
  const ledgerRows: LedgerRow[] = rawEntries.map((entry) => {
    bal += entry.debit - entry.credit;
    return {
      ...entry,
      runningBalance: Math.round(bal * 100) / 100,
    };
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    if (!customer) return;
    const headers = ['Date', 'Reference', 'Description', 'Debit', 'Credit', 'Running Balance'];
    const rows = ledgerRows.map((r) => [
      r.date,
      r.refNo,
      `"${r.description}"`,
      r.debit.toFixed(2),
      r.credit.toFixed(2),
      r.runningBalance.toFixed(2),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Statement_${customer.accountNo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header (No print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Customer Statements & Receipts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete account financial history, water bill debits, payments credited, and balance ledger.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Official Statement</span>
          </button>
        </div>
      </div>

      {/* Customer Picker (No print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3 shadow-xs">
        <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
          Select Customer Account:
        </label>
        <select
          value={activeAccountNo}
          onChange={(e) => setActiveAccountNo(e.target.value)}
          className="w-full sm:w-96 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
        >
          {customers.map((c) => (
            <option key={c.accountNo} value={c.accountNo}>
              {c.name} — {c.accountNo} ({c.estateZone})
            </option>
          ))}
        </select>
      </div>

      {/* Statement Sheet (Print friendly) */}
      {customer && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-600 overflow-hidden shadow-xs">
                <img
                  src="/src/assets/images/water_utility_badge_1791655144096.jpg"
                  alt="Utility Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{settings.utilityName}</h2>
                <p className="text-xs text-slate-500">{settings.physicalAddress} · Tel: {settings.contactPhone}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">Customer Account Statement</span>
              <p className="text-xs text-slate-500 mt-1">Generated: <span className="font-medium text-slate-800">{new Date().toLocaleDateString()}</span></p>
            </div>
          </div>

          {/* Account Particulars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Customer Name</span>
              <span className="font-bold text-slate-900 text-sm">{customer.name}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Account Number</span>
              <span className="font-mono font-bold text-cyan-700 text-sm">{customer.accountNo}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Meter Assigned</span>
              <span className="font-mono font-semibold text-slate-800">{customer.meterNo}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Current Balance Due</span>
              <span className="font-mono font-bold text-rose-600 text-sm">
                {formatCurrency(customer.currentBalance, tariffs.currencySymbol)}
              </span>
            </div>
          </div>

          {/* Ledger Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Statement Ledger</h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Reference #</th>
                    <th className="py-2.5 px-3">Transaction Description</th>
                    <th className="py-2.5 px-3 text-right">Debit (Charges)</th>
                    <th className="py-2.5 px-3 text-right">Credit (Payments)</th>
                    <th className="py-2.5 px-3 text-right">Running Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ledgerRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono text-slate-600">{row.date}</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">{row.refNo}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.description}</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-800">
                        {row.debit > 0 ? formatCurrency(row.debit, tariffs.currencySymbol) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-emerald-600">
                        {row.credit > 0 ? formatCurrency(row.credit, tariffs.currencySymbol) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {formatCurrency(row.runningBalance, tariffs.currencySymbol)}
                      </td>
                    </tr>
                  ))}

                  {ledgerRows.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No financial transactions on record for this account.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Statement Footer */}
          <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">Official Utility Statement</p>
              <p className="text-[11px] text-slate-400">Payments can be remitted via M-Pesa Paybill {settings.paybillNumber} (A/C: {customer.accountNo})</p>
            </div>
            <div className="text-right">
              <span className="text-slate-500">Closing Balance:</span>
              <span className="font-mono font-bold text-slate-900 text-base ml-2">
                {formatCurrency(customer.currentBalance, tariffs.currencySymbol)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
