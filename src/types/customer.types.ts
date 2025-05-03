import { INDUSTRY_TYPE } from "@/constants/project.constants";

export interface CustomerVO {
    id: number;
    customer_name: string;
    industry_type: INDUSTRY_TYPE;
    company_tel: string;
    register_address: string;
}