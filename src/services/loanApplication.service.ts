import Request from './request';

const LoanApplicationService = {
  fetchLoanApplicationList: async (params: any) => {
    const url = `/v1/searchLoan`;
    return Request.get(url, params).then((res: any) => res.data);
  },
  fetchLoanApplicationById: async (loanNumber: string) => {
    const url = `/v1/searchLoan?loanNumber=${loanNumber}`;
    return Request.get(url).then((res: any) => res.data);
  },
  createLoanApplication: async (params: any) => {
    const url = `/v1/createLoan`;
    return Request.post(url, params).then((res: any) => res.data);
  },
  updateLoanApplication: async (params: any) => {
    const url = `/v1/updateLoan`;
    return Request.put(url, params).then((res: any) => res.data);
  },
};

export default LoanApplicationService;
