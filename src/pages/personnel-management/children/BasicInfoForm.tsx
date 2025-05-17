import LabelForm from '@/components/LabelForm';
import PersonnelService from '@/services/personnel.service';
import { Button, DatePicker, Form, Input, message, Radio, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useAsync, useAsyncFn } from 'react-use';
const { Option } = Select;

const BasicInfoForm = (props: any) => {
  const [form] = Form.useForm();
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
      props.onNext(submitData);
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
    { label: '登录名', name: 'userName', required: true },
    { label: '初始密码', name: 'password', required: true, children: <Input.Password /> },
    {
      label: '地区',
      name: 'region',
      required: true,
      children: (
        <Select
          options={Object.entries(regionState.value || {}).map(([key, value]) => ({
            label: key,
            value,
          }))}
        />
      ),
    },
    { label: '部门', name: 'division', required: true },
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
      name: 'employeeLevel',
      children: (
        <Select>
          <Option value="1级">1级</Option>
          <Option value="2级">2级</Option>
          <Option value="3级">3级</Option>
          <Option value="4级">4级</Option>
        </Select>
      ),
    },
    { label: '入职时间', name: 'entryDate', children: <DatePicker style={{ width: '100%' }} /> },
    {
      label: '注安级别',
      name: 'rank',
      children: (
        <Select>
          <Option value="高级">高级</Option>
          <Option value="中级">中级</Option>
          <Option value="初级">初级</Option>
          <Option value="无">无</Option>
        </Select>
      ),
    },
    { label: '职称专业', name: 'titleMajor' },
  ];

  return (
    <>
      {(roleState.value || props.type === 'create') && (
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
              保存并执行下一步
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default BasicInfoForm;
