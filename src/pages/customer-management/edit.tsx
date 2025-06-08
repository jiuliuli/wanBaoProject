import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import PATH_ENUM from '@/components/routes/path';
import CustomerManagementService from '@/services/customer.service';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Button, DatePicker, Form, Input, message, Radio } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

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
      const formData = { ...customerState.value[0] };
      if (formData.registerDate) {
        formData.registerDate = dayjs(formData.registerDate);
      }
      form.setFieldsValue(formData);
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
      if (values.registerDate) {
        values.registerDate = values.registerDate.format('YYYY-MM-DD');
      }
      try {
        await form.validateFields();
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
      label: '企业名称',
      name: 'customerName',
    },
    {
      label: '统一社会信用代码',
      name: 'identification',
    },
    {
      label: '开票地址',
      name: 'invoiceAddress',
    },
    {
      label: '开户行',
      name: 'bankName',
    },
    {
      label: '账号',
      name: 'accountNumber',
    },
    {
      label: '财务电话',
      name: 'financialTel',
    },
    {
      label: '法定代表人',
      name: 'legalPerson',
    },
    {
      label: '注册地址',
      name: 'registerAddress',
    },
    {
      label: '邮寄地址',
      name: 'mailAddress',
    },
    {
      label: '公司电话',
      name: 'companyTel',
    },
    {
      label: '联系人',
      name: 'contactPerson',
      children: <Input placeholder="多个联系人以逗号分隔" />,
    },
    {
      label: '联系人电话',
      name: 'mobile',
      children: <Input placeholder="多个手机号以逗号分隔" />,
    },
    {
      label: '开票类型',
      name: 'invoiceType',
      initialValue: '增值税专用发票',
      children: <Radio.Group options={[{ label: '增值税专用发票', value: '增值税专用发票' }, { label: '增值税普通发票', value: '增值税普通发票' }]} />,
    },
    {
      label: '注册资本',
      name: 'registerCapital',
    },
    {
      label: '注册日期',
      name: 'registerDate',
      children: <DatePicker />,
    },
    {
      label: '创建人',
      name: 'establisher',
      rules: [{ required: true, message: '请输入创建人' }],
      initialValue: JSON.parse(localStorage.getItem('userInfo') || '{}').userName,
      children: <Input disabled />,
    },
  ];

  return (
    <PageHeader
      title={id ? `详情${id}` : '新建企业信息'}
      onBack={() => navigate(PATH_ENUM.CUSTOMER_MANAGEMENT)}
      style={{ background: '#ffffff' }}
    >
      {(customerState.value || type === 'create') && (
        <LabelForm
          props={{
            form,
            onFinish: doFetch,
            labelCol: { span: 3 },
            wrapperCol: { span: 20 },
          }}
          formlist={formlist}
          defaultRules={true}
        />
      )}
      <Button
        type="primary"
        loading={submitState.loading}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
        onClick={() => {
          doFetch(form.getFieldsValue());
        }}
      >
        保存当前详情
      </Button>
    </PageHeader>
  );
}
