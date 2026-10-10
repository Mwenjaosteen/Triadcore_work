import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { formatCurrency } from '../../utils/billingCalculator';
import {
  BarChart3,
  Printer,
  Download,
  Calendar,
  CreditCard,
  AlertTriangle,
  Droplets,
  Building,
  TrendingUp,
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { bills, payments, readings, customers, tariffs, settings } = useWaterBilling();

  const [activeReportTab, setActiveReportTab] = useState<
    'billing' | 'collections' | 'arrears' | 'consumption'
  >('billing');

  // Calculations
  const totalBilled = bills.reduce((acc, b) => acc + b.totalPayable, 0);
  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);
  const totalArrears = bills.reduce((acc, b) => acc + b.balanceDue, 0);
  const totalM3 = readings.reduce((acc, r) => acc + r.consumption, 0);

  // Group by zone for consumption
  const zoneConsumption: Record<string, { m3: number; count: number; revenue: number }> = {};
  customers.forEach((c) => {
    if (!zoneConsumption[c.estateZone]) {
      zoneConsumption[c.estateZone] = { m3: 0, count: 0, revenue: 0 };
    }
    zoneConsumption[c.estateZone].count += 1;
  });

  bills.forEach((b) => {
    if (zoneConsumption[b.estateZone]) {
      zoneConsumption[b.estateZone].m3 += b.consumption;
      zoneConsumption[b.estateZone].revenue += b.totalPayable;
    }
  });

  // Group payments by method
  const paymentsByMethod: Record<string, number> = {};
  payments.forEach((p) => {
    paymentsByMethod[p.method] = (paymentsByMethod[p.method] || 0) + p.amount;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `Report_${activeReportTab}.csv`;

    if (activeReportTab === 'billing') {
      headers = ['Invoice #', 'Date', 'Customer', 'Account', 'Consumption m3', 'Amount', 'Status'];
      rows = bills.map((b) => [b.billNo, b.billingDate, b.customerName, b.accountNo, b.consumption, b.totalPayable, b.status]);
    } else if (activeReportTab === 'collections') {
      headers = ['Receipt #', 'Date', 'Customer', 'Account', 'Method', 'Reference', 'Amount'];
      rows = payments.map((p) => [p.receiptNo, p.paymentDate, p.customerName, p.accountNo, p.method, p.reference, p.amount]);
    } else if (activeReportTab === 'arrears') {
      headers = ['Account', 'Customer', 'Phone', 'Zone', 'Balance Due'];
      rows = customers.filter(c => c.currentBalance > 0).map((c) => [c.accountNo, c.name, c.phone, c.estateZone, c.currentBalance]);
    } else {
      headers = ['Zone / Estate', 'Customer Count', 'Consumption m3', 'Revenue'];
      rows = Object.entries(zoneConsumption).map(([zone, d]) => [zone, d.count, d.m3, d.revenue]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
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
            Reports & Records (Slide 10)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Audit-grade daily & monthly billing, collection performance, arrears aging, and water consumption summaries.
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
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Total Invoiced Billing</span>
          <p className="text-xl font-mono font-bold text-slate-900 mt-1 tabular-nums">
            {formatCurrency(totalBilled, tariffs.currencySymbol)}
          </p>
          <span className="text-[10px] text-slate-400">{bills.length} invoices generated</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Total Revenue Collected</span>
          <p className="text-xl font-mono font-bold text-emerald-700 mt-1 tabular-nums">
            {formatCurrency(totalCollected, tariffs.currencySymbol)}
          </p>
          <span className="text-[10px] text-emerald-600 font-medium">
            {totalBilled > 0 ? ((totalCollected / totalBilled) * 100).toFixed(1) : 0}% recovery rate
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Total Outstanding Arrears</span>
          <p className="text-xl font-mono font-bold text-rose-600 mt-1 tabular-nums">
            {formatCurrency(totalArrears, tariffs.currencySymbol)}
          </p>
          <span className="text-[10px] text-slate-400">Aging receivables</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Gross Metered Water Volume</span>
          <p className="text-xl font-mono font-bold text-cyan-800 mt-1 tabular-nums">
            {totalM3} <span className="text-xs font-normal text-slate-500">m³</span>
          </p>
          <span className="text-[10px] text-slate-400">{readings.length} verified meter readings</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="no-print flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveReportTab('billing')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] ${
            activeReportTab === 'billing'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Daily & Monthly Billing Report
        </button>
        <button
          onClick={() => setActiveReportTab('collections')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] ${
            activeReportTab === 'collections'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Payment & Collection Report
        </button>
        <button
          onClick={() => setActiveReportTab('arrears')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] ${
            activeReportTab === 'arrears'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Outstanding Bills & Arrears Aging
        </button>
        <button
          onClick={() => setActiveReportTab('consumption')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] ${
            activeReportTab === 'consumption'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Water Consumption by Estate / Zone
        </button>
      </div>

      {/* Active Table View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {activeReportTab === 'billing' && 'Monthly Billing Schedule Report'}
              {activeReportTab === 'collections' && 'Payment Collection Summary by Channel'}
              {activeReportTab === 'arrears' && 'Customer Arrears Aging & Debt Recovery List'}
              {activeReportTab === 'consumption' && 'Water Distribution & Zone Consumption Summary'}
            </h3>
            <p className="text-xs text-slate-500">Official audit-friendly record generated by {settings.vendorName}</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Date: {new Date().toISOString().split('T')[0]}</span>
        </div>

        <div className="overflow-x-auto">

        {activeReportTab === 'billing' && (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Invoice No.</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Account</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3 text-right">Volume (m³)</th>
                <th className="py-2.5 px-3 text-right">Water Charge</th>
                <th className="py-2.5 px-3 text-right">Total Payable</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bills.map((b) => (
                <tr key={b.billNo} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono font-bold text-slate-900">{b.billNo}</td>
                  <td className="py-2 px-3 text-slate-600">{b.billingDate}</td>
                  <td className="py-2 px-3 font-mono text-cyan-700">{b.accountNo}</td>
                  <td className="py-2 px-3 font-medium text-slate-800">{b.customerName}</td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums">{b.consumption} m³</td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums">{formatCurrency(b.waterCharge, tariffs.currencySymbol)}</td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-slate-900">{formatCurrency(b.totalPayable, tariffs.currencySymbol)}</td>
                  <td className="py-2 px-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      b.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeReportTab === 'collections' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              {Object.entries(paymentsByMethod).map(([method, amt]) => (
                <div key={method}>
                  <span className="text-[11px] text-slate-500 block font-semibold">{method} Collections</span>
                  <span className="text-base font-mono font-bold text-slate-900 tabular-nums">
                    {formatCurrency(amt, tariffs.currencySymbol)}
                  </span>
                </div>
              ))}
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Receipt No.</th>
                  <th className="py-2.5 px-3">Payment Date</th>
                  <th className="py-2.5 px-3">Customer & Account</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Reference</th>
                  <th className="py-2.5 px-3 text-right">Amount Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono font-bold text-slate-900">{p.receiptNo}</td>
                    <td className="py-2 px-3 text-slate-600">{p.paymentDate}</td>
                    <td className="py-2 px-3 font-medium text-slate-800">{p.customerName} ({p.accountNo})</td>
                    <td className="py-2 px-3 font-semibold text-slate-700">{p.method}</td>
                    <td className="py-2 px-3 font-mono text-cyan-700">{p.reference}</td>
                    <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">
                      {formatCurrency(p.amount, tariffs.currencySymbol)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeReportTab === 'arrears' && (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Account No.</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Estate / Zone</th>
                <th className="py-2.5 px-3">Meter No.</th>
                <th className="py-2.5 px-3 text-right">Arrears Balance Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.filter(c => c.currentBalance > 0).map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono font-bold text-cyan-700">{c.accountNo}</td>
                  <td className="py-2 px-3 font-medium text-slate-900">{c.name}</td>
                  <td className="py-2 px-3 text-slate-600">{c.phone}</td>
                  <td className="py-2 px-3 text-slate-600">{c.estateZone}</td>
                  <td className="py-2 px-3 font-mono text-slate-700">{c.meterNo}</td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-rose-600 text-sm">
                    {formatCurrency(c.currentBalance, tariffs.currencySymbol)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeReportTab === 'consumption' && (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Estate / Zone</th>
                <th className="py-2.5 px-3 text-right">Active Accounts</th>
                <th className="py-2.5 px-3 text-right">Total Metered Water (m³)</th>
                <th className="py-2.5 px-3 text-right">Total Invoiced Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(zoneConsumption).map(([zone, data]) => (
                <tr key={zone} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{zone}</td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">{data.count}</td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-cyan-800">{data.m3} m³</td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                    {formatCurrency(data.revenue, tariffs.currencySymbol)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </div>
  );
};
