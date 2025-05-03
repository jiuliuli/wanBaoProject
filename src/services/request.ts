import axios from 'axios';

export const Request = {
    get: async (url: string, params?: any) => {
        const response = await axios.get(url, { params });
        return response.data;
    },
    post: async (url: string, data: any) => {
        const response = await axios.post(url, data);
        return response.data;
    },
    put: async (url: string, data: any) => {
        const response = await axios.put(url, data);
        return response.data;
    }
};

export default Request;
