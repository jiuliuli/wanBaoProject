import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import PATH_ENUM from '@/components/routes/path';
import { ContractService } from '@/services/ContractService';
import DepartmentService from '@/services/department.service';
import PersonnelService from '@/services/personnel.service';
import ProjectManagementService from '@/services/project-management.service';
import RevenueManagementService from '@/services/revenue.service';
import { PageHeader } from '@ant-design/pro-components';
import { useModel, useNavigate, useParams } from '@umijs/max';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Radio,
    Select,
    Space,
    Upload,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

export default function RevenueManagementEdit() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [type, setType] = useState<string>();
    const { initialState } = useModel('@@initialState');
    const userInfo = initialState?.userInfo;

    const navigate = useNavigate();
    const revenueState = useAsync(async () => {
        if (id) {
            return await RevenueManagementService.fetchRevenueById(id);
        }
    }, [id]);

    const staffListState = useAsync(async () => {
        return await PersonnelService.fetchPersonnelList({});
    });

    const contractListState = useAsync(async () => {
        return await ContractService.getContractList();
    });

    const projectListState = useAsync(async () => {
        return await ProjectManagementService.fetchProjectList({ finished: false });
    });

    const divisionListState = useAsync(async () => {
        return await DepartmentService.fetchDepartmentList({});
    });

    useEffect(() => {
        if (id && revenueState.value) {
            const formData = { ...revenueState.value[0] };
            if (formData.revenueTime) {
                formData.revenueTime = dayjs(formData.revenueTime);
            }
            if (formData.invoiceTime) {
                formData.invoiceTime = dayjs(formData.invoiceTime);
            }
            form.setFieldsValue(formData);
            setType('edit');
        } else {
            setType('create');
        }
    }, [id, form, revenueState.value]);

    const [submitState, doFetch] = useAsyncFn(
        async values => {
            const submitData = { ...values };
            if (type === 'edit') {
                submitData.revenueNumber = id;
                Object.assign(revenueState.value[0], submitData);
            }

            try {
                if (type === 'edit') {
                    await RevenueManagementService.updateRevenue(submitData);
                } else {
                    await RevenueManagementService.createRevenue(submitData);
                }
                message.success(type === 'edit' ? '更新收款单成功' : '新建收款单成功');
                navigate(PATH_ENUM.REVENUE_MANAGEMENT);
            } catch (error) {
                message.error(type === 'edit' ? '更新收款单失败' : '新建收款单失败');
            }
        },
        [type],
    );

    const formlist: LabelFormItem[] = [
        {
            label: '标题',
            name: 'title',
            children: <Input placeholder="请输入标题" />,
        },
        {
            label: '执行人',
            name: 'operator',
            children: (
                <Select
                    showSearch
                    placeholder="请选择执行人"
                    optionFilterProp="children"
                    filterOption={(input: string, option: any) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={staffListState.value?.map((staff: any) => ({
                        value: staff.userName,
                        label: staff.userName,
                    }))}
                />
            ),
        },
        {
            label: '合同号',
            name: 'contractNumber',
            children: (
                <Select
                    showSearch
                    placeholder="请选择合同号"
                    optionFilterProp="children"
                    filterOption={(input: string, option: any) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={contractListState.value?.map((contract: any) => ({
                        value: contract.contractNumber,
                        label: contract.contractNumber,
                    }))}
                />
            ),
        },
        {
            label: '尾款',
            name: 'phase',
            children: <Input />,
        },
        {
            label: '限定条件',
            name: 'qualification',
            children: <Input placeholder="请输入限定条件" />,
        },
        {
            label: '到账金额',
            name: 'payment',
            children: <InputNumber style={{ width: '200px' }} suffix="元" />,
        },
        {
            label: '总金额',
            name: 'amount',
            children: <InputNumber style={{ width: '200px' }} suffix="元" />,
        },
        {
            label: '合同付款时间',
            name: 'revenueTime',
            children: <DatePicker />,
        },
        {
            label: '收款方式',
            name: 'revenueMode',
            initialValue: '转账',
            children: <Radio.Group options={['现金', '转账', '承兑', '支票']} />,
        },
        {
            label: '到款状态',
            name: 'receive',
            initialValue: '未到款',
            children: <Radio.Group options={['已到款', '未到款']} />,
        },
        {
            label: '开票时间',
            name: 'invoiceTime',
            children: <DatePicker />,
        },
        {
            label: '发票状态',
            name: 'invoice',
            initialValue: '未开发票',
            children: <Radio.Group options={['已开发票', '未开发票']} />,
        },
        {
            label: '附件',
            name: 'attachment',
            children: (
                <Upload
                    action={`/v1/singleFileUpload?token=${userInfo?.userName}`}
                    listType="text"
                    onChange={({ file }) => {
                        if (file.status === 'done') {
                            message.success(`${file.name} 上传成功`);
                            form.setFieldsValue({
                                attachment: file.response.data,
                            });
                        } else if (file.status === 'error') {
                            message.error(`${file.name} 上传失败`);
                        }
                    }}
                >
                    <Button>点击上传</Button>
                </Upload>
            ),
        },
        {
            label: '备注',
            name: 'memo',
            children: <Input.TextArea placeholder="请输入备注" />,
        },
    ];

    return (
        <PageHeader
            title={id ? `详情${id}` : '新建收款单'}
            onBack={() => navigate(PATH_ENUM.REVENUE_MANAGEMENT)}
            style={{ background: '#ffffff' }}
        >
            <Space>
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            </div>
        </PageHeader>
    );
}
