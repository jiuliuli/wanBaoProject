import {
  EVALUATE_TYPE,
  INDUSTRY_TYPE,
  PROJECT_SOURCE_TYPE,
  SCALE_TYPE,
  VENTURE_FACTOR_TYPE,
  VENTURE_TYPE,
} from '@/constants/project.constants';

export interface ProjectVO {
  project_number: string;
  project_name: string;
  short_name: string;
  customer_name: string;
  source: PROJECT_SOURCE_TYPE;
  industry_type: INDUSTRY_TYPE;
  address: string;
  evaluate_type: EVALUATE_TYPE;
  establisher: string;
  director: string;
  report: string; // 送审报告
  audit_quantity: number;
  backup_quantity: number;
  amount: number;
  start_time: number;
  end_time: number;
  finished_time: number;
  bid_bond: number;
  status: PROJECT_STATUS;
  bureau: string[];
  describe: string;
  project_venture: VENTURE_TYPE;
  company_venture: VENTURE_TYPE;
  technical_venture: VENTURE_TYPE;
  industry_venture: string;
  venture_factor: VENTURE_FACTOR_TYPE; // 风险因素
  scale: SCALE_TYPE; // 项目规模
  environment: string;
  expert: boolean; // 是否外聘
}

export interface BasicInfoVO {
  projectNumber: string;
  projectName: string;
  shortName: string;
  customerName: string;
  source: string;
  projectType: string | number;
  industryType: string;
  bidBond: number;
  amount: number;
  director: string;
  bureau: string[];
  status: string;
  auditQuantity: number;
  backupQuantity: number;
  finishedTime: string;
  endTime?: string;
  address: string;
  describe: string;
  startTime: string;
  establisher: string;
  evaluateType: string;
  highRisk: string;
  ventureFactor: string;
  travelFee: number;
  printFee: number;
  channelFee: number;
  compileCost: number;
  commissionFee: number;
  firstAudit: number;
  techAudit: number;
  projectAudit: number;
  reviewAudit: number;
  taxFee: number;
  compiler: string;
  report: string;
  companyVenture: string;
  technicalVenture: string;
  industryVenture: string;
  mainVenture: string;
  expert: string;
  environment: string;
  projectScale: string;
  createBy: string;
  createTime: string;
  contactPerson?: string;
  urgencyLevel?: string;
  orderTime?: string;
  currentProgress?: string;
  cityDepartment?: string[];
  districtDepartment?: string[];
  specialNotes?: string;
  projectMembers?: string[];
  entertainFee?: number;
  taskDays?: number;
  delegateCost?: number;
  apportionFee?: number;
  marketCommission?: number;
  technicalCommission?: number;
  signFee?: number;
  cooperateFee?: number;
  otherFee?: number;
  mailingAddress?: string;
  mailAddress?: string;
  rank?: string;
  signDate?: string;
  mobile?: string;
  memo?: string;
  cityBureau?: string[];
  districtBureau?: string[];
}

export interface ContractVO {
  contractNumber: string;
  contractType: string;
  amount: number;
  signDate: string;
  payMode: string;
}

export interface RevenueVO {
  id: number;
  projectNumber: string;
  name: string;
  duty: string;
  endTime: string;
}

export interface ContractInfoVO {
  contract: ContractVO;
  revenues: RevenueVO[];
}

export interface ProcessInfoVO {
  id: number;
  projectNumber: string;
  contractNumber: string;
  spotName: string;
  operator: string;
  operation: string;
  rank: string;
  transfer: string | null;
  result: string | null;
  opinion: string | null;
  status: string;
  startTime: string;
  finishedTime: string | null;
  attachment: string | null;
}

export interface MemberInfoVO {
  id: number;
  projectNumber: string;
  name: string;
  duty: string;
  endTime: string;
  finishedTime: string | null;
}

export interface MaterialInfoVO {
  project_number: string;
  project_name: string;
  short_name: string;
  customer_name: string;
}

export interface ArchiveInfoVO {
  project_number: string;
  project_name: string;
  short_name: string;
  customer_name: string;
}

export interface RiskInfoVO {
  project_number: string;
  project_name: string;
  short_name: string;
  customer_name: string;
}

export interface ProgressInfoVO {
  projectNumber: string;
  projectName: string;
  shortName: string;
  customerName: string;
  progress: string;
  progressDate: string;
}

export interface ReportInfoVO {
  id: number;
  projectNumber: string;
  reportName: string;
  reportDate: string;
  reportAmount: number;
}
