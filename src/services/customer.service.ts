import { customerList } from "@/services/mocks";
import { CustomerVO } from "@/types/customer.types";

const CustomerManagementService = {
    fetchCustomerList: () => {
        return Promise.resolve(customerList);
    },
    fetchCustomerById: (id: string) => {
        return Promise.resolve(customerList.data.find((item) => item.id === parseInt(id)));
    },
    createCustomer: (values: CustomerVO) => {
        return Promise.resolve(customerList.data.push(values));
    },
    updateCustomer: (values: CustomerVO) => {
        return Promise.resolve(customerList.data.push(values));
    }
}

export default CustomerManagementService;