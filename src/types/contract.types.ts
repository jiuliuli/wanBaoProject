export interface Contract {
  contractNumber: string;
  title: string;
  contractType: string;
  amount: number;
  signDate: string;
  payMode: string;
  status: string;
  document: string | null;
  projectName: string;
  establisher: string;
  progress: string;
  division: string;
  revenues?: Revenue[];
}

export interface Revenue {
  revenueNumber: string;
  title: string;
  operator: string;
  projectNumber: string;
  contractNumber: string;
  phase: string;
  qualification: string | null;
  payment: number;
  amount: number;
  revenueTime: string;
  revenueMode: string | null;
  invoiceTime: string | null;
  invoice: string;
  attachment: string | null;
  memo: string | null;
}
