import { message } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';

// 创建 axios 实例
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.request.use(
    (config: any) => {
        const token = JSON.parse(localStorage.getItem('userInfo') || '{}').userName;
        if (config.url?.includes('?')) {
            config.url = config.url + `&token=${token}`;
        } else {
            config.url = config.url + `?token=${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
// 添加响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            // 服务器返回了错误状态码
            const status = error.response.status;
            const errorMessage = error.response.data?.message || '请求失败';

            switch (status) {
                case 400:
                    message.error('请求参数错误');
                    break;
                case 401:
                    message.error('未授权，请重新登录');
                    break;
                case 403:
                    message.error('拒绝访问');
                    break;
                case 404:
                    message.error('请求的资源不存在');
                    break;
                case 500:
                    message.error('服务器错误');
                    break;
                default:
                    message.error(errorMessage);
            }
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            message.error('网络错误，请检查您的网络连接');
        } else {
            // 请求配置出错
            message.error('请求配置错误');
        }
        return Promise.reject(error);
    }
);

export const Request = {
    get: async (url: string, params?: any) => {
        const response = await instance.get(url, { params });
        return response.data;
    },
    post: async (url: string, data: any) => {
        const response = await instance.post(url, data);
        return response.data;
    },
    put: async (url: string, data: any) => {
        const response = await instance.put(url, data);
        return response.data;
    },
    delete: async (url: string) => {
        const response = await instance.delete(url);
        return response.data;
    },
    request: async (url: string, method: string, data?: any) => {
        const response = await instance({
            url,
            method,
            data,
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    },
};

export default Request;
