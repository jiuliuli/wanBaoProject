import Request from './request';

const SalaryManagementService = {
  fetchSalaryList: async () => {
    const url = `/v1/getSalary`;
    return Request.get(url).then(res => res.data);
  },
  fetchSalaryById: async (id: string) => {
    const url = `/v1/getSalary?userName=${id}`;
    return Request.get(url).then(res => res.data);
  },
  createSalary: async (data: any) => {
    const url = `/v1/createSalary`;
    return Request.post(url, data).then(res => res.data);
  },
  updateSalary: async (data: any) => {
    const url = `/v1/editSalary`;
    return Request.put(url, data).then(res => res.data);
  },
  importBatchSalary: async (file: any) => {
    const url = ``;
    return Request.post(url, file).then(res => res.data);
  },
};

export default SalaryManagementService;
