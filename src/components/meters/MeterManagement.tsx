import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { Meter, MeterStatus } from '../../types/billing';
import {
  Gauge,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  MapPin,
  Calendar,
  X,
} from 'lucide-react';

export const MeterManagement: React.FC = () => {
  const { meters, addMeter, updateMeterStatus, customers } = useWaterBilling();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [openModal, setOpenModal] = useState(false);

  // New meter form
  const [formData, setFormData] = useState({
    meterNo: `WM-${Math.floor(2000000 + Math.random() * 8000000)}`,
    customerId: customers[0]?.id || '',
    installationDate: new Date().toISOString().split('T')[0],
    status: 'Active' as MeterStatus,
    size: '1/2" (15mm)',
    initialReading: 0,
    locationNotes: 'Perimeter main water line junction box',
    latitude: -1.286389,
    longitude: 36.817223,
  });

  const filteredMeters = meters.filter((m) => {
    const matchesSearch =
      m.meterNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.accountNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === formData.customerId);
    addMeter({
      ...formData,
      customerName: cust ? cust.name : 'Unassigned',
      accountNo: cust ? cust.accountNo : 'ACC-NONE',
    });
    setOpenModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Meter Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Store meter serial numbers, installation dates, pipeline physical status, and customer assignments.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              meterNo: `WM-${Math.floor(2000000 + Math.random() * 8000000)}`,
              customerId: customers[0]?.id || '',
              installationDate: new Date().toISOString().split('T')[0],
              status: 'Active',
              size: '1/2" (15mm)',
              initialReading: 0,
              locationNotes: 'Perimeter main water line junction box',
              latitude: -1.286389,
              longitude: 36.817223,
            });
            setOpenModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>Register New Meter</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by meter #, customer or account..."
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
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Faulty">Faulty (Inspection Needed)</option>
            <option value="Disconnected">Disconnected</option>
            <option value="Replaced">Replaced</option>
          </select>
        </div>
      </div>

      {/* Meters Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Meter No. & Size</th>
                <th className="py-3 px-4">Assigned Customer</th>
                <th className="py-3 px-4">Installation Date</th>
                <th className="py-3 px-4 text-right">Last Recorded (m³)</th>
                <th className="py-3 px-4">Physical Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMeters.map((meter) => (
                <tr key={meter.meterNo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
                        <Gauge className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-slate-900 block">{meter.meterNo}</span>
                        <span className="text-[11px] text-slate-500">{meter.size}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{meter.customerName}</p>
                    <p className="font-mono text-[11px] text-slate-500">{meter.accountNo}</p>
                  </td>

                  <td className="py-3 px-4 text-slate-600">
                    <span className="font-mono">{meter.installationDate}</span>
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                    {meter.lastReading} m³
                    <span className="block text-[10px] text-slate-400 font-normal font-sans">
                      {meter.lastReadingDate}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    <span className="text-[11px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{meter.locationNotes}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        meter.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : meter.status === 'Faulty'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {meter.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <select
                      value={meter.status}
                      onChange={(e) => updateMeterStatus(meter.meterNo, e.target.value as MeterStatus)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-[11px] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Faulty">Faulty</option>
                      <option value="Disconnected">Disconnected</option>
                      <option value="Replaced">Replaced</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Meter Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-sm font-bold">Register Water Meter Device</h3>
              <button
                onClick={() => setOpenModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Meter Serial Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.meterNo}
                    onChange={(e) => setFormData({ ...formData, meterNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pipe Diameter / Size</label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value='1/2" (15mm)'>1/2" (15mm) Standard Domestic</option>
                    <option value='3/4" (20mm)'>3/4" (20mm) High Flow</option>
                    <option value='1" (25mm)'>1" (25mm) Commercial</option>
                    <option value='2" (50mm)'>2" (50mm) Bulk / Institutional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Assign to Customer Account</label>
                <select
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.accountNo}) - {c.estateZone}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Installation Date</label>
                  <input
                    type="date"
                    required
                    value={formData.installationDate}
                    onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Initial Dial Reading (m³)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.initialReading}
                    onChange={(e) => setFormData({ ...formData, initialReading: Number(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Physical Location Notes</label>
                <input
                  type="text"
                  value={formData.locationNotes}
                  onChange={(e) => setFormData({ ...formData, locationNotes: e.target.value })}
                  placeholder="e.g. Garden wall next to main gate"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Save Meter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
