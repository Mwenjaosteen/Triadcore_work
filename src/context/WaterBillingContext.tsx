import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Customer,
  Meter,
  MeterReading,
  Bill,
  Payment,
  SystemUser,
  AuditLog,
  TariffSettings,
  UtilitySettings,
  PaymentMethod,
  MeterStatus,
  CustomerCategory,
} from '../types/billing';
import { DEFAULT_TARIFFS, calculateWaterBill, checkReadingAnomaly } from '../utils/billingCalculator';

export interface WaterBillingContextType {
  // App view states
  activePlatform: 'web' | 'mobile';
  setActivePlatform: (platform: 'web' | 'mobile') => void;
  mobileSubView: 'reader' | 'customer' | 'offline_sync';
  setMobileSubView: (view: 'reader' | 'customer' | 'offline_sync') => void;
  currentUser: SystemUser;
  setCurrentUser: (user: SystemUser) => void;
  users: SystemUser[];

  // Entities
  customers: Customer[];
  meters: Meter[];
  readings: MeterReading[];
  bills: Bill[];
  payments: Payment[];
  auditLogs: AuditLog[];
  tariffs: TariffSettings;
  settings: UtilitySettings;

  // Actions
  addCustomer: (data: Omit<Customer, 'id' | 'customerNo' | 'accountNo' | 'currentBalance' | 'registrationDate'>) => Customer;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  addMeter: (data: Omit<Meter, 'lastReading' | 'lastReadingDate'>) => Meter;
  updateMeterStatus: (meterNo: string, status: MeterStatus) => void;
  assignMeterToCustomer: (meterNo: string, customerId: string) => void;

  recordReading: (
    meterNo: string,
    currentReading: number,
    readingDate: string,
    notes?: string,
    photoUrl?: string
  ) => { reading: MeterReading; anomalyReason?: string };

  generateBill: (readingId: string) => Bill;
  batchGenerateBills: () => number;
  
  recordPayment: (
    accountNo: string,
    amount: number,
    method: PaymentMethod,
    reference: string,
    notes?: string
  ) => Payment;

  updateTariffs: (newTariffs: TariffSettings) => void;
  updateSettings: (newSettings: UtilitySettings) => void;

  // System actions
  resetToDemoData: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (jsonStr: string) => boolean;

  // Active viewing selections for modals/drawers
  selectedBill: Bill | null;
  setSelectedBill: (bill: Bill | null) => void;
  selectedPayment: Payment | null;
  setSelectedPayment: (payment: Payment | null) => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
}

const DEFAULT_SETTINGS: UtilitySettings = {
  utilityName: 'ZUCAR WATER & SEWERAGE UTILITY',
  tagline: 'Standard Water Billing Management System',
  vendorName: 'ZUCAR IT SOLUTIONS',
  contactPhone: '+254 700 123 456 / +1 (800) 555-WATER',
  contactEmail: 'billing@zucarwater.co.ke',
  physicalAddress: 'Zucar Towers, Suite 400, Utility Way, Nairobi',
  paybillNumber: '880120',
  bankAccount: '1109-8834-0012',
  bankName: 'National Commercial Bank',
};

const INITIAL_USERS: SystemUser[] = [
  {
    id: 'USR-01',
    name: 'David Ochieng',
    email: 'admin@zucarwater.com',
    role: 'Administrator',
    phone: '+254 711 000 101',
    status: 'Active',
    lastLogin: '2026-10-10 10:45 AM',
  },
  {
    id: 'USR-02',
    name: 'Sarah Mwangi',
    email: 'sarah.billing@zucarwater.com',
    role: 'Billing Staff',
    phone: '+254 722 000 202',
    status: 'Active',
    lastLogin: '2026-10-10 09:30 AM',
  },
  {
    id: 'USR-03',
    name: 'Patrick Kiprop',
    email: 'patrick.reader@zucarwater.com',
    role: 'Field Meter Reader',
    phone: '+254 733 000 303',
    status: 'Active',
    lastLogin: '2026-10-10 08:15 AM',
  },
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    customerNo: 'CUST-1001',
    name: 'John Kamau Kariuki',
    phone: '+254 712 345 678',
    email: 'j.kamau@gmail.com',
    address: 'Plot 42, Sunrise Estate, Court 4',
    estateZone: 'Sunrise Estate',
    accountNo: 'ACC-88201',
    meterNo: 'WM-2245781',
    category: 'Domestic',
    status: 'Active',
    registrationDate: '2024-01-15',
    currentBalance: 32.50,
  },
  {
    id: 'CUST-002',
    customerNo: 'CUST-1002',
    name: 'Grace Wambui Njoroge',
    phone: '+254 723 456 789',
    email: 'grace.njoroge@outlook.com',
    address: 'Villa 12, Greenfield Hills',
    estateZone: 'Greenfield Hills',
    accountNo: 'ACC-88202',
    meterNo: 'WM-1002',
    category: 'Domestic',
    status: 'Active',
    registrationDate: '2024-02-10',
    currentBalance: 0.00,
  },
  {
    id: 'CUST-003',
    customerNo: 'CUST-1003',
    name: 'Golden Peak Hotel & Suites',
    phone: '+254 734 567 890',
    email: 'accounts@goldenpeakhotel.com',
    address: 'Commercial Boulevard, Block C',
    estateZone: 'Central Business District',
    accountNo: 'ACC-88203',
    meterNo: 'WM-1003',
    category: 'Commercial',
    status: 'Active',
    registrationDate: '2023-11-20',
    currentBalance: 245.80,
  },
  {
    id: 'CUST-004',
    customerNo: 'CUST-1004',
    name: 'St. Jude Academy Primary School',
    phone: '+254 745 678 901',
    email: 'bursar@stjudeacademy.ac.ke',
    address: 'Education Road, Sector 8',
    estateZone: 'Institutional Zone',
    accountNo: 'ACC-88204',
    meterNo: 'WM-1004',
    category: 'Institutional',
    status: 'Active',
    registrationDate: '2023-09-01',
    currentBalance: 120.00,
  },
  {
    id: 'CUST-005',
    customerNo: 'CUST-1005',
    name: 'Peter Otieno Onyango',
    phone: '+254 756 789 012',
    email: 'peter.otieno@gmail.com',
    address: 'House 8B, Sunrise Estate',
    estateZone: 'Sunrise Estate',
    accountNo: 'ACC-88205',
    meterNo: 'WM-1005',
    category: 'Domestic',
    status: 'Active',
    registrationDate: '2024-04-12',
    currentBalance: 58.20,
  },
  {
    id: 'CUST-006',
    customerNo: 'CUST-1006',
    name: 'Amina Hassan Sheikh',
    phone: '+254 767 890 123',
    email: 'amina.hassan@yahoo.com',
    address: 'Flat 3, Horizon Heights',
    estateZone: 'Horizon Park',
    accountNo: 'ACC-88206',
    meterNo: 'WM-1006',
    category: 'Domestic',
    status: 'Suspended',
    registrationDate: '2024-05-18',
    currentBalance: 185.40,
  },
];

const INITIAL_METERS: Meter[] = [
  {
    meterNo: 'WM-2245781',
    customerId: 'CUST-001',
    customerName: 'John Kamau Kariuki',
    accountNo: 'ACC-88201',
    installationDate: '2024-01-16',
    status: 'Active',
    size: '1/2" (15mm)',
    initialReading: 0,
    lastReading: 135,
    lastReadingDate: '2026-10-05',
    locationNotes: 'Front gate left wall, brass lock casing',
    latitude: -1.286389,
    longitude: 36.817223,
  },
  {
    meterNo: 'WM-1002',
    customerId: 'CUST-002',
    customerName: 'Grace Wambui Njoroge',
    accountNo: 'ACC-88202',
    installationDate: '2024-02-12',
    status: 'Active',
    size: '1/2" (15mm)',
    initialReading: 0,
    lastReading: 88,
    lastReadingDate: '2026-10-05',
    locationNotes: 'Garden faucet manifold underground box',
    latitude: -1.284200,
    longitude: 36.819400,
  },
  {
    meterNo: 'WM-1003',
    customerId: 'CUST-003',
    customerName: 'Golden Peak Hotel & Suites',
    accountNo: 'ACC-88203',
    installationDate: '2023-11-22',
    status: 'Active',
    size: '2" (50mm)',
    initialReading: 100,
    lastReading: 480,
    lastReadingDate: '2026-10-04',
    locationNotes: 'Basement utility pump room #2',
    latitude: -1.289100,
    longitude: 36.824300,
  },
  {
    meterNo: 'WM-1004',
    customerId: 'CUST-004',
    customerName: 'St. Jude Academy Primary School',
    accountNo: 'ACC-88204',
    installationDate: '2023-09-05',
    status: 'Active',
    size: '1" (25mm)',
    initialReading: 50,
    lastReading: 310,
    lastReadingDate: '2026-10-04',
    locationNotes: 'Main gate perimeter fence near security booth',
    latitude: -1.293000,
    longitude: 36.811000,
  },
  {
    meterNo: 'WM-1005',
    customerId: 'CUST-005',
    customerName: 'Peter Otieno Onyango',
    accountNo: 'ACC-88205',
    installationDate: '2024-04-14',
    status: 'Active',
    size: '1/2" (15mm)',
    initialReading: 0,
    lastReading: 95,
    lastReadingDate: '2026-10-06',
    locationNotes: 'Driveway entrance ground meter chamber',
    latitude: -1.287500,
    longitude: 36.816900,
  },
  {
    meterNo: 'WM-1006',
    customerId: 'CUST-006',
    customerName: 'Amina Hassan Sheikh',
    accountNo: 'ACC-88206',
    installationDate: '2024-05-20',
    status: 'Faulty',
    size: '1/2" (15mm)',
    initialReading: 0,
    lastReading: 142,
    lastReadingDate: '2026-09-05',
    locationNotes: 'Apartment corridor riser B, level 2',
    latitude: -1.290500,
    longitude: 36.820100,
  },
];

// Seed readings including the exact Slide 6 calculation:
// Previous reading: 120 m3, Current reading: 135 m3, Consumption: 15 m3
const INITIAL_READINGS: MeterReading[] = [
  {
    id: 'RD-001',
    readingNo: 'RD-2026-10-001',
    meterNo: 'WM-2245781',
    accountNo: 'ACC-88201',
    customerName: 'John Kamau Kariuki',
    previousReading: 120,
    currentReading: 135,
    consumption: 15, // 135 - 120 = 15 m3 (Slide 6 example)
    readingDate: '2026-10-05',
    readerId: 'USR-03',
    readerName: 'Patrick Kiprop',
    photoUrl: '/src/assets/images/meter_reading_dial_1791655156879.jpg',
    status: 'Billed',
    notes: 'Meter dial clear, verified residential consumption',
  },
  {
    id: 'RD-002',
    readingNo: 'RD-2026-10-002',
    meterNo: 'WM-1002',
    accountNo: 'ACC-88202',
    customerName: 'Grace Wambui Njoroge',
    previousReading: 76,
    currentReading: 88,
    consumption: 12,
    readingDate: '2026-10-05',
    readerId: 'USR-03',
    readerName: 'Patrick Kiprop',
    status: 'Billed',
    notes: 'Regular reading recorded',
  },
  {
    id: 'RD-003',
    readingNo: 'RD-2026-10-003',
    meterNo: 'WM-1003',
    accountNo: 'ACC-88203',
    customerName: 'Golden Peak Hotel & Suites',
    previousReading: 410,
    currentReading: 480,
    consumption: 70,
    readingDate: '2026-10-04',
    readerId: 'USR-03',
    readerName: 'Patrick Kiprop',
    status: 'Billed',
    notes: 'Commercial kitchen and guest laundry consumption',
  },
  {
    id: 'RD-004',
    readingNo: 'RD-2026-10-004',
    meterNo: 'WM-1004',
    accountNo: 'ACC-88204',
    customerName: 'St. Jude Academy Primary School',
    previousReading: 265,
    currentReading: 310,
    consumption: 45,
    readingDate: '2026-10-04',
    readerId: 'USR-03',
    readerName: 'Patrick Kiprop',
    status: 'Billed',
    notes: 'Term time school consumption',
  },
  {
    id: 'RD-005',
    readingNo: 'RD-2026-10-005',
    meterNo: 'WM-1005',
    accountNo: 'ACC-88205',
    customerName: 'Peter Otieno Onyango',
    previousReading: 74,
    currentReading: 95,
    consumption: 21,
    readingDate: '2026-10-06',
    readerId: 'USR-03',
    readerName: 'Patrick Kiprop',
    status: 'Verified', // Ready to be billed!
    notes: 'Garden irrigation spike during dry spell',
  },
];

// Initial pre-calculated bills
const INITIAL_BILLS: Bill[] = [
  {
    billNo: 'INV-2026-10-01',
    accountNo: 'ACC-88201',
    customerName: 'John Kamau Kariuki',
    customerPhone: '+254 712 345 678',
    address: 'Plot 42, Sunrise Estate, Court 4',
    estateZone: 'Sunrise Estate',
    category: 'Domestic',
    meterNo: 'WM-2245781',
    readingId: 'RD-001',
    billingPeriod: 'October 2026',
    billingDate: '2026-10-06',
    dueDate: '2026-10-20',
    previousReading: 120,
    currentReading: 135,
    consumption: 15,
    breakdown: [
      { range: '0 - 6 m³', volumeM3: 6, rate: 1.20, amount: 7.20 },
      { range: '6 - 20 m³', volumeM3: 9, rate: 1.80, amount: 16.20 },
    ],
    waterCharge: 23.40,
    meterRent: 2.50,
    sanitationFee: 2.34,
    penaltyFee: 0,
    previousBalance: 4.26,
    totalPayable: 32.50,
    amountPaid: 0,
    balanceDue: 32.50,
    status: 'Unpaid',
    generatedBy: 'System Auto-Billing Engine',
  },
  {
    billNo: 'INV-2026-10-02',
    accountNo: 'ACC-88202',
    customerName: 'Grace Wambui Njoroge',
    customerPhone: '+254 723 456 789',
    address: 'Villa 12, Greenfield Hills',
    estateZone: 'Greenfield Hills',
    category: 'Domestic',
    meterNo: 'WM-1002',
    readingId: 'RD-002',
    billingPeriod: 'October 2026',
    billingDate: '2026-10-06',
    dueDate: '2026-10-20',
    previousReading: 76,
    currentReading: 88,
    consumption: 12,
    breakdown: [
      { range: '0 - 6 m³', volumeM3: 6, rate: 1.20, amount: 7.20 },
      { range: '6 - 20 m³', volumeM3: 6, rate: 1.80, amount: 10.80 },
    ],
    waterCharge: 18.00,
    meterRent: 2.50,
    sanitationFee: 1.80,
    penaltyFee: 0,
    previousBalance: 0,
    totalPayable: 22.30,
    amountPaid: 22.30,
    balanceDue: 0.00,
    status: 'Paid',
    generatedBy: 'System Auto-Billing Engine',
  },
  {
    billNo: 'INV-2026-10-03',
    accountNo: 'ACC-88203',
    customerName: 'Golden Peak Hotel & Suites',
    customerPhone: '+254 734 567 890',
    address: 'Commercial Boulevard, Block C',
    estateZone: 'Central Business District',
    category: 'Commercial',
    meterNo: 'WM-1003',
    readingId: 'RD-003',
    billingPeriod: 'October 2026',
    billingDate: '2026-10-05',
    dueDate: '2026-10-19',
    previousReading: 410,
    currentReading: 480,
    consumption: 70,
    breakdown: [
      { range: '0 - 15 m³', volumeM3: 15, rate: 2.40, amount: 36.00 },
      { range: '15 - 50 m³', volumeM3: 35, rate: 3.20, amount: 112.00 },
      { range: '> 50 m³', volumeM3: 20, rate: 4.10, amount: 82.00 },
    ],
    waterCharge: 230.00,
    meterRent: 5.00,
    sanitationFee: 27.60,
    penaltyFee: 0,
    previousBalance: 50.00,
    totalPayable: 312.60,
    amountPaid: 100.00,
    balanceDue: 212.60,
    status: 'Partial',
    generatedBy: 'System Auto-Billing Engine',
  },
  {
    billNo: 'INV-2026-10-04',
    accountNo: 'ACC-88204',
    customerName: 'St. Jude Academy Primary School',
    customerPhone: '+254 745 678 901',
    address: 'Education Road, Sector 8',
    estateZone: 'Institutional Zone',
    category: 'Institutional',
    meterNo: 'WM-1004',
    readingId: 'RD-004',
    billingPeriod: 'October 2026',
    billingDate: '2026-10-05',
    dueDate: '2026-10-19',
    previousReading: 265,
    currentReading: 310,
    consumption: 45,
    breakdown: [
      { range: '0 - 30 m³', volumeM3: 30, rate: 1.90, amount: 57.00 },
      { range: '30 - 100 m³', volumeM3: 15, rate: 2.60, amount: 39.00 },
    ],
    waterCharge: 96.00,
    meterRent: 6.00,
    sanitationFee: 9.60,
    penaltyFee: 0,
    previousBalance: 8.40,
    totalPayable: 120.00,
    amountPaid: 0,
    balanceDue: 120.00,
    status: 'Unpaid',
    generatedBy: 'System Auto-Billing Engine',
  },
];

const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'PAY-001',
    receiptNo: 'REC-2026-9901',
    billNo: 'INV-2026-10-02',
    accountNo: 'ACC-88202',
    customerName: 'Grace Wambui Njoroge',
    amount: 22.30,
    paymentDate: '2026-10-07 11:24 AM',
    method: 'M-Pesa',
    reference: 'QKD892LMA3',
    cashierName: 'M-Pesa Express Gateway',
    notes: 'Online auto-settled via M-Pesa Paybill 880120',
  },
  {
    id: 'PAY-002',
    receiptNo: 'REC-2026-9902',
    billNo: 'INV-2026-10-03',
    accountNo: 'ACC-88203',
    customerName: 'Golden Peak Hotel & Suites',
    amount: 100.00,
    paymentDate: '2026-10-08 02:40 PM',
    method: 'Bank Transfer',
    reference: 'EFT-8890214',
    cashierName: 'Sarah Mwangi',
    notes: 'Direct EFT deposit National Bank',
  },
  {
    id: 'PAY-003',
    receiptNo: 'REC-2026-9890',
    billNo: 'INV-2026-09-12',
    accountNo: 'ACC-88205',
    customerName: 'Peter Otieno Onyango',
    amount: 35.00,
    paymentDate: '2026-09-28 09:15 AM',
    method: 'Cash',
    reference: 'CSH-10492',
    cashierName: 'Sarah Mwangi',
    notes: 'Counter payment verified at office teller',
  },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-10-06 08:30:15',
    userName: 'David Ochieng',
    userRole: 'Administrator',
    action: 'Tariff Config Updated',
    details: 'Verified FY2026 Stepped Water Tariffs and 10% Sanitation surcharges.',
  },
  {
    id: 'LOG-002',
    timestamp: '2026-10-06 09:12:44',
    userName: 'Patrick Kiprop',
    userRole: 'Field Meter Reader',
    action: 'Meter Reading Captured',
    details: 'Captured reading for WM-2245781 (135 m³) with dial photo verification.',
  },
  {
    id: 'LOG-003',
    timestamp: '2026-10-06 10:05:00',
    userName: 'System Auto-Billing Engine',
    userRole: 'System',
    action: 'Batch Billing Executed',
    details: 'Generated 4 bills for billing period October 2026.',
  },
  {
    id: 'LOG-004',
    timestamp: '2026-10-07 11:24:02',
    userName: 'Grace Wambui Njoroge',
    userRole: 'Customer',
    action: 'Payment Received',
    details: 'M-Pesa payment of $22.30 received for Account ACC-88202 (Ref: QKD892LMA3).',
  },
];

const WaterBillingContext = createContext<WaterBillingContextType | undefined>(undefined);

export const WaterBillingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePlatform, setActivePlatform] = useState<'web' | 'mobile'>('web');
  const [mobileSubView, setMobileSubView] = useState<'reader' | 'customer' | 'offline_sync'>('reader');
  const [users] = useState<SystemUser[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<SystemUser>(INITIAL_USERS[0]);

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('zucar_wb_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [meters, setMeters] = useState<Meter[]>(() => {
    const saved = localStorage.getItem('zucar_wb_meters');
    return saved ? JSON.parse(saved) : INITIAL_METERS;
  });

  const [readings, setReadings] = useState<MeterReading[]>(() => {
    const saved = localStorage.getItem('zucar_wb_readings');
    return saved ? JSON.parse(saved) : INITIAL_READINGS;
  });

  const [bills, setBills] = useState<Bill[]>(() => {
    const saved = localStorage.getItem('zucar_wb_bills');
    return saved ? JSON.parse(saved) : INITIAL_BILLS;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('zucar_wb_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('zucar_wb_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [tariffs, setTariffs] = useState<TariffSettings>(() => {
    const saved = localStorage.getItem('zucar_wb_tariffs');
    return saved ? JSON.parse(saved) : DEFAULT_TARIFFS;
  });

  const [settings, setSettings] = useState<UtilitySettings>(() => {
    const saved = localStorage.getItem('zucar_wb_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('zucar_wb_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('zucar_wb_meters', JSON.stringify(meters));
  }, [meters]);

  useEffect(() => {
    localStorage.setItem('zucar_wb_readings', JSON.stringify(readings));
  }, [readings]);

  useEffect(() => {
    localStorage.setItem('zucar_wb_bills', JSON.stringify(bills));
  }, [bills]);

  useEffect(() => {
    localStorage.setItem('zucar_wb_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('zucar_wb_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('zucar_wb_tariffs', JSON.stringify(tariffs));
  }, [tariffs]);

  useEffect(() => {
    localStorage.setItem('zucar_wb_settings', JSON.stringify(settings));
  }, [settings]);

  // Log action helper
  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Add Customer
  const addCustomer = (data: Omit<Customer, 'id' | 'customerNo' | 'accountNo' | 'currentBalance' | 'registrationDate'>) => {
    const count = customers.length + 1;
    const customerNo = `CUST-${1000 + count}`;
    const accountNo = `ACC-882${count < 10 ? '0' + count : count}`;
    const newCustomer: Customer = {
      ...data,
      id: `CUST-${Date.now()}`,
      customerNo,
      accountNo,
      currentBalance: 0,
      registrationDate: new Date().toISOString().split('T')[0],
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    addAuditLog('Customer Registered', `Added new customer ${newCustomer.name} (${accountNo})`);
    return newCustomer;
  };

  const updateCustomer = (id: string, data: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
    addAuditLog('Customer Updated', `Updated customer record ID ${id}`);
  };

  const deleteCustomer = (id: string) => {
    const cust = customers.find((c) => c.id === id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    if (cust) {
      addAuditLog('Customer Removed', `Deleted customer ${cust.name} (${cust.accountNo})`);
    }
  };

  // Add Meter
  const addMeter = (data: Omit<Meter, 'lastReading' | 'lastReadingDate'>) => {
    const newMeter: Meter = {
      ...data,
      lastReading: data.initialReading,
      lastReadingDate: data.installationDate,
    };
    setMeters((prev) => [newMeter, ...prev]);
    addAuditLog('Meter Added', `Registered meter ${newMeter.meterNo} for ${newMeter.customerName}`);
    return newMeter;
  };

  const updateMeterStatus = (meterNo: string, status: MeterStatus) => {
    setMeters((prev) =>
      prev.map((m) => (m.meterNo === meterNo ? { ...m, status } : m))
    );
    addAuditLog('Meter Status Changed', `Meter ${meterNo} status set to ${status}`);
  };

  const assignMeterToCustomer = (meterNo: string, customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return;

    setMeters((prev) =>
      prev.map((m) =>
        m.meterNo === meterNo
          ? {
              ...m,
              customerId,
              customerName: customer.name,
              accountNo: customer.accountNo,
            }
          : m
      )
    );
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, meterNo } : c))
    );
    addAuditLog('Meter Assigned', `Assigned meter ${meterNo} to ${customer.name}`);
  };

  // Record Reading
  const recordReading = (
    meterNo: string,
    currentReading: number,
    readingDate: string,
    notes?: string,
    photoUrl?: string
  ) => {
    const meter = meters.find((m) => m.meterNo === meterNo);
    const previousReading = meter ? meter.lastReading : 0;
    const consumption = Math.max(0, currentReading - previousReading);
    const customer = customers.find((c) => c.meterNo === meterNo);

    const anomalyCheck = checkReadingAnomaly(previousReading, currentReading);

    const newReading: MeterReading = {
      id: `RD-${Date.now()}`,
      readingNo: `RD-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(readings.length + 1).padStart(3, '0')}`,
      meterNo,
      accountNo: customer?.accountNo || meter?.accountNo || 'ACC-UNKNOWN',
      customerName: customer?.name || meter?.customerName || 'Unknown Customer',
      previousReading,
      currentReading,
      consumption,
      readingDate,
      readerId: currentUser.id,
      readerName: currentUser.name,
      photoUrl: photoUrl || '/src/assets/images/meter_reading_dial_1791655156879.jpg',
      status: anomalyCheck.isAnomaly ? 'Anomaly' : 'Verified',
      anomalyNotes: anomalyCheck.reason,
      notes: notes || 'Field meter entry captured',
    };

    setReadings((prev) => [newReading, ...prev]);

    // Update meter's lastReading
    setMeters((prev) =>
      prev.map((m) =>
        m.meterNo === meterNo
          ? { ...m, lastReading: currentReading, lastReadingDate: readingDate }
          : m
      )
    );

    addAuditLog(
      anomalyCheck.isAnomaly ? 'Anomaly Reading Recorded' : 'Reading Recorded',
      `Meter ${meterNo}: ${previousReading} -> ${currentReading} m³ (Consumption: ${consumption} m³)`
    );

    return { reading: newReading, anomalyReason: anomalyCheck.reason };
  };

  // Generate Bill for a Reading
  const generateBill = (readingId: string): Bill => {
    const reading = readings.find((r) => r.id === readingId);
    if (!reading) throw new Error('Reading not found');

    const customer = customers.find((c) => c.meterNo === reading.meterNo);
    const category: CustomerCategory = customer?.category || 'Domestic';
    const previousBalance = customer?.currentBalance || 0;

    const calc = calculateWaterBill(
      reading.previousReading,
      reading.currentReading,
      category,
      previousBalance,
      tariffs
    );

    const now = new Date();
    const billingPeriod = now.toLocaleString('default', { month: 'long', year: 'numeric' });
    const billingDate = now.toISOString().split('T')[0];
    const dueDateObj = new Date();
    dueDateObj.setDate(dueDateObj.getDate() + (tariffs.dueDaysFromBilling || 14));
    const dueDate = dueDateObj.toISOString().split('T')[0];

    const billNo = `INV-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(bills.length + 1).padStart(3, '0')}`;

    const newBill: Bill = {
      billNo,
      accountNo: reading.accountNo,
      customerName: reading.customerName,
      customerPhone: customer?.phone || '+254 700 000 000',
      address: customer?.address || 'Water Service Point',
      estateZone: customer?.estateZone || 'General Zone',
      category,
      meterNo: reading.meterNo,
      readingId,
      billingPeriod,
      billingDate,
      dueDate,
      previousReading: reading.previousReading,
      currentReading: reading.currentReading,
      consumption: calc.consumption,
      breakdown: calc.breakdown,
      waterCharge: calc.waterCharge,
      meterRent: calc.meterRent,
      sanitationFee: calc.sanitationFee,
      penaltyFee: 0,
      previousBalance,
      totalPayable: calc.totalPayable,
      amountPaid: 0,
      balanceDue: calc.totalPayable,
      status: 'Unpaid',
      generatedBy: currentUser.name,
    };

    // Update reading status to 'Billed'
    setReadings((prev) =>
      prev.map((r) => (r.id === readingId ? { ...r, status: 'Billed' } : r))
    );

    // Update customer current balance
    setCustomers((prev) =>
      prev.map((c) =>
        c.meterNo === reading.meterNo
          ? { ...c, currentBalance: calc.totalPayable }
          : c
      )
    );

    setBills((prev) => [newBill, ...prev]);
    addAuditLog('Bill Generated', `Bill ${billNo} generated for ${newBill.customerName} - Total ${tariffs.currencySymbol}${calc.totalPayable}`);

    return newBill;
  };

  // Batch bill generation
  const batchGenerateBills = (): number => {
    const unbilledReadings = readings.filter((r) => r.status === 'Verified');
    let generatedCount = 0;

    for (const r of unbilledReadings) {
      generateBill(r.id);
      generatedCount++;
    }

    addAuditLog('Batch Billing Executed', `Generated ${generatedCount} automatic bills from pending verified readings.`);
    return generatedCount;
  };

  // Record Payment
  const recordPayment = (
    accountNo: string,
    amount: number,
    method: PaymentMethod,
    reference: string,
    notes?: string
  ): Payment => {
    const customer = customers.find((c) => c.accountNo === accountNo);
    const openBill = bills.find(
      (b) => b.accountNo === accountNo && (b.status === 'Unpaid' || b.status === 'Partial' || b.status === 'Overdue')
    );

    const now = new Date();
    const receiptNo = `REC-${now.getFullYear()}-${String(1000 + payments.length + 1)}`;
    const paymentDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newPayment: Payment = {
      id: `PAY-${Date.now()}`,
      receiptNo,
      billNo: openBill ? openBill.billNo : 'ADVANCE-PAYMENT',
      accountNo,
      customerName: customer?.name || openBill?.customerName || 'Customer',
      amount,
      paymentDate,
      method,
      reference: reference || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      cashierName: currentUser.name,
      notes: notes || `Settled via ${method}`,
    };

    setPayments((prev) => [newPayment, ...prev]);

    // Update bill balance & status if applied to bill
    if (openBill) {
      setBills((prev) =>
        prev.map((b) => {
          if (b.billNo === openBill.billNo) {
            const newPaid = b.amountPaid + amount;
            const newBal = Math.max(0, b.totalPayable - newPaid);
            const status: any = newBal === 0 ? 'Paid' : 'Partial';
            return {
              ...b,
              amountPaid: newPaid,
              balanceDue: newBal,
              status,
            };
          }
          return b;
        })
      );
    }

    // Update customer current balance
    if (customer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.accountNo === accountNo
            ? { ...c, currentBalance: Math.max(0, c.currentBalance - amount) }
            : c
        )
      );
    }

    addAuditLog(
      'Payment Recorded',
      `Receipt ${receiptNo}: ${tariffs.currencySymbol}${amount} via ${method} for ${accountNo} (Ref: ${newPayment.reference})`
    );

    return newPayment;
  };

  const updateTariffs = (newTariffs: TariffSettings) => {
    setTariffs(newTariffs);
    addAuditLog('Tariffs Updated', 'Updated tariff rates, tiers, and fixed surcharges');
  };

  const updateSettings = (newSettings: UtilitySettings) => {
    setSettings(newSettings);
    addAuditLog('Settings Updated', 'Updated utility organisation contact & payment credentials');
  };

  const resetToDemoData = () => {
    setCustomers(INITIAL_CUSTOMERS);
    setMeters(INITIAL_METERS);
    setReadings(INITIAL_READINGS);
    setBills(INITIAL_BILLS);
    setPayments(INITIAL_PAYMENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setTariffs(DEFAULT_TARIFFS);
    setSettings(DEFAULT_SETTINGS);
    localStorage.clear();
    addAuditLog('Database Reset', 'Reset all system collections to factory demo records.');
  };

  const exportDatabaseJson = () => {
    const data = {
      customers,
      meters,
      readings,
      bills,
      payments,
      auditLogs,
      tariffs,
      settings,
      exportedAt: new Date().toISOString(),
      version: '1.0.0-ZUCAR',
    };
    return JSON.stringify(data, null, 2);
  };

  const importDatabaseJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.customers && data.meters && data.readings) {
        setCustomers(data.customers);
        setMeters(data.meters);
        setReadings(data.readings);
        if (data.bills) setBills(data.bills);
        if (data.payments) setPayments(data.payments);
        if (data.auditLogs) setAuditLogs(data.auditLogs);
        if (data.tariffs) setTariffs(data.tariffs);
        if (data.settings) setSettings(data.settings);
        addAuditLog('Database Restored', 'Restored system database from JSON backup file.');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <WaterBillingContext.Provider
      value={{
        activePlatform,
        setActivePlatform,
        mobileSubView,
        setMobileSubView,
        currentUser,
        setCurrentUser,
        users,
        customers,
        meters,
        readings,
        bills,
        payments,
        auditLogs,
        tariffs,
        settings,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addMeter,
        updateMeterStatus,
        assignMeterToCustomer,
        recordReading,
        generateBill,
        batchGenerateBills,
        recordPayment,
        updateTariffs,
        updateSettings,
        resetToDemoData,
        exportDatabaseJson,
        importDatabaseJson,
        selectedBill,
        setSelectedBill,
        selectedPayment,
        setSelectedPayment,
        selectedCustomer,
        setSelectedCustomer,
      }}
    >
      {children}
    </WaterBillingContext.Provider>
  );
};

export const useWaterBilling = () => {
  const context = useContext(WaterBillingContext);
  if (!context) {
    throw new Error('useWaterBilling must be used within a WaterBillingProvider');
  }
  return context;
};
