import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { TariffSettings, UserRole } from '../../types/billing';
import {
  ShieldCheck,
  Users,
  Settings,
  Database,
  Download,
  Upload,
  RotateCcw,
  History,
  CheckCircle2,
  Save,
  KeyRound,
} from 'lucide-react';

export const AdministrationView: React.FC = () => {
  const {
    users,
    tariffs,
    updateTariffs,
    settings,
    updateSettings,
    auditLogs,
    resetToDemoData,
    exportDatabaseJson,
    importDatabaseJson,
    currentUser,
    setCurrentUser,
  } = useWaterBilling();

  const [activeSubTab, setActiveSubTab] = useState<'tariffs' | 'users' | 'audit' | 'backup'>('tariffs');
  const [tariffForm, setTariffForm] = useState<TariffSettings>(tariffs);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSaveTariffs = (e: React.FormEvent) => {
    e.preventDefault();
    updateTariffs(tariffForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZUCAR_Water_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importDatabaseJson(importJsonText);
    if (ok) {
      setImportStatus('Successfully restored database from backup!');
      setImportJsonText('');
    } else {
      setImportStatus('Invalid JSON format. Please provide a valid ZUCAR backup file.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Security & Administration (Slide 11)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Role-based access control, tariff schedule formulas, audit logs, and regular database backup controls.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveSubTab('tariffs')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] ${
            activeSubTab === 'tariffs' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Tariff Schedule & Surcharges
        </button>
        <button
          onClick={() => setActiveSubTab('users')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] ${
            activeSubTab === 'users' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          User Accounts & RBAC Roles
        </button>
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] ${
            activeSubTab === 'audit' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Security Audit Trail
        </button>
        <button
          onClick={() => setActiveSubTab('backup')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 min-h-[36px] ${
            activeSubTab === 'backup' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Database Backup & Restore
        </button>
      </div>

      {/* Tab 1: Tariffs */}
      {activeSubTab === 'tariffs' && (
        <form onSubmit={handleSaveTariffs} className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Configured Water Tariffs (Slide 6)</h3>
                <p className="text-xs text-slate-500">Tiered stepped rates per m³ for Domestic, Commercial, and Institutional water consumers.</p>
              </div>

              {savedSuccess && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  Tariff Rates Updated!
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Domestic */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs">Domestic Category</h4>
                  <span className="text-[10px] text-slate-500">Residential</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-600 block">Tier 1: 0 - 6 m³ ($/m³)</label>
                    <input
                      type="number"
                      step="0.10"
                      value={tariffForm.Domestic.tiers[0].ratePerM3}
                      onChange={(e) => {
                        const newT = { ...tariffForm };
                        newT.Domestic.tiers[0].ratePerM3 = Number(e.target.value);
                        setTariffForm(newT);
                      }}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Tier 2: 7 - 20 m³ ($/m³)</label>
                    <input
                      type="number"
                      step="0.10"
                      value={tariffForm.Domestic.tiers[1].ratePerM3}
                      onChange={(e) => {
                        const newT = { ...tariffForm };
                        newT.Domestic.tiers[1].ratePerM3 = Number(e.target.value);
                        setTariffForm(newT);
                      }}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Fixed Meter Rent ($)</label>
                    <input
                      type="number"
                      step="0.50"
                      value={tariffForm.Domestic.meterRent}
                      onChange={(e) => {
                        const newT = { ...tariffForm };
                        newT.Domestic.meterRent = Number(e.target.value);
                        setTariffForm(newT);
                      }}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Commercial */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs">Commercial Category</h4>
                  <span className="text-[10px] text-slate-500">Hotels & Business</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-600 block">Base Tier: 0 - 15 m³ ($/m³)</label>
                    <input
                      type="number"
                      step="0.10"
                      value={tariffForm.Commercial.tiers[0].ratePerM3}
                      onChange={(e) => {
                        const newT = { ...tariffForm };
                        newT.Commercial.tiers[0].ratePerM3 = Number(e.target.value);
                        setTariffForm(newT);
                      }}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Mid Tier: 15 - 50 m³ ($/m³)</label>
                    <input
                      type="number"
                      step="0.10"
                      value={tariffForm.Commercial.tiers[1].ratePerM3}
                      onChange={(e) => {
                        const newT = { ...tariffForm };
                        newT.Commercial.tiers[1].ratePerM3 = Number(e.target.value);
                        setTariffForm(newT);
                      }}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Fixed Meter Rent ($)</label>
                    <input
                      type="number"
                      step="0.50"
                      value={tariffForm.Commercial.meterRent}
                      onChange={(e) => {
                        const newT = { ...tariffForm };
                        newT.Commercial.meterRent = Number(e.target.value);
                        setTariffForm(newT);
                      }}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Institutional */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs">Institutional Category</h4>
                  <span className="text-[10px] text-slate-500">Schools & Hospitals</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-600 block">Base Tier: 0 - 30 m³ ($/m³)</label>
                    <input
                      type="number"
                      step="0.10"
                      value={tariffForm.Institutional.tiers[0].ratePerM3}
                      onChange={(e) => {
                        const newT = { ...tariffForm };
                        newT.Institutional.tiers[0].ratePerM3 = Number(e.target.value);
                        setTariffForm(newT);
                      }}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Sanitation Surcharge (%)</label>
                    <input
                      type="number"
                      value={tariffForm.Institutional.sanitationPercent}
                      onChange={(e) => {
                        const newT = { ...tariffForm };
                        newT.Institutional.sanitationPercent = Number(e.target.value);
                        setTariffForm(newT);
                      }}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Fixed Meter Rent ($)</label>
                    <input
                      type="number"
                      step="0.50"
                      value={tariffForm.Institutional.meterRent}
                      onChange={(e) => {
                        const newT = { ...tariffForm };
                        newT.Institutional.meterRent = Number(e.target.value);
                        setTariffForm(newT);
                      }}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save Tariff Adjustments</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Users & Roles */}
      {activeSubTab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">System Users & Role-Based Access</h3>
              <p className="text-xs text-slate-500">Administrators, Billing Staff, and Field Meter Readers.</p>
            </div>
            <div className="text-xs text-slate-500">
              Active User: <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.role})
            </div>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">User ID & Name</th>
                <th className="py-2.5 px-4">Email</th>
                <th className="py-2.5 px-4">Role Permission</th>
                <th className="py-2.5 px-4">Phone</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Last Activity</th>
                <th className="py-2.5 px-4 text-right">Switch Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4">
                    <span className="font-semibold text-slate-900 block">{u.name}</span>
                    <span className="font-mono text-[11px] text-slate-400">{u.id}</span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{u.email}</td>
                  <td className="py-2.5 px-4 font-medium text-slate-800">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{u.phone}</td>
                  <td className="py-2.5 px-4">
                    <span className="text-emerald-700 font-medium">{u.status}</span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-500">{u.lastLogin}</td>
                  <td className="py-2.5 px-4 text-right">
                    {currentUser.id === u.id ? (
                      <span className="text-[11px] font-semibold text-cyan-700">Active User</span>
                    ) : (
                      <button
                        onClick={() => setCurrentUser(u)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded transition-colors cursor-pointer"
                      >
                        Log in as {u.name.split(' ')[0]}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Audit Trail */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Audit-Friendly Activity Records (Slide 11)</h3>
            <p className="text-xs text-slate-500">Immutable ledger log of all billing, payment, customer, and reading modifications.</p>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Operator</th>
                <th className="py-2.5 px-4">Role</th>
                <th className="py-2.5 px-4">Action</th>
                <th className="py-2.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono text-slate-600">{log.timestamp}</td>
                  <td className="py-2.5 px-4 font-medium text-slate-900">{log.userName}</td>
                  <td className="py-2.5 px-4 text-slate-500">{log.userRole}</td>
                  <td className="py-2.5 px-4 font-semibold text-cyan-800">{log.action}</td>
                  <td className="py-2.5 px-4 text-slate-700">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Database Backup & Restore */}
      {activeSubTab === 'backup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-600" />
              <h3 className="text-sm font-bold text-slate-900">Database Backup (Slide 11)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export an encrypted full JSON image of all customers, water meters, readings, invoices, and payments.
            </p>
            <button
              onClick={handleDownloadBackup}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Full Database Backup (.json)</span>
            </button>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to restore the default demo records?')) {
                    resetToDemoData();
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Database to Default Seed Data</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-600" />
              <h3 className="text-sm font-bold text-slate-900">Restore Database from JSON</h3>
            </div>
            <p className="text-xs text-slate-600">
              Paste a previously exported JSON backup file to restore application records.
            </p>
            <textarea
              rows={4}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste JSON database backup content here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {importStatus && (
              <p className="text-xs font-semibold text-cyan-800 bg-cyan-50 p-2 rounded">
                {importStatus}
              </p>
            )}
            <button
              onClick={handleImportSubmit}
              className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Restore Database
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
