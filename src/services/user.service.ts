// 用户相关服务
import { LoginParams, UserInfo } from '@/types/user.types';
import { message } from 'antd';
import Request from './request';

const UserService = {
  login: async (params: LoginParams): Promise<UserInfo | null> => {
    const url = `/v1/login`;
    try {
      const response = await Request.post(url, {
        userName: params.userName,
        password: params.password,
      });

      if (response.code === 202) {
        const userInfo: UserInfo = {
          userName: params.userName,
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        return userInfo;
      } else {
        message.error(response.message || '登录失败');
        return null;
      }
    } catch (error) {
      message.error('登录请求失败，请稍后重试');
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  },

  getCurrentUser: (): UserInfo | null => {
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      try {
        return JSON.parse(userInfoStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  // 检查是否已登录
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('userInfo');
  },

  resetPassword: async (params: { userName: string; oldPassword: string; newPassword: string }): Promise<boolean> => {
    const url = `/v1/changePassword`;
    return Request.put(url, {
      userName: params.userName,
      password: params.oldPassword,
      power: params.newPassword,
    }).then(res => res.data);
  }

};

export default UserService;
