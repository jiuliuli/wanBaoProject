import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import PATH_ENUM from '@/components/routes/path';
import {
  PROJECT_SOURCE_TYPE_TEXT,
  SCALE_TYPE_TEXT,
  VENTURE_FACTOR_TYPE_TEXT,
  VENTURE_TYPE_TEXT,
} from '@/constants/project.constants';
import ProjectManagementService from '@/services/project-management.service';
import { getSelectOptions } from '@/utils/format';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Button, DatePicker, Form, InputNumber, message, Radio, Select, Space, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

export default function ProjectManagementEdit() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [type, setType] = useState<string>();
  const navigate = useNavigate();
  const projectState = useAsync(async () => {
    if (id) {
      return await ProjectManagementService.fetchProjectById(id);
    }
  }, [id]);

  useEffect(() => {
    if (id && projectState.value) {
      form.setFieldsValue(projectState.value);
      setType('edit');
    } else {
      setType('create');
    }
  }, [id, form, projectState.value]);

  const [submitState, doFetch] = useAsyncFn(
    async values => {
      if (type === 'edit') {
        values.id = Number(id);
      }
      console.log('values', values);
      try {
        if (type === 'edit') {
          await ProjectManagementService.updateProject(values);
        } else {
          await ProjectManagementService.createProject(values);
        }
        message.success(type === 'edit' ? '更新项目成功' : '(市场)新建项目成功');
        navigate(PATH_ENUM.PROJECT_MANAGEMENT);
      } catch (error) {
        message.error(type === 'edit' ? '更新项目失败' : '(市场)新建项目失败');
      }
    },
    [type],
  );

  const formlist: LabelFormItem[] = [
    {
      label: '项目名称',
      name: 'project_name',
      required: true,
    },
    {
      label: '项目编号',
      name: 'project_number',
      required: true,
    },
    {
      label: '项目简称',
      name: 'short_name',
      required: true,
    },
    {
      label: '企业名称',
      name: 'customer_name',
      required: true,
    },
    {
      label: '项目来源',
      name: 'source',
      required: true,
      children: <Radio.Group options={getSelectOptions(PROJECT_SOURCE_TYPE_TEXT)} />,
    },
    {
      label: '业务类型',
      name: '',
    },
    {
      label: '项目类型',
    },
    {
      label: '投标项目',
    },
    {
      label: '投标保证金',
      name: 'bid_bond',
      children: <InputNumber />,
    },
    {
      label: '项目金额',
      name: 'amount',
      children: <InputNumber />,
    },
    {
      label: '项目初始资料', // 多个文档
    },
    {
      label: '送审应急部门',
      name: 'bureau',
    },
    {
      label: '项目地址',
      name: 'address',
    },
    {
      label: '项目工作内容',
      name: 'describe',
      children: <TextArea />,
    },
    {
      label: '项目风险评估',
      name: 'project_venture',
      children: <Radio.Group options={getSelectOptions(VENTURE_TYPE_TEXT)} />,
    },
    {
      label: '项目规模',
      name: 'scale',
      children: <Radio.Group options={getSelectOptions(SCALE_TYPE_TEXT)} />,
    },
    {
      label: '企业风险',
      name: 'company_venture',
      children: <Radio.Group options={getSelectOptions(VENTURE_TYPE_TEXT)} />,
    },
    {
      label: '技术风险',
      name: 'technical_venture',
      children: <Radio.Group options={getSelectOptions(VENTURE_TYPE_TEXT)} />,
    },
    {
      label: '外聘专家',
      name: 'expert',
      children: <Switch />,
    },
    {
      label: '计划完成日期',
      name: 'finished_time',
      children: <DatePicker />,
    },
    {
      label: '周边环境',
      name: 'environment',
      children: <TextArea />,
    },
    {
      label: '行业风险特性',
      name: 'industry_venture',
      children: <TextArea />,
    },
    {
      label: '危险因素',
      name: 'venture_factor',
      children: <Select mode="multiple" options={getSelectOptions(VENTURE_FACTOR_TYPE_TEXT)} />,
    },
  ];

  return (
    <PageHeader
      title={id ? `详情${id}` : '(市场)新建项目'}
      onBack={() => navigate(PATH_ENUM.PROJECT_MANAGEMENT)}
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
          保存当前详情
        </Button>

        <Button
          style={{
            marginBottom: 20,
            marginRight: 10,
          }}
          onClick={() => navigate(PATH_ENUM.PROJECT_MANAGEMENT)}
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
