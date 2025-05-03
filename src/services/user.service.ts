// 用户相关服务
import { LoginParams, UserInfo } from '@/types/user.types';
import { message } from 'antd';

const UserService = {
    // 登录
    login: async (params: LoginParams): Promise<UserInfo | null> => {
        // 实际项目中应该调用API
        if (params.username === 'admin' && params.password === '123456') {
            const userInfo: UserInfo = {
                userId: '1',
                username: 'admin',
                realName: '管理员',
                roles: ['admin'],
                isAdmin: true,
            };
            // 保存到本地存储
            localStorage.setItem('token', 'admin-token');
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            return userInfo;
        } else if (params.username === 'user' && params.password === '123456') {
            const userInfo: UserInfo = {
                userId: '2',
                username: 'user',
                realName: '普通用户',
                roles: ['user'],
                isAdmin: false,
            };
            localStorage.setItem('token', 'user-token');
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            return userInfo;
        } else {
            message.error('用户名或密码错误');
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
        return !!localStorage.getItem('token');
    }
};

export default UserService; 