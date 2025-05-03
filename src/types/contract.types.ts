
interface ContractDataType {
    contract: {
        contractNumber: string;
        contractType: string;
        amount: number;
        signDate: string;
        payMode: string;
    };
    revenues: Array<{
        revenueNumber: string;
        title: string;
        operator: string;
        projectNumber: string;
        contractNumber: string;
        phase: number;
        qualification: string | null;
        payment: number;
        amount: number;
        revenueTime: string;
        revenueMode: string | null;
        invoice: string;
        attachment: string | null;
        memo: string | null;
    }>;
}