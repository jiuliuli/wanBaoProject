import Request from './request';
export const ContractManagementService = {
  fetchContractByProjectId: async (projectId: string) => {
    const url = `/v1/getContractDetail?contractNumber=${projectId}`;
    return Request.get(url).then((res: any) => res.data);
  },
};

export default ContractManagementService;
