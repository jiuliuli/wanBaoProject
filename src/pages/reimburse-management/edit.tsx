import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import PATH_ENUM from '@/components/routes/path';
import ProjectManagementService from '@/services/project-management.service';
import ReimburseManagementService from '@/services/reimburse-manage.service';
import { PageHeader } from '@ant-design/pro-components';
import { useModel, useNavigate, useParams } from '@umijs/max';
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Space, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

export default function ReimburseManagementEdit() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [type, setType] = useState<string>();
  const [projectOptions, setProjectOptions] = useState<{ label: string; value: string }[]>([]);
  const [projectCategory, setProjectCategory] = useState<{ label: string; value: string }[]>([]);
  const [nonProjectCategory, setNonProjectCategory] = useState<{ label: string; value: string }[]>(
    [],
  );
  const { initialState } = useModel('@@initialState');
  const userInfo = initialState?.userInfo;

  const navigate = useNavigate();
  const reimburseState = useAsync(async () => {
    if (id) {
      return await ReimburseManagementService.fetchReimburseById(id);
    }
  }, [id]);

  const categoryStatus = useAsync(async () => {
    return await ReimburseManagementService.fetchCategoryStatus();
  }, []);

  useEffect(() => {
    if (categoryStatus.value) {
      setProjectCategory(categoryStatus.value.filter((item: any) => item.startsWith('项目')));
      setNonProjectCategory(categoryStatus.value.filter((item: any) => item.startsWith('非项目')));
    }

    if (id && reimburseState.value) {
      const formData = { ...reimburseState.value[0] };
      if (formData.feeTime) {
        formData.feeTime = dayjs(formData.feeTime);
      }
      form.setFieldsValue(formData);
      setType('edit');
    } else {
      setType('create');
    }
  }, [id, form, reimburseState.value, categoryStatus.value]);

  const handleProjectSearch = async (id: string) => {
    if (id) {
      const result = await ProjectManagementService.fetchProjectById(id);
      const options = result.map((item: any) => ({
        label: `${item.projectNumber} - ${item.projectName}`,
        value: item.projectNumber,
        projectName: item.projectName,
      }));
      setProjectOptions(options);
    } else {
      setProjectOptions([]);
    }
  };

  const handleProjectSelect = (value: string, option: any) => {
    console.log(option);
    form.setFieldsValue({
      projectNumber: option.value,
      projectName: option.projectName,
    });
  };

  const [submitState, doFetch] = useAsyncFn(
    async values => {
      const submitData = { ...values };
      console.log('submitData', submitData);
      submitData.maker = userInfo?.userName;
      if (type === 'edit') {
        submitData.expenseNumber = id;
        submitData.status = reimburseState.value[0].status;
        Object.assign(reimburseState.value[0], submitData);
      } else {
        submitData.status = '进行中';
      }

      try {
        if (type === 'edit') {
          await ReimburseManagementService.updateReimburse(submitData);
        } else {
          await ReimburseManagementService.createReimburse(submitData);
        }
        message.success(type === 'edit' ? '更新报销单成功' : '新建报销单成功');
        navigate(PATH_ENUM.REIMBURSE_MANAGEMENT);
      } catch (error) {
        message.error(type === 'edit' ? '更新报销单失败' : '新建报销单失败');
      }
    },
    [type],
  );

  const formlist: LabelFormItem[] = [
    {
      label: '报销人',
      name: 'reimburser',
      initialValue: userInfo?.userName,
      children: <Input disabled />,
    },
    {
      label: '项目编号',
      name: 'projectNumber',
      children: (
        <Select
          allowClear
          showSearch
          placeholder="请输入项目编号"
          onSearch={handleProjectSearch}
          onChange={handleProjectSelect}
          options={projectOptions}
          filterOption={false}
        />
      ),
    },
    {
      name: 'projectName',
      hidden: true,
    },
    {
      label: '发生时间',
      name: 'feeTime',
      rules: [{ required: true, message: '请选择发生时间' }],
      children: <DatePicker format="YYYY-MM-DD" />,
    },
    {
      label: '报销金额',
      name: 'amount',
      rules: [{ required: true, message: '请输入报销金额' }],
      children: <InputNumber precision={2} />,
    },
    {
      label: '费用类型',
      required: true,
      rules: [{ required: true, message: '请选择费用类型' }],
      shouldUpdate: (prev, cur) => prev.projectNumber !== cur.projectNumber,
      children: form => {
        const projectNumber = form.getFieldValue('projectNumber');
        if (projectNumber) {
          return (
            <Form.Item
              noStyle
              name="category"
              rules={[{ required: true, message: '请选择费用类型' }]}
            >
              <Select
                options={projectCategory.map((item: any) => ({ label: item, value: item }))}
                placeholder="请选择费用类型"
              />
            </Form.Item>
          );
        } else {
          return (
            <Form.Item
              noStyle
              name="category"
              rules={[{ required: true, message: '请选择费用类型' }]}
            >
              <Select
                options={nonProjectCategory.map((item: any) => ({ label: item, value: item }))}
                placeholder="请选择费用类型"
              />
            </Form.Item>
          );
        }
      },
    },
    {
      label: '报销事由',
      name: 'purpose',
      rules: [{ required: true, message: '请输入报销事由' }],
      children: <TextArea />,
    },
    {
      label: '费用承担部门',
      rules: [{ required: true, message: '请选择费用承担部门' }],
      name: 'division',
    },
    {
      label: '备注',
      name: 'memo',
      children: <TextArea />,
    },
    {
      label: '收款人',
      name: 'accountName',
      rules: [{ required: true, message: '请输入收款人' }],
    },
    {
      label: '开户行',
      name: 'bankName',
      rules: [{ required: true, message: '请输入开户行' }],
    },
    {
      label: '账号',
      name: 'accountNumber',
      rules: [{ required: true, message: '请输入账号' }],
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
              console.log('file.response.data', file.response.data);
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
  ];

  return (
    <PageHeader
      title={id ? `编辑${id}` : '新建报销单'}
      onBack={() => navigate(PATH_ENUM.REIMBURSE_MANAGEMENT)}
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
          onClick={() => navigate(PATH_ENUM.REIMBURSE_MANAGEMENT)}
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
