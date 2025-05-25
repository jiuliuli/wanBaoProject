import { request } from '@umijs/max';
import Request from './request';

const MarketProjectService = {
  fetchContractById: async (id: string) => {
    const url = `/v1/getContractDetail/${id}`;
    return Request.get(url).then(res => res.data);
  },

  async updateContractInfo(values: any) {
    const url = `/v1/updateContract`;
    return Request.put(url, values).then(res => res.data);
  },

  async updateInvoiceInfo(id: string, values: any) {
    return request(`/v1/market-project/invoice/${id}`, {
      method: 'PUT',
      data: values,
    });
  },

  async updateReportInfo(id: string, values: any) {
    console.log(values.records);
    const url = `/v1/editDelivery`;
    return Request.put(url, values).then((res: any) => res.data);
  },

  async updateReceiptInfo(id: string, values: any) {
    return request(`/v1/market-project/receipt/${id}`, {
      method: 'PUT',
      data: values,
    });
  },
};

export default MarketProjectService;
