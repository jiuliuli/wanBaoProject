import Request from './request';
const ReimburseManagementService = {
  fetchReimburseList: async (params: any) => {
    const url = "/v1/searchExpense";
    return Request.get(url, params).then(res => res.data);
  },
  fetchReimburseById: async (id: string) => {
    const url = `/v1/searchExpense?expenseNumber=${id}`;
    return Request.get(url).then(res => res.data);
  },
  updateReimburse: async (values: any) => {
    const url = `/v1/updateExpense`;
    return Request.put(url, values).then(res => res.data);
  },
  createReimburse: async (values: any) => {
    const url = `/v1/createExpense`;
    return Request.post(url, values).then(res => res.data);
  },
  fetchCategoryStatus: async () => {
    const url = `/v1/getExpenseCategory`;
    return Request.get(url).then(res => res.data);
  },
};

export default ReimburseManagementService;
