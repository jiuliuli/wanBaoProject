import LabelForm from '@/components/LabelForm';
import PATH_ENUM from '@/components/routes/path';
import PersonnelService from '@/services/personnel.service';
import { useNavigate } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

type SalarySocialFormProps = {
  userName: string;
}

const SalarySocialForm = ({ userName }: SalarySocialFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(userName === JSON.parse(localStorage.getItem('userInfo') || '{}').userName);

  const salarySocialState = useAsync(async () => {
    if (!userName) return;
    return await PersonnelService.getSalarySocialById(userName);
  }, [userName]);

  useEffect(() => {
    if (salarySocialState.value) {
      form.setFieldsValue({ ...salarySocialState.value[0] });
    }
  }, [salarySocialState.value]);



  const [state, doFetch] = useAsyncFn(async () => {
    const values = await form.validateFields();
    try {
      await PersonnelService.updateSalarySocial(values);
      message.success('保存成功');
      navigate(PATH_ENUM.PERSONNEL_MANAGEMENT);
    } catch (error) {
      message.error('保存失败');
    }
  }, [form]);

  const formlist = [
    { label: '姓名', name: 'userName', required: true, initialValue: userName, children: <Input disabled /> },
    { label: '基本工资', name: 'baseSalary', children: <Input /> },
    { label: '证书津贴', name: 'certificateAllowance', children: <Input /> },
    { label: '职称津贴', name: 'titleAllowance', children: <Input /> },
    { label: '专业津贴', name: 'majorAllowance', children: <Input /> },
    { label: '绩效工资', name: 'performance', children: <Input /> },
    { label: '社保基数', name: 'socialSecurity', children: <Input /> },
    { label: '公积金', name: 'providentFund', children: <Input /> },
    { label: '自费公积金', name: 'selfFund', children: <Input /> },
  ];
  return (
    <>
      <LabelForm
        props={{
          form,
          onFinish: doFetch,
          labelCol: { span: 3 },
          wrapperCol: { span: 20 },
        }}
        formlist={formlist}
      />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button
          type="primary"
          onClick={doFetch}
          loading={state.loading}
          style={{ marginRight: '20px' }}
          disabled={disabled}
        >
          保存
        </Button>
      </div>
    </>
  )
}

export default SalarySocialForm;
