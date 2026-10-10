import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { Customer, CustomerCategory, CustomerStatus } from '../../types/billing';
import { formatCurrency } from '../../utils/billingCalculator';
import {
  Users,
  Search,
  Plus,
  Filter,
  MoreVertical,
  FileText,
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Gauge,
  X,
  CheckCircle2,
} from 'lucide-react';
import { NavTabId } from '../common/Sidebar';

interface Props {
  setActiveTab: (tab: NavTabId) => void;
  openNewModal: boolean;
  setOpenNewModal: (open: boolean) => void;
}

export const CustomerManagement: React.FC<Props> = ({
  setActiveTab,
  openNewModal,
  setOpenNewModal,
}) => {
  const {
    customers,
    meters,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    tariffs,
    setSelectedCustomer,
  } = useWaterBilling();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Form State for new/edit
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    estateZone: 'Sunrise Estate',
    meterNo: '',
    category: 'Domestic' as CustomerCategory,
    status: 'Active' as CustomerStatus,
  });

  const estateZones = Array.from(new Set(customers.map((c) => c.estateZone)));

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.meterNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.phone.includes(searchTerm);
    const matchesZone = selectedZone === 'All' || cust.estateZone === selectedZone;
    const matchesCategory = selectedCategory === 'All' || cust.category === selectedCategory;
    return matchesSearch && matchesZone && matchesCategory;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      phone: '+254 ',
      email: '',
      address: '',
      estateZone: estateZones[0] || 'Sunrise Estate',
      meterNo: `WM-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Domestic',
      status: 'Active',
    });
    setEditingCustomer(null);
    setOpenNewModal(true);
  };

  const handleOpenEdit = (c: Customer) => {
    setEditingCustomer(c);
    setFormData({
      name: c.name,
      phone: c.phone,
      email: c.email,
      address: c.address,
      estateZone: c.estateZone,
      meterNo: c.meterNo,
      category: c.category,
      status: c.status,
    });
    setOpenNewModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    setOpenNewModal(false);
    setEditingCustomer(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Customer Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Register water consumers, configure tariff categories, assign meters and service accounts.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>New Customer Registration</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, account #, meter #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Zone filter */}
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="All">All Estates / Zones</option>
            {estateZones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="All">All Tariff Categories</option>
            <option value="Domestic">Domestic</option>
            <option value="Commercial">Commercial</option>
            <option value="Institutional">Institutional</option>
          </select>
        </div>
      </div>

      {/* Customers Data Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Account & Customer</th>
                <th className="py-3 px-4">Contact & Location</th>
                <th className="py-3 px-4">Meter No.</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-semibold text-slate-900">{cust.name}</p>
                      <p className="font-mono text-[11px] text-cyan-700 font-medium">{cust.accountNo}</p>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <p className="text-slate-800">{cust.estateZone}</p>
                    <p className="text-[11px] text-slate-500">{cust.phone}</p>
                  </td>

                  <td className="py-3 px-4">
                    <div className="inline-flex items-center gap-1 font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      <Gauge className="w-3 h-3 text-slate-400" />
                      {cust.meterNo}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-slate-700 font-medium">{cust.category}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        cust.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cust.status === 'Suspended'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {cust.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold">
                    <span className={cust.currentBalance > 0 ? 'text-rose-600' : 'text-emerald-600'}>
                      {formatCurrency(cust.currentBalance, tariffs.currencySymbol)}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        title="View Statement"
                        onClick={() => {
                          setSelectedCustomer(cust);
                          setActiveTab('statements');
                        }}
                        className="p-1.5 text-slate-600 hover:text-cyan-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                      </button>

                      <button
                        title="Edit Customer"
                        onClick={() => handleOpenEdit(cust)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        title="Delete Record"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete customer ${cust.name}?`)) {
                            deleteCustomer(cust.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No customer accounts match your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Modal (Create or Edit) */}
      {openNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-sm font-bold">
                {editingCustomer ? 'Edit Customer Account' : 'Register New Customer Account'}
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
                <label className="font-semibold text-slate-700 block mb-1">Full Customer / Business Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Samuel Mutua or Golden Crest Apts"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 712 345 678"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="customer@domain.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estate / Zone *</label>
                  <input
                    type="text"
                    required
                    value={formData.estateZone}
                    onChange={(e) => setFormData({ ...formData, estateZone: e.target.value })}
                    placeholder="e.g. Sunrise Estate"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assigned Meter No *</label>
                  <input
                    type="text"
                    required
                    value={formData.meterNo}
                    onChange={(e) => setFormData({ ...formData, meterNo: e.target.value })}
                    placeholder="e.g. WM-2245781"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Physical Address / Plot Details</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Plot 14, Court 2, Sunrise Estate"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tariff Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CustomerCategory })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Institutional">Institutional</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Service Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as CustomerStatus })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Disconnected">Disconnected</option>
                  </select>
                </div>
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
                  {editingCustomer ? 'Update Account' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
