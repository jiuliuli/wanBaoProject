// 运行时配置
import UserService from '@/services/user.service';
import { UserInfo } from '@/types/user.types';
import { history, RequestConfig } from '@umijs/max';


// 全局初始化数据配置，umi项目启动的时候，自动执行app.ts里的函数
export async function getInitialState(): Promise<{
  userInfo?: UserInfo | null;
  token?: string | null;
  fetchUserInfo?: () => Promise<UserInfo | null | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      // 添加延迟确保localStorage中的数据已更新
      const currentUser = UserService.getCurrentUser();
      return currentUser;
    } catch (error) {
      // 仅在非登录页面时重定向
      if (history.location.pathname !== '/login') {
        history.push('/login');
      }
      return undefined;
    }
  };

  // 如果是登录页面，也获取用户信息，但不执行重定向
  const currentUser = await fetchUserInfo();
  const token = localStorage.getItem('token');

  return {
    fetchUserInfo,
    userInfo: currentUser,
    token,
  };
}

// 请求拦截器
export const request: RequestConfig = {
  // 相应拦截器
  responseInterceptors: [
    async (response) => {
      return response;
    },
  ],
  // 请求拦截器
  requestInterceptors: [
    (url, options) => {
      const token = localStorage.getItem('token');
      const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
      };
      return { url, options: { ...options, headers } };
    },
  ],
};
