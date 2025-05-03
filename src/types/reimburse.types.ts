import { FEE_TYPE } from "@/constants/reimbursement.constants";

export interface ReimbursementVO {
    projectNumber: string;
    projectName: string;
    reimburser: string;
    amount: string;
    category: FEE_TYPE;
    purpose: string;
    division: string;
    memo: string;
    accountName: string;
    bankName: string;
    accountNumber: string;
    attachment: string[];
}
