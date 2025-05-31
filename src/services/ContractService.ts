import { Contract } from '@/types/contract.types';
import Request from './request';

export const ContractService = {
  getContractList: async (): Promise<Contract[]> => {
    const url = '/v1/getContractList';
    return Request.get(url).then((res: any) => res.data);
  },

  getContractById: async (id: string): Promise<any> => {
    const url = `/v1/getContractDetail/${id}`;
    return Request.get(url).then((res: any) => res.data[0]);
  },

  createContract: async (data: Omit<Contract, 'document'>): Promise<void> => {
    const url = '/v1/createContract';
    await Request.post(url, data);
  },

  updateContract: async (data: Omit<Contract, 'document'>): Promise<void> => {
    const url = `/v1/updateContract`;
    await Request.put(url, data);
  },
};
