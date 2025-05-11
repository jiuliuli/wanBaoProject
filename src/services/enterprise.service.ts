import Request from './request';

const EnterpriseManagementService = {
  fetchEnterpriseList: async (params: any) => {
    const url = `/v1/searchCustomer`;
    return Request.get(url, { params }).then(res => res.data);
  },
};

export default EnterpriseManagementService;
