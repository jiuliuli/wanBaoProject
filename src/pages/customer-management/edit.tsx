import LabelForm from "@/components/LabelForm";
import { LabelFormItem } from "@/components/LabelForm/types";
import PATH_ENUM from "@/components/routes/path";
import { INVOICE_TYPE_TEXT } from "@/constants/customer.constants";
import { INDUSTRY_TYPE_TEXT } from "@/constants/project.constants";
import CustomerManagementService from "@/services/customer.service";
import { getSelectOptions } from "@/utils/format";
import { PageHeader } from "@ant-design/pro-components";
import { useNavigate, useParams } from "@umijs/max";
import { Button, DatePicker, Form, Input, message, Radio, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useAsync, useAsyncFn } from "react-use";

export default function CustomerManagementEdit() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [type, setType] = useState<string>();
    const navigate = useNavigate();
    const customerState = useAsync(async () => {
        if (id) {
            return await CustomerManagementService.fetchCustomerById(id);
        }
    }, [id]);

    useEffect(() => {
        if (id && customerState.value) {
            form.setFieldsValue(customerState.value);
            setType('edit');
        } else {
            setType('create');
        }
    }, [id, form, customerState.value]);

    const [submitState, doFetch] = useAsyncFn(
        async values => {
            if (type === 'edit') {
                values.id = Number(id);
            }
            try {
                if (type === 'edit') {
                    await CustomerManagementService.updateCustomer(values);
                } else {
                    await CustomerManagementService.createCustomer(values);
                }
                message.success(type === 'edit' ? '更新客户信息成功' : '新建客户信息成功');
                navigate(PATH_ENUM.CUSTOMER_MANAGEMENT);
            } catch (error) {
                message.error(type === 'edit' ? '更新客户信息失败' : '新建客户信息失败');
            }
        },
        [type],
    );

    const formlist: LabelFormItem[] = [
        {
            label: '客户名称',
            name: 'customer_name',
            required: true,
        },
        {
            label: "纳税人识别号",
            name: "identification",
            required: true,
        },
        {
            label: "行业类型",
            name: "industry_type",
            required: true,
            children: <Select options={getSelectOptions(INDUSTRY_TYPE_TEXT)} />
        },
        {
            label: "法人",
            name: "legal_person",
            required: true,
        },
        {
            label: "公司地址",
            name: "registered_address",
            required: true,
        },
        {
            label: "邮件地址",
            name: "mail_address",
            required: true,
        },
        {
            label: "发票地址",
            name: "invoice_address",
            required: true,
        },
        {
            label: "公司电话",
            name: "company_tel",
            required: true,
        },
        {
            label: "联系人",
            name: "contact_person",
            required: true,
            children: <Input placeholder="多个联系人以逗号分隔" />
        },
        {
            label: "mobile",
            name: "mobile",
            required: true,
            children: <Input placeholder="多个手机号以逗号分隔" />
        },
        {
            label: "发票类型",
            name: "invoice_type",
            required: true,
            children: <Radio.Group options={getSelectOptions(INVOICE_TYPE_TEXT)} />
        },
        {
            label: "银行名称",
            name: "bank_name",
            required: true,
        },
        {
            label: "银行账号",
            name: "account_number",
            required: true,
        },
        {
            label: "金融电话",
            name: "financial_tel",
            required: true,
        },
        {
            label: "注册资本",
            name: "register_capital",
            required: true,
        },
        {
            label: "注册时间",
            name: "register_date",
            required: true,
            children: <DatePicker />
        },
    ];

    return (
        <PageHeader
            title={id ? `编辑${id}` : '新建客户信息'}
            onBack={() => navigate(PATH_ENUM.CUSTOMER_MANAGEMENT)}
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
                    onClick={() => navigate(PATH_ENUM.CUSTOMER_MANAGEMENT)}
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
        </PageHeader >
    )
}