import { CustomerVO } from '@/types/customer.types';
import Request from './request';
const CustomerManagementService = {
  fetchCustomerList: (params: any) => {
    const url = `/v1/searchCustomer`;
    return Request.get(url, { params }).then(res => res.data);
  },
  fetchCustomerById: (id: string) => {
    const url = `/v1/searchCustomer?customerName=${id}`;
    return Request.get(url).then(res => res.data);
  },
  createCustomer: (values: CustomerVO) => {
    const url = `/v1/addCustomer`;
    return Request.post(url, values).then(res => res.data);
  },
  updateCustomer: (values: CustomerVO) => {
    const url = `/v1/editCustomer`;
    return Request.put(url, values).then(res => res.data);
  },
};

export default CustomerManagementService;
