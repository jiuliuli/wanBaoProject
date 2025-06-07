import PATH_ENUM from '@/components/routes/path';
import UserService from '@/services/user.service';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const ResetPassword: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [userName] = useState<string>(JSON.parse(localStorage.getItem('userInfo') || '{}').userName);

    const handleSubmit = async (values: any) => {
        try {
            const result = await UserService.resetPassword(values);
            message.success('密码修改成功！');
            navigate(PATH_ENUM.HOME);
        } catch (error) {
            message.error('密码修改失败，请重试！');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>修改密码</h1>
                    </div>
                </div>

                <div className={styles.main}>
                    <Form form={form} name="reset-password" onFinish={handleSubmit}>
                        <Form.Item
                            name="userName"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                            initialValue={userName}
                        >
                            <Input prefix={<UserOutlined />} placeholder="用户名" size="large" disabled />
                        </Form.Item>

                        <Form.Item
                            name="oldPassword"
                            rules={[{ required: true, message: '请输入旧密码!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="旧密码"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            rules={[
                                { required: true, message: '请输入新密码!' },
                                { min: 6, message: '密码长度不能小于6位!' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="新密码"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: '请确认新密码!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次输入的密码不一致!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="确认新密码"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.submitButton}
                                size="large"
                                block
                            >
                                确认修改
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;