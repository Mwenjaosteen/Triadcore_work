import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { formatCurrency, calculateWaterBill, checkReadingAnomaly } from '../../utils/billingCalculator';
import {
  Gauge,
  Smartphone,
  Wifi,
  WifiOff,
  Camera,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Droplets,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  User,
  Search,
  Sparkles,
  QrCode,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';

export const MobileAppContainer: React.FC = () => {
  const {
    meters,
    customers,
    bills,
    readings,
    payments,
    tariffs,
    settings,
    recordReading,
    recordPayment,
    setSelectedBill,
    setSelectedPayment,
    setActivePlatform,
  } = useWaterBilling();

  // Mobile App Mode: 'field_reader' | 'customer_portal'
  const [appRole, setAppRole] = useState<'field_reader' | 'customer_portal'>('field_reader');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Field Reader States
  const [activeMeterNo, setActiveMeterNo] = useState<string>('WM-2245781');
  const [readerInput, setReaderInput] = useState<string>('135');
  const [readerNotes, setReaderNotes] = useState('Dial inspection clear');
  const [showPhotoPreview, setShowPhotoPreview] = useState(true);
  const [offlineSyncQueue, setOfflineSyncQueue] = useState<number>(0);
  const [isOnline, setIsOnline] = useState(true);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);

  // Customer Portal States
  const [customerPhone, setCustomerPhone] = useState('254712345678');
  const [mpesaPromptOpen, setMpesaPromptOpen] = useState(false);
  const [mpesaLoading, setMpesaLoading] = useState(false);
  const [mpesaSuccess, setMpesaSuccess] = useState(false);

  // Leak report state
  const [leakDesc, setLeakDesc] = useState('');
  const [leakSubmitted, setLeakSubmitted] = useState(false);

  // Active customer for portal
  const activeCustomer = customers.find((c) => c.accountNo === 'ACC-88201') || customers[0];
  const activeCustomerBill = bills.find((b) => b.accountNo === activeCustomer?.accountNo && b.status !== 'Paid');

  // Reader selected meter
  const meter = meters.find((m) => m.meterNo === activeMeterNo) || meters[0];
  const previousReading = meter ? meter.lastReading : 0;
  const currentNum = Number(readerInput) || 0;
  const computedConsumption = Math.max(0, currentNum - previousReading);
  const anomaly = checkReadingAnomaly(previousReading, currentNum);

  // Handle Field Submit
  const handleFieldSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meter) return;

    if (!isOnline) {
      setOfflineSyncQueue((prev) => prev + 1);
      setSubmitSuccessMsg(`Saved to offline queue! Meter ${meter.meterNo} recorded.`);
    } else {
      recordReading(
        meter.meterNo,
        currentNum,
        new Date().toISOString().split('T')[0],
        readerNotes,
        showPhotoPreview ? '/src/assets/images/meter_reading_dial_1791655156879.jpg' : undefined
      );
      setSubmitSuccessMsg(`Successfully synced reading for ${meter.customerName} (${currentNum} m³)!`);
    }

    setTimeout(() => {
      setSubmitSuccessMsg(null);
    }, 4000);
  };

  // Handle M-Pesa STK push simulation
  const handleMpesaPay = () => {
    setMpesaLoading(true);
    setTimeout(() => {
      setMpesaLoading(false);
      setMpesaPromptOpen(true);
    }, 1200);
  };

  const handleConfirmPin = () => {
    setMpesaPromptOpen(false);
    setMpesaLoading(true);
    setTimeout(() => {
      setMpesaLoading(false);
      setMpesaSuccess(true);
      if (activeCustomer && activeCustomerBill) {
        recordPayment(
          activeCustomer.accountNo,
          activeCustomerBill.balanceDue,
          'M-Pesa',
          `NLK${Math.floor(100000 + Math.random() * 900000)}`,
          'M-Pesa STK Instant Mobile Push'
        );
      }
      setTimeout(() => setMpesaSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900">
              ZUCAR Water Mobile App Experience (App-Based)
            </h1>
            <p className="text-xs text-slate-500">
              Seamlessly toggle between on-site meter reader tools and customer self-service mobile portal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Role switcher */}
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setAppRole('field_reader')}
              className={`px-3 py-1.5 font-semibold rounded-md transition-colors cursor-pointer ${
                appRole === 'field_reader'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Field Reader Mode
            </button>
            <button
              onClick={() => setAppRole('customer_portal')}
              className={`px-3 py-1.5 font-semibold rounded-md transition-colors cursor-pointer ${
                appRole === 'customer_portal'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Customer Self-Service
            </button>
          </div>

          {/* Frame Toggle */}
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-slate-200"
            title={isPhoneFrame ? 'Expand to Full View' : 'Wrap in Phone Mockup'}
          >
            {isPhoneFrame ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex justify-center items-start py-4">
        <div
          className={`${
            isPhoneFrame
              ? 'w-full max-w-[400px] rounded-[40px] border-[10px] border-slate-900 shadow-2xl overflow-hidden bg-slate-900'
              : 'w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'
          }`}
        >
          {/* Phone Shell Top Bar */}
          <div className="bg-slate-900 text-white px-6 pt-3 pb-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-[11px] font-mono">09:41 AM</span>
            <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto" />
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span className="text-[10px] font-mono">100%</span>
            </div>
          </div>

          {/* Mobile App Viewport */}
          <div className="bg-slate-50 min-h-[640px] max-h-[750px] overflow-y-auto flex flex-col justify-between">
            {/* Top Bar inside App */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-cyan-600">
                  <img
                    src="/src/assets/images/water_utility_badge_1791655144096.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900 leading-tight">
                    {appRole === 'field_reader' ? 'AquaReader Field App' : 'ZUCAR Customer Portal'}
                  </h2>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {appRole === 'field_reader' ? 'Offline-Capable Field Tool' : 'My Water Account'}
                  </p>
                </div>
              </div>

              {appRole === 'field_reader' ? (
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                    isOnline
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </button>
              ) : (
                <div className="text-[10px] font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                  {activeCustomer?.accountNo}
                </div>
              )}
            </div>

            {/* Notification Banner */}
            {submitSuccessMsg && (
              <div className="m-3 p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{submitSuccessMsg}</span>
              </div>
            )}

            {/* Sub-View: Field Reader */}
            {appRole === 'field_reader' && (
              <div className="p-4 space-y-4">
                {/* Route Selector Card */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Walk Route: Sunrise Estate
                    </span>
                    <span className="text-[10px] font-medium text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full">
                      {meters.length} Assigned Meters
                    </span>
                  </div>

                  <select
                    value={activeMeterNo}
                    onChange={(e) => {
                      setActiveMeterNo(e.target.value);
                      const m = meters.find((x) => x.meterNo === e.target.value);
                      if (m) setReaderInput(String(m.lastReading + 15));
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-900 focus:outline-none"
                  >
                    {meters.map((m) => (
                      <option key={m.meterNo} value={m.meterNo}>
                        {m.meterNo} · {m.customerName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Meter Dial Proof Photo & Camera Scanner */}
                <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                  <img
                    src="/src/assets/images/meter_reading_dial_1791655156879.jpg"
                    alt="Active Water Meter Dial"
                    className="w-full h-44 object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md font-mono">
                      GPS: -1.286, 36.817
                    </span>
                    <span className="px-2 py-0.5 bg-cyan-600/90 rounded-md font-semibold">
                      Camera Active
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] text-slate-300 block">Meter Serial</span>
                      <span className="font-mono font-bold text-sm text-cyan-300">{meter?.meterNo}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-300 block">Customer</span>
                      <span className="text-xs font-semibold">{meter?.customerName}</span>
                    </div>
                  </div>
                </div>

                {/* Dial Entry Form */}
                <form onSubmit={handleFieldSubmit} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  {/* Stepper / Comparison Box */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase font-semibold">Previous</span>
                      <span className="font-mono font-bold text-slate-700 text-base">{previousReading} m³</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
                      <span className="text-[10px] text-cyan-800 block uppercase font-semibold">Consumption</span>
                      <span className="font-mono font-bold text-cyan-900 text-base">{computedConsumption} m³</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Enter Current Dial Reading (m³):
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        required
                        value={readerInput}
                        onChange={(e) => setReaderInput(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-cyan-500 rounded-xl px-4 py-3 font-mono font-bold text-xl text-slate-900 text-center focus:outline-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        m³
                      </span>
                    </div>
                  </div>

                  {anomaly.isAnomaly && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-[11px] flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{anomaly.reason}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Reader Notes / Leak Inspection:
                    </label>
                    <input
                      type="text"
                      value={readerNotes}
                      onChange={(e) => setReaderNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-cyan-400" />
                    <span>Submit & Sync Reading</span>
                  </button>
                </form>

                {/* Offline queue indicator */}
                {offlineSyncQueue > 0 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                    <span>{offlineSyncQueue} readings waiting in offline buffer</span>
                    <button
                      onClick={() => {
                        setIsOnline(true);
                        setOfflineSyncQueue(0);
                        setSubmitSuccessMsg('Synced all cached readings to central utility server!');
                      }}
                      className="text-xs font-bold underline"
                    >
                      Sync Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Sub-View: Customer Self-Service Portal */}
            {appRole === 'customer_portal' && (
              <div className="p-4 space-y-4">
                {/* Customer Welcome Header */}
                <div className="bg-gradient-to-br from-slate-900 to-cyan-950 text-white p-5 rounded-2xl shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-cyan-300 font-semibold uppercase tracking-wider">
                      Active Customer Account
                    </span>
                    <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full">
                      {activeCustomer?.meterNo}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold">{activeCustomer?.name}</h3>
                    <p className="text-xs text-slate-300">{activeCustomer?.address} · {activeCustomer?.estateZone}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Current Balance Due</span>
                      <span className="text-2xl font-mono font-bold text-cyan-300">
                        {formatCurrency(activeCustomer?.currentBalance || 0, tariffs.currencySymbol)}
                      </span>
                    </div>

                    {activeCustomerBill && (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Due Date</span>
                        <span className="text-xs font-semibold text-rose-300">{activeCustomerBill.dueDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* M-Pesa STK Push Payment Trigger */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">M-Pesa Express Instant Pay</h4>
                        <p className="text-[10px] text-slate-500">Paybill: {settings.paybillNumber} · STK Push</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      M-Pesa Mobile Number:
                    </label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    onClick={handleMpesaPay}
                    disabled={mpesaLoading}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    {mpesaLoading ? (
                      <span>Sending M-Pesa Prompt...</span>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>Pay {formatCurrency(activeCustomer?.currentBalance || 0, tariffs.currencySymbol)} via M-Pesa</span>
                      </>
                    )}
                  </button>

                  {mpesaSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Payment received! Account settled in full. Receipt generated.</span>
                    </div>
                  )}
                </div>

                {/* 6-Month Water Consumption Chart */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Monthly Water Usage</span>
                    <span className="text-[10px] text-slate-500">Last 6 Months (m³)</span>
                  </div>

                  <div className="flex items-end justify-between h-28 pt-4 pb-1 border-b border-slate-100">
                    {[
                      { month: 'May', m3: 11 },
                      { month: 'Jun', m3: 14 },
                      { month: 'Jul', m3: 13 },
                      { month: 'Aug', m3: 16 },
                      { month: 'Sep', m3: 12 },
                      { month: 'Oct', m3: 15 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-mono text-slate-500">{item.m3}m³</span>
                        <div
                          style={{ height: `${(item.m3 / 18) * 60}px` }}
                          className={`w-7 rounded-t-md ${
                            item.month === 'Oct'
                              ? 'bg-cyan-600'
                              : 'bg-slate-200'
                          }`}
                        />
                        <span className="text-[10px] font-medium text-slate-600">{item.month}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 text-center">
                    Current consumption: <strong className="text-cyan-800 font-mono">15 m³</strong> (Slide 6 example)
                  </p>
                </div>

                {/* Report Leak / Fault Feature */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    <span>Report Water Leak / Pipe Burst</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Notice a leak, meter fault, or low pressure? Send a report directly to dispatch.
                  </p>
                  <input
                    type="text"
                    placeholder="Describe issue (e.g. meter glass cracked / pipe leak at gate)"
                    value={leakDesc}
                    onChange={(e) => setLeakDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                  />
                  <button
                    onClick={() => {
                      if (!leakDesc.trim()) return;
                      setLeakSubmitted(true);
                      setTimeout(() => {
                        setLeakSubmitted(false);
                        setLeakDesc('');
                      }, 3500);
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    {leakSubmitted ? '✓ Report Dispatched to Technicians' : 'Submit Leak Report'}
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Bar inside Phone */}
            <div className="bg-white border-t border-slate-200 px-6 py-2.5 flex items-center justify-around text-[10px] text-slate-500">
              <button
                onClick={() => setAppRole('field_reader')}
                className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                  appRole === 'field_reader' ? 'text-cyan-700 font-bold' : 'hover:text-slate-900'
                }`}
              >
                <Gauge className="w-4 h-4" />
                <span>Field Reader</span>
              </button>

              <button
                onClick={() => setAppRole('customer_portal')}
                className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                  appRole === 'customer_portal' ? 'text-cyan-700 font-bold' : 'hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Customer</span>
              </button>

              <button
                onClick={() => setActivePlatform('web')}
                className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-slate-900"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Web Portal</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated M-Pesa Phone PIN Prompt Modal */}
      {mpesaPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="relative w-full max-w-xs bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-700 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold text-xl">
              SIM
            </div>
            <div>
              <h3 className="text-base font-bold">M-PESA SIM TOOLKIT</h3>
              <p className="text-xs text-slate-300 mt-1">
                Do you want to pay {formatCurrency(activeCustomer?.currentBalance || 32.5, tariffs.currencySymbol)} to {settings.utilityName} (Paybill: {settings.paybillNumber})?
              </p>
            </div>
            <div>
              <input
                type="password"
                maxLength={4}
                defaultValue="1234"
                className="w-32 mx-auto text-center font-mono text-xl tracking-widest bg-slate-800 border border-slate-600 rounded-lg py-2 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 block mt-1">Simulated 4-Digit M-Pesa PIN</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setMpesaPromptOpen(false)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPin}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Confirm PIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
