import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import PATH_ENUM from '@/components/routes/path';
import DepartmentService from '@/services/department.service';
import SalaryManagementService from '@/services/salary.service';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

export default function SalaryDistributionEdit() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [type, setType] = useState<string>();

    const navigate = useNavigate();
    const salaryState = useAsync(async () => {
        if (id) {
            return await SalaryManagementService.fetchSalaryById(id);
        }
    }, [id]);

    const divisionListState = useAsync(async () => {
        return await DepartmentService.fetchDepartmentList({});
    }, []);

    useEffect(() => {
        if (salaryState.value && salaryState.value.length > 0) {
            const formData = { ...salaryState.value[0] };
            if (formData.payDate) {
                formData.payDate = dayjs(formData.payDate);
            }
            form.setFieldsValue(formData);
            setType('edit');
        } else {
            setType('create');
        }
    }, [salaryState.value, id, form]);

    const [submitState, doFetch] = useAsyncFn(
        async values => {
            if (type === 'edit') {
                values.userName = id;
                values.id = salaryState.value[0].id;
            }

            try {
                if (type === 'edit') {
                    await SalaryManagementService.updateSalary(values);
                } else {
                    await SalaryManagementService.createSalary(values);
                }
                message.success(type === 'edit' ? '更新工资记录成功' : '新建工资记录成功');
                navigate(PATH_ENUM.SALARY_DISTRIBUTION);
            } catch (error) {
                message.error(type === 'edit' ? '更新工资记录失败' : '新建工资记录失败');
            }
        },
        [type],
    );

    const formlist: LabelFormItem[] = [
        {
            label: '发放时间',
            name: 'payDate',
            required: true,
            rules: [{ required: true, message: '请选择发放时间' }],
            children: <DatePicker />,
        },
        {
            label: '基本工资',
            name: 'basicWage',
            required: true,
            rules: [{ required: true, message: '请输入基本工资' }],
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '职务津贴',
            name: 'jobAllowance',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '绩效工资',
            name: 'performance',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '提成',
            name: 'commission',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '餐补',
            name: 'mealSubsidy',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '税前补贴',
            name: 'pretaxSubsidy',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '税前扣除',
            name: 'pretaxDeduction',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '税前工资',
            name: 'pretaxSalary',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '社保',
            name: 'socialSecurity',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '公积金',
            name: 'providentFund',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '其他扣款',
            name: 'otherDeduction',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '其他补贴',
            name: 'otherSubsidy',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '税款',
            name: 'selfTax',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '实发工资',
            name: 'actualSalary',
            children: <InputNumber addonAfter="元" />,
        },
        {
            label: '备注',
            name: 'memo',
            children: <Input.TextArea />,
        },
        {
            label: '部门',
            name: 'division',
            children: (
                <Select
                    options={
                        divisionListState.value?.map((item: any) => ({
                            label: item.divisionName,
                            value: item.divisionName,
                        })) || []
                    }
                />
            ),
        },
    ];

    return (
        <PageHeader
            title={id ? `详情${id}` : '新建工资记录'}
            onBack={() => navigate(PATH_ENUM.SALARY_DISTRIBUTION)}
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
                        form
                            .validateFields()
                            .then(values => {
                                doFetch(values);
                            })
                            .catch(error => {
                                console.log('表单验证失败:', error);
                            });
                    }}
                >
                    保存当前编辑
                </Button>

                <Button
                    style={{
                        marginBottom: 20,
                        marginRight: 10,
                    }}
                    onClick={() => navigate(PATH_ENUM.SALARY_DISTRIBUTION)}
                >
                    取消
                </Button>
            </Space>

            <LabelForm
                props={{
                    form,
                    onFinish: doFetch,
                    labelCol: { span: 3 },
                    wrapperCol: { span: 20 },
                }}
                formlist={formlist}
            />
        </PageHeader>
    );
}
