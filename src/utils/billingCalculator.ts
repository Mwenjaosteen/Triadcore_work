import { CustomerCategory, TariffSettings, BillTierBreakdown } from '../types/billing';

export const DEFAULT_TARIFFS: TariffSettings = {
  currency: 'USD',
  currencySymbol: '$',
  Domestic: {
    name: 'Domestic',
    description: 'Residential households and family apartments',
    tiers: [
      { minM3: 0, maxM3: 6, ratePerM3: 1.20 },
      { minM3: 6, maxM3: 20, ratePerM3: 1.80 },
      { minM3: 20, maxM3: 50, ratePerM3: 2.50 },
      { minM3: 50, maxM3: null, ratePerM3: 3.20 },
    ],
    meterRent: 2.50,
    sanitationPercent: 10, // 10% of water charge
  },
  Commercial: {
    name: 'Commercial',
    description: 'Businesses, shops, offices, restaurants and hotels',
    tiers: [
      { minM3: 0, maxM3: 15, ratePerM3: 2.40 },
      { minM3: 15, maxM3: 50, ratePerM3: 3.20 },
      { minM3: 50, maxM3: null, ratePerM3: 4.10 },
    ],
    meterRent: 5.00,
    sanitationPercent: 12,
  },
  Institutional: {
    name: 'Institutional',
    description: 'Schools, hospitals, government agencies and churches',
    tiers: [
      { minM3: 0, maxM3: 30, ratePerM3: 1.90 },
      { minM3: 30, maxM3: 100, ratePerM3: 2.60 },
      { minM3: 100, maxM3: null, ratePerM3: 3.40 },
    ],
    meterRent: 6.00,
    sanitationPercent: 10,
  },
  latePenaltyPercent: 5,
  dueDaysFromBilling: 14,
};

export interface CalculationResult {
  consumption: number;
  breakdown: BillTierBreakdown[];
  waterCharge: number;
  meterRent: number;
  sanitationFee: number;
  subtotal: number;
  previousBalance: number;
  totalPayable: number;
}

export function calculateWaterBill(
  previousReading: number,
  currentReading: number,
  category: CustomerCategory = 'Domestic',
  previousBalance: number = 0,
  tariffs: TariffSettings = DEFAULT_TARIFFS
): CalculationResult {
  const consumption = Math.max(0, currentReading - previousReading);
  const config = tariffs[category] || tariffs.Domestic;

  let remaining = consumption;
  let totalWaterCharge = 0;
  const breakdown: BillTierBreakdown[] = [];

  for (const tier of config.tiers) {
    if (remaining <= 0) break;

    const tierCapacity = tier.maxM3 !== null ? tier.maxM3 - tier.minM3 : Infinity;
    const billedInThisTier = Math.min(remaining, tierCapacity);

    if (billedInThisTier > 0) {
      const amount = billedInThisTier * tier.ratePerM3;
      totalWaterCharge += amount;
      const rangeLabel = tier.maxM3 !== null 
        ? `${tier.minM3} - ${tier.maxM3} m³` 
        : `> ${tier.minM3} m³`;

      breakdown.push({
        range: rangeLabel,
        volumeM3: billedInThisTier,
        rate: tier.ratePerM3,
        amount: Math.round(amount * 100) / 100,
      });

      remaining -= billedInThisTier;
    }
  }

  const roundedWaterCharge = Math.round(totalWaterCharge * 100) / 100;
  const meterRent = config.meterRent;
  const sanitationFee = Math.round((roundedWaterCharge * (config.sanitationPercent / 100)) * 100) / 100;
  const subtotal = Math.round((roundedWaterCharge + meterRent + sanitationFee) * 100) / 100;
  const totalPayable = Math.round((subtotal + previousBalance) * 100) / 100;

  return {
    consumption,
    breakdown,
    waterCharge: roundedWaterCharge,
    meterRent,
    sanitationFee,
    subtotal,
    previousBalance,
    totalPayable,
  };
}

export function formatCurrency(amount: number, symbol: string = '$'): string {
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function checkReadingAnomaly(previous: number, current: number, averageMonthlyM3: number = 18): {
  isAnomaly: boolean;
  reason?: string;
} {
  if (current < previous) {
    return {
      isAnomaly: true,
      reason: `Current reading (${current}) is lower than previous reading (${previous}). Possible meter rollback or replacement.`,
    };
  }

  const consumption = current - previous;
  if (consumption > averageMonthlyM3 * 2.5 && consumption > 30) {
    return {
      isAnomaly: true,
      reason: `High consumption alert: ${consumption} m³ is >250% higher than normal historical baseline. Check for burst pipe, leak, or recording error.`,
    };
  }

  return { isAnomaly: false };
}
