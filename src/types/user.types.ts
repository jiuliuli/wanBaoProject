
export interface LoginParams {
    username: string;
    password: string;
    remember?: boolean;
}

export interface UserInfo {
    userId: string;
    username: string;
    realName: string;
    avatar?: string;
    roles: string[];
    isAdmin?: boolean;
}