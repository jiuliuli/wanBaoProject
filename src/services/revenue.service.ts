import Request from './request';

const RevenueManagementService = {
  fetchRevenueList: async (params: any) => {
    const url = `/v1/searchRevenue`;
    return Request.get(url, { params }).then((res: any) => res.data);
  },
  fetchRevenueById: async (id: string) => {
    const url = `/v1/searchRevenue?revenueNumber=${id}`;
    return Request.get(url).then((res: any) => res.data);
  },
  updateRevenue: async (data: any) => {
    const url = `/v1/updateRevenue`;
    return Request.put(url, data).then((res: any) => res.data);
  },
  createRevenue: async (data: any) => {
    const url = `/v1/createRevenue`;
    return Request.post(url, data).then((res: any) => res.data);
  },
};

export default RevenueManagementService;
