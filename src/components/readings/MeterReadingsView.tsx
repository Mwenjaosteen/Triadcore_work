import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { MeterReading } from '../../types/billing';
import {
  FileSpreadsheet,
  Plus,
  Search,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Receipt,
  X,
  Gauge,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { MeterPhotoModal } from '../modals/MeterPhotoModal';
import { NavTabId } from '../common/Sidebar';

interface Props {
  setActiveTab: (tab: NavTabId) => void;
  openNewModal: boolean;
  setOpenNewModal: (open: boolean) => void;
}

export const MeterReadingsView: React.FC<Props> = ({
  setActiveTab,
  openNewModal,
  setOpenNewModal,
}) => {
  const {
    readings,
    meters,
    customers,
    recordReading,
    generateBill,
    setSelectedBill,
  } = useWaterBilling();

  const [searchTerm, setSearchTerm] = useState('');
  const [photoReading, setPhotoReading] = useState<MeterReading | null>(null);

  // Form state
  const [selectedMeterNo, setSelectedMeterNo] = useState(meters[0]?.meterNo || '');
  const [currentReadingInput, setCurrentReadingInput] = useState<number>(135);
  const [readingDate, setReadingDate] = useState(new Date().toISOString().split('T')[0]);
  const [readerNotes, setReaderNotes] = useState('Dial glass clean, normal monthly recording');
  const [attachPhoto, setAttachPhoto] = useState(true);

  const selectedMeter = meters.find((m) => m.meterNo === selectedMeterNo);
  const previousReading = selectedMeter ? selectedMeter.lastReading : 0;
  const computedConsumption = Math.max(0, currentReadingInput - previousReading);
  const isRollback = currentReadingInput < previousReading;

  const filteredReadings = readings.filter((r) => {
    return (
      r.readingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.meterNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.accountNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const photoUrl = attachPhoto
      ? '/src/assets/images/meter_reading_dial_1791655156879.jpg'
      : undefined;

    recordReading(selectedMeterNo, currentReadingInput, readingDate, readerNotes, photoUrl);
    setOpenNewModal(false);
  };

  const handleGenerateBillClick = (readingId: string) => {
    const bill = generateBill(readingId);
    setSelectedBill(bill);
    setActiveTab('billing');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Meter Readings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Capture previous and current cubic meter (m³) values with reading dates and photo dial verification.
          </p>
        </div>

        <button
          onClick={() => {
            const m = meters[0];
            if (m) {
              setSelectedMeterNo(m.meterNo);
              setCurrentReadingInput(m.lastReading + 15);
            }
            setOpenNewModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>Capture Meter Reading</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by reading #, meter, customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Total readings: <strong className="text-slate-800">{readings.length}</strong></span>
          <span>·</span>
          <span>Pending billing: <strong className="text-cyan-700">{readings.filter(r => r.status === 'Verified').length}</strong></span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Reading ID & Date</th>
                <th className="py-3 px-4">Meter & Customer</th>
                <th className="py-3 px-4 text-right">Previous (m³)</th>
                <th className="py-3 px-4 text-right">Current (m³)</th>
                <th className="py-3 px-4 text-right">Consumption (m³)</th>
                <th className="py-3 px-4">Proof Photo</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReadings.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-slate-900 block">{r.readingNo}</span>
                    <span className="text-[11px] text-slate-500">{r.readingDate}</span>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{r.customerName}</p>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                      <span>{r.meterNo}</span>
                      <span>·</span>
                      <span>{r.accountNo}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600">
                    {r.previousReading} m³
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                    {r.currentReading} m³
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-cyan-700 bg-cyan-50/30">
                    {r.consumption} m³
                  </td>

                  <td className="py-3 px-4">
                    {r.photoUrl ? (
                      <button
                        onClick={() => setPhotoReading(r)}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        <Camera className="w-3 h-3 text-cyan-600" />
                        <span>View Dial</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">None</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        r.status === 'Billed'
                          ? 'bg-blue-100 text-blue-800'
                          : r.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    {r.status === 'Verified' ? (
                      <button
                        onClick={() => handleGenerateBillClick(r.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-md shadow-xs transition-colors cursor-pointer"
                      >
                        <Receipt className="w-3 h-3" />
                        <span>Generate Bill</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Billed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Reading Modal */}
      {openNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" />
                Capture Meter Reading
              </h3>
              <button
                onClick={() => setOpenNewModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Meter / Customer Account</label>
                <select
                  value={selectedMeterNo}
                  onChange={(e) => {
                    setSelectedMeterNo(e.target.value);
                    const m = meters.find((x) => x.meterNo === e.target.value);
                    if (m) setCurrentReadingInput(m.lastReading + 15);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  {meters.map((m) => (
                    <option key={m.meterNo} value={m.meterNo}>
                      {m.meterNo} — {m.customerName} ({m.accountNo}) [Last: {m.lastReading} m³]
                    </option>
                  ))}
                </select>
              </div>

              {/* Automatic Calculation Preview (Slide 6) */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Automatic Consumption Engine (Slide 6)
                </span>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Previous Reading</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">{previousReading} m³</span>
                  </div>

                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Current Reading</span>
                    <input
                      type="number"
                      min="0"
                      value={currentReadingInput}
                      onChange={(e) => setCurrentReadingInput(Number(e.target.value) || 0)}
                      className="w-full text-center font-mono font-bold text-slate-900 text-sm border-b border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-cyan-50 p-2 rounded-lg border border-cyan-200">
                    <span className="text-[10px] text-cyan-800 font-semibold block">Consumption</span>
                    <span className="font-mono font-bold text-cyan-900 text-sm">{computedConsumption} m³</span>
                  </div>
                </div>

                {isRollback && (
                  <div className="flex items-center gap-1.5 p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Warning: Current reading is lower than previous reading ({previousReading} m³).</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Reading Date</label>
                  <input
                    type="date"
                    required
                    value={readingDate}
                    onChange={(e) => setReadingDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Dial Photo Verification</label>
                  <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={attachPhoto}
                      onChange={(e) => setAttachPhoto(e.target.checked)}
                      className="rounded text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-slate-700 font-medium">Attach Dial Photo Proof</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Reader Remarks / Field Inspection Notes</label>
                <input
                  type="text"
                  value={readerNotes}
                  onChange={(e) => setReaderNotes(e.target.value)}
                  placeholder="e.g. Clean dial, no leaks around pipe manifold"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpenNewModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Record & Calculate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meter Photo Preview Modal */}
      {photoReading && (
        <MeterPhotoModal reading={photoReading} onClose={() => setPhotoReading(null)} />
      )}
    </div>
  );
};
