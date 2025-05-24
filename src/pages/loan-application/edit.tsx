import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import PATH_ENUM from '@/components/routes/path';
import LoanApplicationService from '@/services/loanApplication.service';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Button, DatePicker, Form, Input, InputNumber, message, Radio, Space, Upload } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

export default function LoanApplicationEdit() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [type, setType] = useState<string>();
  const navigate = useNavigate();
  const loanApplicationState = useAsync(async () => {
    if (id) {
      return await LoanApplicationService.fetchLoanApplicationById(id);
    }
  }, [id]);

  useEffect(() => {
    if (id && loanApplicationState.value) {
      const formData = { ...loanApplicationState.value[0] };
      if (formData.payTime) {
        formData.payTime = dayjs(formData.payTime);
      }
      if (formData.returnTime) {
        formData.returnTime = dayjs(formData.returnTime);
      }
      form.setFieldsValue(formData);
      setType('edit');
    } else {
      setType('create');
    }
  }, [id, form, loanApplicationState.value, type]);

  const [submitState, doFetch] = useAsyncFn(
    async values => {
      if (type === 'edit') {
        values.loanNumber = id;
      }
      try {
        if (type === 'edit') {
          await LoanApplicationService.updateLoanApplication({
            ...loanApplicationState.value[0],
            ...values,
          });
        } else {
          await LoanApplicationService.createLoanApplication(values);
        }
        message.success('提交成功');
        navigate(PATH_ENUM.LOAN_APPLICATION);
      } catch (error) {
        message.error('提交失败');
      }
    },
    [type],
  );

  const formlist: LabelFormItem[] = [
    {
      label: '申请人',
      name: 'maker',
      initialValue: JSON.parse(localStorage.getItem('userInfo') || '{}').userName,
      children: <Input disabled />,
    },
    {
      label: '借款人',
      name: 'debtor',
      initialValue: JSON.parse(localStorage.getItem('userInfo') || '{}').userName,
      children: <Input />,
    },
    {
      label: '借款事由',
      name: 'purpose',
      children: <Input.TextArea />,
    },
    {
      label: '借款金额',
      name: 'amount',
      children: <InputNumber addonAfter="元" />,
    },
    {
      label: '计划借款时间',
      name: 'payTime',
      children: <DatePicker format="YYYY-MM-DD" />,
    },
    {
      label: '计划还款时间',
      name: 'returnTime',
      children: <DatePicker format="YYYY-MM-DD" />,
    },
    {
      label: '付款方式',
      name: 'payMode',
      children: (
        <Radio.Group
          options={[
            { label: '现金', value: '现金' },
            { label: '银行', value: '银行' },
          ]}
        />
      ),
    },
    {
      label: '借款人账户名',
      name: 'accountName',
    },
    {
      label: '借款人开户行',
      name: 'bankName',
    },
    {
      label: '借款人账号',
      name: 'accountNumber',
    },
    {
      label: '附件',
      name: 'attachment',
      children: (
        <Upload
          action="/v1/singleFileUpload"
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
      label: '其他说明',
      name: 'memo',
      required: false,
      rules: [{ required: false }],
      children: <Input.TextArea />,
    },
  ];

  return (
    <PageHeader
      title={id ? `编辑${id}` : '新建借款申请'}
      onBack={() => navigate(PATH_ENUM.LOAN_APPLICATION)}
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
          onClick={() => navigate(PATH_ENUM.LOAN_APPLICATION)}
        >
          取消
        </Button>
      </Space>

      {(type === 'create' || loanApplicationState.value) && (
        <LabelForm
          props={{
            form,
            onFinish: doFetch,
            labelCol: { span: 3 },
            wrapperCol: { span: 20 },
          }}
          formlist={formlist}
          defaultRules
        />
      )}
    </PageHeader>
  );
}
