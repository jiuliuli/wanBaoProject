import UserService from '@/services/user.service';
import { LoginParams } from '@/types/user.types';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Alert, Button, Checkbox, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const { refresh } = useModel('@@initialState');

    useEffect(() => {
        // 如果已经登录，直接跳转到首页
        if (UserService.isLoggedIn()) {
            history.push('/');
        }
    }, []);

    const handleSubmit = async (values: LoginParams) => {
        setLoading(true);
        setLoginError('');
        try {
            const userInfo = await UserService.login(values);
            if (userInfo) {
                message.success('登录成功！');
                await refresh();
                history.push('/');
            } else {
                setLoginError('登录失败，请检查用户名和密码！');
            }
        } catch (error) {
            setLoginError('登录过程中发生错误，请稍后再试！');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>广州市万保职业安全事务有限公司管理系统</h1>
                    </div>
                </div>

                <div className={styles.main}>
                    {loginError && (
                        <Alert
                            message={loginError}
                            type="error"
                            showIcon
                            style={{ marginBottom: 24 }}
                        />
                    )}

                    <Form
                        form={form}
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="用户名: admin 或 user" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="密码: 123456"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.submitButton}
                                loading={loading}
                                size="large"
                                block
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage; 