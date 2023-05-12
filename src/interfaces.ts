export interface NetWorthRecord {
  id?: number;
  description: string;
  categoryId: number;
  amount: number;
  monthlyPayment: number;
  currency: string;
  currencySymbol: string;
}

export interface NetWorthCategory {
  id?: number;
  name: string;
  records?: NetWorthRecord[];
}

export interface NetWorthData {
  assets: NetWorthCategory[];
  totalAssets: number;
  liabilities: NetWorthCategory[];
  totalLiabilities: number;
  netWorth: number;
}
