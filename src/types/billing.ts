export type CustomerCategory = 'Domestic' | 'Commercial' | 'Institutional';
export type CustomerStatus = 'Active' | 'Suspended' | 'Disconnected';
export type MeterStatus = 'Active' | 'Faulty' | 'Disconnected' | 'Replaced';
export type BillStatus = 'Unpaid' | 'Paid' | 'Partial' | 'Overdue';
export type PaymentMethod = 'M-Pesa' | 'Cash' | 'Bank Transfer' | 'Cheque';
export type UserRole = 'Administrator' | 'Billing Staff' | 'Field Meter Reader';

export interface Customer {
  id: string;
  customerNo: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  estateZone: string;
  accountNo: string;
  meterNo: string;
  category: CustomerCategory;
  status: CustomerStatus;
  registrationDate: string;
  currentBalance: number;
}

export interface Meter {
  meterNo: string;
  customerId: string;
  customerName: string;
  accountNo: string;
  installationDate: string;
  status: MeterStatus;
  size: string;
  initialReading: number;
  lastReading: number;
  lastReadingDate: string;
  locationNotes: string;
  latitude: number;
  longitude: number;
}

export interface MeterReading {
  id: string;
  readingNo: string;
  meterNo: string;
  accountNo: string;
  customerName: string;
  previousReading: number;
  currentReading: number;
  consumption: number; // m3
  readingDate: string;
  readerId: string;
  readerName: string;
  photoUrl?: string;
  status: 'Verified' | 'Pending Review' | 'Billed' | 'Anomaly';
  anomalyNotes?: string;
  notes?: string;
  gpsLocation?: {
    lat: number;
    lng: number;
  };
}

export interface TariffTier {
  minM3: number;
  maxM3: number | null; // null for unbounded
  ratePerM3: number;
}

export interface TariffCategoryConfig {
  name: CustomerCategory;
  description: string;
  tiers: TariffTier[];
  meterRent: number;
  sanitationPercent: number; // e.g. 10%
}

export interface TariffSettings {
  currency: string;
  currencySymbol: string;
  Domestic: TariffCategoryConfig;
  Commercial: TariffCategoryConfig;
  Institutional: TariffCategoryConfig;
  latePenaltyPercent: number;
  dueDaysFromBilling: number;
}

export interface BillTierBreakdown {
  range: string;
  volumeM3: number;
  rate: number;
  amount: number;
}

export interface Bill {
  billNo: string;
  accountNo: string;
  customerName: string;
  customerPhone: string;
  address: string;
  estateZone: string;
  category: CustomerCategory;
  meterNo: string;
  readingId: string;
  billingPeriod: string; // e.g. "October 2026"
  billingDate: string;
  dueDate: string;
  previousReading: number;
  currentReading: number;
  consumption: number; // m3
  breakdown: BillTierBreakdown[];
  waterCharge: number;
  meterRent: number;
  sanitationFee: number;
  penaltyFee: number;
  previousBalance: number;
  totalPayable: number;
  amountPaid: number;
  balanceDue: number;
  status: BillStatus;
  generatedBy: string;
}

export interface Payment {
  id: string;
  receiptNo: string;
  billNo: string;
  accountNo: string;
  customerName: string;
  amount: number;
  paymentDate: string;
  method: PaymentMethod;
  reference: string;
  cashierName: string;
  notes?: string;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
  ipAddress?: string;
}

export interface UtilitySettings {
  utilityName: string;
  tagline: string;
  vendorName: string;
  contactPhone: string;
  contactEmail: string;
  physicalAddress: string;
  paybillNumber: string;
  bankAccount: string;
  bankName: string;
}
