import LabelForm from '@/components/LabelForm';
import DepartmentService from '@/services/department.service';
import PersonnelService from '@/services/personnel.service';
import { Button, DatePicker, Form, Input, message, Radio, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

const BasicInfoForm = (props: any) => {
  const [form] = Form.useForm();
  const [isCertificate, setIsCertificate] = useState<boolean | undefined>(true);

  const divisionState = useAsync(async () => {
    return await DepartmentService.fetchDepartmentList({});
  }, []);

  useEffect(() => {
    if (props.data) {
      // 转换日期格式
      const formData = {
        ...props.data,
        birthday: props.data.birthday ? dayjs(props.data.birthday) : undefined,
        graduateDate: props.data.graduateDate ? dayjs(props.data.graduateDate) : undefined,
        entryDate: props.data.entryDate ? dayjs(props.data.entryDate) : undefined,
      };
      form.setFieldsValue(formData);
    }
  }, [props.data]);

  const [state, doFetch] = useAsyncFn(async () => {
    const values = await form.validateFields();
    try {
      // 转换日期格式
      const submitData = {
        ...values,
        birthday: values.birthday
          ? dayjs(values.birthday).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          : undefined,
        graduateDate: values.graduateDate
          ? dayjs(values.graduateDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          : undefined,
        entryDate: values.entryDate
          ? dayjs(values.entryDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          : undefined,
      };

      if (props.type === 'create') {
        await PersonnelService.createPersonnel(submitData);
      } else {
        await PersonnelService.updatePersonnel({ ...props.data, ...submitData });
      }
      props.onNext(form.getFieldValue('isCertificate'));
      props.getUserName(submitData.userName);
    } catch (error) {
      message.error('保存失败');
    }
  }, [form]);

  const roleState = useAsync(async () => {
    return await PersonnelService.getRoleList();
  }, []);

  const regionState = useAsync(async () => {
    return await PersonnelService.getRegionList();
  }, []);

  const formlist = [
    { label: '真实姓名', name: 'realName', required: true },
    { label: '登录账号', name: 'userName', required: true },
    { label: '初始密码', name: 'password', required: true, children: <Input.Password /> },
    {
      label: '手机号',
      name: 'contact',
      required: true,
      children: <Input placeholder="请输入手机号" />,
    },
    {
      label: '地区',
      name: 'region',
      required: true,
      initialValue: '全国',
      children: (
        <Select
          options={Object.entries(regionState.value || {}).map(([key, value]) => ({
            label: key,
            value,
          }))}
        />
      ),
    },
    {
      label: '部门',
      name: 'division',
      required: true,
      children: (
        <Select
          options={divisionState.value?.map((item: any) => ({
            label: item.divisionName,
            value: item.divisionName,
          }))}
        />
      ),
    },
    {
      label: '性别',
      name: 'gender',
      children: (
        <Radio.Group>
          <Radio value="男">男</Radio>
          <Radio value="女">女</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '出生年月',
      name: 'birthday',
      children: <DatePicker picker="month" style={{ width: '100%' }} />,
    },
    { label: '毕业学校', name: 'graduateCollege' },
    {
      label: '毕业时间',
      name: 'graduateDate',
      children: <DatePicker picker="month" style={{ width: '100%' }} />,
    },
    {
      label: '员工类别',
      name: 'role',
      required: true,
      children: (
        <Select
          allowClear
          options={roleState.value?.map((item: any) => ({ label: item, value: item }))}
        />
      ),
    },
    {
      label: '员工等级',
      name: 'rank',
      children: (
        <Radio.Group
          options={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
          ]}
        />
      ),
    },
    { label: '入职时间', name: 'entryDate', children: <DatePicker style={{ width: '100%' }} /> },
    {
      label: '是否是持证人员',
      required: true,
      rules: [{ required: true, message: '请选择是否是持证人员' }],
      name: 'isCertificate',
      initialValue: true,
      children: (
        <Radio.Group
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          onChange={e => {
            setIsCertificate(e.target.value);
          }}
        />
      ),
    },
  ];

  return (
    <>
      {divisionState.value && (roleState.value || props.type === 'create') && (
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
            <Button type="primary" onClick={doFetch} loading={state.loading}>
              {isCertificate
                ? '保存并跳转到 「 持证人员证书管理 」'
                : '保存并跳转到 「 工资和社保管理 」'}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default BasicInfoForm;
