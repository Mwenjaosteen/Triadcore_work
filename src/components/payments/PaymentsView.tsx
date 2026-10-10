import React, { useState } from 'react';
import { useWaterBilling } from '../../context/WaterBillingContext';
import { Payment, PaymentMethod } from '../../types/billing';
import { formatCurrency } from '../../utils/billingCalculator';
import {
  CreditCard,
  Plus,
  Search,
  Printer,
  Receipt,
  X,
  Smartphone,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { PaymentReceiptModal } from '../modals/PaymentReceiptModal';

interface Props {
  openNewModal: boolean;
  setOpenNewModal: (open: boolean) => void;
}

export const PaymentsView: React.FC<Props> = ({ openNewModal, setOpenNewModal }) => {
  const {
    payments,
    customers,
    bills,
    tariffs,
    settings,
    recordPayment,
    selectedPayment,
    setSelectedPayment,
  } = useWaterBilling();

  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');

  // Form state
  const [accountNoInput, setAccountNoInput] = useState(customers[0]?.accountNo || '');
  const [amountInput, setAmountInput] = useState<number>(32.50);
  const [methodInput, setMethodInput] = useState<PaymentMethod>('M-Pesa');
  const [referenceInput, setReferenceInput] = useState(`QKD${Math.floor(100000 + Math.random() * 900000)}`);
  const [notesInput, setNotesInput] = useState('Customer cleared monthly utility charge');

  const selectedCustomer = customers.find((c) => c.accountNo === accountNoInput);
  const activeBill = bills.find(
    (b) => b.accountNo === accountNoInput && (b.status === 'Unpaid' || b.status === 'Partial')
  );

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === 'All' || p.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amountInput <= 0) return;

    const newPayment = recordPayment(
      accountNoInput,
      amountInput,
      methodInput,
      referenceInput,
      notesInput
    );
    setOpenNewModal(false);
    setSelectedPayment(newPayment);
  };

  const handleOpenModal = () => {
    const openBill = bills.find((b) => b.status === 'Unpaid' || b.status === 'Partial');
    if (openBill) {
      setAccountNoInput(openBill.accountNo);
      setAmountInput(openBill.balanceDue);
    } else if (customers[0]) {
      setAccountNoInput(customers[0].accountNo);
      setAmountInput(customers[0].currentBalance || 25);
    }
    setReferenceInput(`QKD${Math.floor(100000 + Math.random() * 900000)}`);
    setOpenNewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Payment Recording & Collections
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Capture M-Pesa, Cash, Bank Transfer, and Cheque payments with live balance reconciliation and official receipts.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>Record New Payment</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search receipt #, account, reference, name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="All">All Payment Channels</option>
            <option value="M-Pesa">M-Pesa Mobile</option>
            <option value="Cash">Cash Counter</option>
            <option value="Bank Transfer">Bank Transfer / EFT</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Receipt No. & Date</th>
                <th className="py-3 px-4">Customer & Account</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Transaction Reference</th>
                <th className="py-3 px-4 text-right">Amount Received</th>
                <th className="py-3 px-4">Cashier / Gateway</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((pmt) => (
                <tr key={pmt.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-slate-900 block">{pmt.receiptNo}</span>
                    <span className="text-[11px] text-slate-500">{pmt.paymentDate}</span>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{pmt.customerName}</p>
                    <p className="font-mono text-[11px] text-cyan-700">{pmt.accountNo}</p>
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {pmt.method === 'M-Pesa' && <Smartphone className="w-3 h-3 text-emerald-600" />}
                      {pmt.method === 'Bank Transfer' && <Building className="w-3 h-3 text-blue-600" />}
                      {pmt.method}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono font-medium text-slate-800">
                    {pmt.reference}
                  </td>

                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-emerald-700 text-sm">
                    {formatCurrency(pmt.amount, tariffs.currencySymbol)}
                  </td>

                  <td className="py-3 px-4 text-slate-600">
                    {pmt.cashierName}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedPayment(pmt)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors cursor-pointer"
                    >
                      <Receipt className="w-3 h-3 text-slate-600" />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No payment transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {openNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Record Customer Payment
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
                <label className="font-semibold text-slate-700 block mb-1">Customer Account</label>
                <select
                  value={accountNoInput}
                  onChange={(e) => {
                    setAccountNoInput(e.target.value);
                    const c = customers.find((x) => x.accountNo === e.target.value);
                    if (c) setAmountInput(c.currentBalance || 20);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  {customers.map((c) => (
                    <option key={c.accountNo} value={c.accountNo}>
                      {c.name} — {c.accountNo} (Balance: {formatCurrency(c.currentBalance, tariffs.currencySymbol)})
                    </option>
                  ))}
                </select>
              </div>

              {selectedCustomer && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Outstanding Account Arrears</span>
                    <span className="font-mono font-bold text-rose-600 text-base">
                      {formatCurrency(selectedCustomer.currentBalance, tariffs.currencySymbol)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAmountInput(selectedCustomer.currentBalance)}
                    className="text-[11px] font-semibold text-cyan-700 hover:underline"
                  >
                    Pay Full Balance
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Payment Channel *</label>
                  <select
                    value={methodInput}
                    onChange={(e) => setMethodInput(e.target.value as PaymentMethod)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                  >
                    <option value="M-Pesa">M-Pesa (Mobile Money)</option>
                    <option value="Cash">Cash Teller</option>
                    <option value="Bank Transfer">Bank Transfer / EFT</option>
                    <option value="Cheque">Bank Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Amount to Pay ({tariffs.currencySymbol}) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={amountInput}
                    onChange={(e) => setAmountInput(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Transaction Reference Code *</label>
                <input
                  type="text"
                  required
                  value={referenceInput}
                  onChange={(e) => setReferenceInput(e.target.value)}
                  placeholder="e.g. QKD892LMA3 or Cheque #00492"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Payment Remarks / Notes</label>
                <input
                  type="text"
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
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
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Record & Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Receipt Modal */}
      {selectedPayment && (
        <PaymentReceiptModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
      )}
    </div>
  );
};
