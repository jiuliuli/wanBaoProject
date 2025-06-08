import { INDUSTRY_TYPE } from "@/constants/project.constants";

export interface CustomerVO {
    id: number;
    customerName: string;
    industryType: INDUSTRY_TYPE;
    companyTel: string;
    registerAddress: string;
}