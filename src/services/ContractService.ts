import { Contract } from '@/types/contract.types';
import Request from './request';

export const ContractService = {
  getContractList: async (): Promise<Contract[]> => {
    const url = '/v1/getContractList';
    return Request.get(url).then((res: any) => res.data);
  },

  getContractById: async (id: string): Promise<Contract> => {
    const url = `/v1/getContractDetail?contractNumber=${id}`;
    return Request.get(url).then((res: any) => res.data);
  },

  createContract: async (data: Omit<Contract, 'document'>): Promise<void> => {
    const url = '/v1/createContract';
    await Request.post(url, data);
  },

  updateContract: async (id: string, data: Omit<Contract, 'document'>): Promise<void> => {
    const url = `/v1/updateContract/${id}`;
    await Request.put(url, data);
  },
};
