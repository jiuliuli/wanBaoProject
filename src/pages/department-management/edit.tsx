import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import PATH_ENUM from '@/components/routes/path';
import DepartmentService from '@/services/department.service';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Button, Form, message, Space, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

export default function DepartmentManagementEdit() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [type, setType] = useState<string>();
    const navigate = useNavigate();
    const departmentState = useAsync(async () => {
        if (id) {
            return await DepartmentService.fetchDepartmentById(id);
        }
    }, [id]);

    useEffect(() => {
        if (id && departmentState.value) {
            form.setFieldsValue(departmentState.value);
            setType('edit');
        } else {
            setType('create');
        }
    }, [id, form, departmentState.value, type]);

    const [submitState, doFetch] = useAsyncFn(
        async values => {
            values.valid = values.valid ? "可用" : "禁用";
            try {
                await form.validateFields();
                if (type === 'edit') {
                    await DepartmentService.updateDepartment(values);
                } else {
                    await DepartmentService.createDepartment(values);
                }
                message.success(type === 'edit' ? '更新部门信息成功' : '新建部门信息成功');
                navigate(PATH_ENUM.DEPARTMENT_MANAGEMENT);
            } catch (error: any) {
                if (error.errorFields) {
                    message.error('请填写必填项');
                } else {
                    message.error(type === 'edit' ? '更新部门信息失败' : '新建部门信息失败');
                }
            }
        },
        [type],
    );

    const formlist: LabelFormItem[] = [
        {
            label: '部门名称',
            name: 'divisionName',
        },
        {
            label: '是否可用',
            name: 'valid',
            children: <Switch
                checkedChildren="可用"
                unCheckedChildren="禁用"
            />
        },
        {
            label: '备注',
            name: 'memo',
        },
    ];

    return (
        <PageHeader
            title={id ? `编辑${id}` : '新建部门信息'}
            onBack={() => navigate(PATH_ENUM.DEPARTMENT_MANAGEMENT)}
            style={{ background: '#ffffff' }}
        >
            <Space>
                <Button
                    type="primary"
                    loading={submitState.loading}
                    style={{
                        marginBottom: 20,
                        marginRight: 10,
                    }}
                    onClick={() => {
                        doFetch(form.getFieldsValue());
                    }}
                >
                    保存当前编辑
                </Button>

                <Button
                    style={{
                        marginBottom: 20,
                        marginRight: 10,
                    }}
                    onClick={() => navigate(PATH_ENUM.DEPARTMENT_MANAGEMENT)}
                >
                    取消
                </Button>
            </Space>

            {(type === 'create' || departmentState.value) && (
                <LabelForm
                    props={{
                        form,
                        onFinish: doFetch,
                        labelCol: { span: 3 },
                        wrapperCol: { span: 20 },
                    }}
                    formlist={formlist}
                />
            )}
        </PageHeader>
    );
}
