import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { formatCurrency, calculateWaterBill } from '../../utils/billingCalculator';
import {
  Users,
  Gauge,
  ReceiptText,
  CreditCard,
  AlertTriangle,
  Droplets,
  ArrowUpRight,
  PlusCircle,
  FileSpreadsheet,
  CheckCircle2,
  Calculator,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { NavTabId } from '../common/Sidebar';

interface Props {
  setActiveTab: (tab: NavTabId) => void;
  onOpenQuickReading: () => void;
  onOpenQuickPayment: () => void;
  onOpenNewCustomer: () => void;
}

export const ManagementDashboard: React.FC<Props> = ({
  setActiveTab,
  onOpenQuickReading,
  onOpenQuickPayment,
  onOpenNewCustomer,
}) => {
  const {
    customers,
    meters,
    bills,
    payments,
    readings,
    tariffs,
    batchGenerateBills,
    setSelectedBill,
  } = useWaterBilling();

  // Slide 6 Demo Sandbox state
  const [calcPrev, setCalcPrev] = useState<number>(120);
  const [calcCurr, setCalcCurr] = useState<number>(135);
  const [calcCat, setCalcCat] = useState<'Domestic' | 'Commercial' | 'Institutional'>('Domestic');

  const demoCalc = calculateWaterBill(calcPrev, calcCurr, calcCat, 0, tariffs);

  // Slide 9 Live System Figures:
  // 1. Total Customers
  const totalCustomers = customers.length;
  // 2. Active Meters
  const activeMeters = meters.filter((m) => m.status === 'Active').length;
  // 3. Bills Generated
  const totalBillsGenerated = bills.length;
  // 4. Payments Collected
  const totalPaymentsCollected = payments.reduce((acc, p) => acc + p.amount, 0);
  // 5. Outstanding Arrears
  const totalArrears = bills.reduce((acc, b) => acc + b.balanceDue, 0);
  // 6. Current Consumption
  const totalConsumptionM3 = readings.reduce((acc, r) => acc + r.consumption, 0);

  // Unbilled readings check
  const unbilledCount = readings.filter((r) => r.status === 'Verified').length;

  const handleBatchBillClick = () => {
    const count = batchGenerateBills();
    if (count > 0) {
      setActiveTab('billing');
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Management Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time utility oversight, consumption telemetry, and financial ledger status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenQuickReading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Gauge className="w-3.5 h-3.5 text-cyan-600" />
            <span>Record Reading</span>
          </button>

          <button
            onClick={onOpenQuickPayment}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            <span>Record Payment</span>
          </button>

          <button
            onClick={onOpenNewCustomer}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Register Customer</span>
          </button>
        </div>
      </div>

      {/* Slide 9: The 6 Core Management Figures */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Live System Performance Figures (Slide 8 & 9)
          </h2>
          <span className="text-[11px] text-slate-400">Auto-updating ledger telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Total Customers */}
          <div
            onClick={() => setActiveTab('customers')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Total Customers</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-mono font-bold text-slate-900 tabular-nums">
                {totalCustomers}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                <span>Active utility service accounts</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Card 2: Active Meters */}
          <div
            onClick={() => setActiveTab('meters')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Active Meters</span>
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Gauge className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-mono font-bold text-slate-900 tabular-nums">
                {activeMeters} <span className="text-xs text-slate-400 font-sans font-normal">/ {meters.length}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                <span>{meters.filter((m) => m.status === 'Faulty').length} faulty requiring inspection</span>
              </div>
            </div>
          </div>

          {/* Card 3: Bills Generated */}
          <div
            onClick={() => setActiveTab('billing')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Bills Generated</span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ReceiptText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-mono font-bold text-slate-900 tabular-nums">
                {totalBillsGenerated}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                <span>{bills.filter((b) => b.status === 'Paid').length} settled in full</span>
                {unbilledCount > 0 && (
                  <span className="text-amber-600 font-medium">· {unbilledCount} pending bill</span>
                )}
              </div>
            </div>
          </div>

          {/* Card 4: Payments Collected */}
          <div
            onClick={() => setActiveTab('payments')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Payments Collected</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-mono font-bold text-emerald-700 tabular-nums">
                {formatCurrency(totalPaymentsCollected, tariffs.currencySymbol)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                <span>{payments.length} verified transactions recorded</span>
              </div>
            </div>
          </div>

          {/* Card 5: Outstanding Arrears */}
          <div
            onClick={() => setActiveTab('reports')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Outstanding Arrears</span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-mono font-bold text-rose-600 tabular-nums">
                {formatCurrency(totalArrears, tariffs.currencySymbol)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                <span>Unsettled customer receivables</span>
              </div>
            </div>
          </div>

          {/* Card 6: Current Consumption */}
          <div
            onClick={() => setActiveTab('readings')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Current Consumption</span>
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-mono font-bold text-cyan-800 tabular-nums">
                {totalConsumptionM3} <span className="text-sm font-sans font-normal text-slate-600">m³</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                <span>Total metered water volume billed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 6 Showcase: Automatic Billing Calculation Interactive Engine */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Automatic Billing Calculation Engine (Slide 6)
              </h3>
              <p className="text-xs text-slate-500">
                Interactive verification demonstrating how meter readings are converted into tiered tariffs and water charges.
              </p>
            </div>
          </div>

          {unbilledCount > 0 && (
            <button
              onClick={handleBatchBillClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Batch Generate {unbilledCount} Pending Bills
            </button>
          )}
        </div>

        {/* The Slide 6 Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Inputs Column */}
          <div className="lg:col-span-5 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Reading Inputs
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Previous Reading (m³)
                </label>
                <input
                  type="number"
                  value={calcPrev}
                  onChange={(e) => setCalcPrev(Number(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Current Reading (m³)
                </label>
                <input
                  type="number"
                  value={calcCurr}
                  onChange={(e) => setCalcCurr(Number(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Customer Tariff Category
              </label>
              <select
                value={calcCat}
                onChange={(e) => setCalcCat(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="Domestic">Domestic (Stepped residential tariff)</option>
                <option value="Commercial">Commercial (Business & hotel tariff)</option>
                <option value="Institutional">Institutional (School & clinic tariff)</option>
              </select>
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              Example shown in Slide 6: <span className="font-mono font-semibold text-slate-700">120 m³</span> previous reading and <span className="font-mono font-semibold text-slate-700">135 m³</span> current reading yields <span className="font-mono font-semibold text-cyan-700">15 m³</span> consumption.
            </p>
          </div>

          {/* Results Step Sequence (Matches Slide 6 visually) */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 text-xs">
              <span className="text-slate-600 font-medium">Previous reading</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{calcPrev} m³</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 text-xs">
              <span className="text-slate-600 font-medium">Current reading</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{calcCurr} m³</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-cyan-50 border border-cyan-200 text-xs">
              <span className="text-cyan-800 font-bold">Consumption</span>
              <span className="font-mono font-bold text-cyan-900 tabular-nums">{demoCalc.consumption} m³</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 text-xs">
              <span className="text-slate-600 font-medium">Tariff (Configured by Admin)</span>
              <span className="text-slate-800 font-medium">{calcCat} Tier Schedule</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 text-xs">
              <span className="text-slate-600 font-medium">Water charge (Calculated automatically)</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{formatCurrency(demoCalc.waterCharge, tariffs.currencySymbol)}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 text-xs">
              <span className="text-slate-600 font-medium">Other charges (Meter rent + 10% Sanitation)</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{formatCurrency(demoCalc.meterRent + demoCalc.sanitationFee, tariffs.currencySymbol)}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white text-xs font-bold">
              <span className="tracking-wide">Total bill (Automatically generated)</span>
              <span className="font-mono text-base text-cyan-400 tabular-nums">{formatCurrency(demoCalc.totalPayable, tariffs.currencySymbol)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Recent Invoices & Recent Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Water Bills</h3>
              <p className="text-xs text-slate-500">Latest invoices generated from field readings</p>
            </div>
            <button
              onClick={() => setActiveTab('billing')}
              className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 cursor-pointer"
            >
              View all bills →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {bills.slice(0, 4).map((bill) => (
              <div
                key={bill.billNo}
                onClick={() => setSelectedBill(bill)}
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-900">{bill.billNo}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      bill.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : bill.status === 'Partial'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {bill.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{bill.customerName} · <span className="font-mono">{bill.accountNo}</span></p>
                  <p className="text-[11px] text-slate-400">Consumption: {bill.consumption} m³ · Due: {bill.dueDate}</p>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {formatCurrency(bill.balanceDue, tariffs.currencySymbol)}
                  </span>
                  <span className="block text-[10px] text-cyan-600 font-medium">Print invoice</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Collections</h3>
              <p className="text-xs text-slate-500">M-Pesa, Cash, and Bank settlement ledger</p>
            </div>
            <button
              onClick={() => setActiveTab('payments')}
              className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 cursor-pointer"
            >
              View all payments →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {payments.slice(0, 4).map((pmt) => (
              <div
                key={pmt.id}
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-800">{pmt.receiptNo}</span>
                    <span className="text-[10px] bg-slate-100 font-semibold text-slate-700 px-2 py-0.5 rounded">
                      {pmt.method}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">{pmt.customerName} (<span className="font-mono">{pmt.accountNo}</span>)</p>
                  <p className="text-[11px] text-slate-400">Ref: {pmt.reference} · {pmt.paymentDate}</p>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    +{formatCurrency(pmt.amount, tariffs.currencySymbol)}
                  </span>
                  <span className="block text-[10px] text-slate-400">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
