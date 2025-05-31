import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import IndustryService from '@/services/industry.service';
import ProjectManagementService from '@/services/project-management.service';
import { useModel } from '@umijs/max';
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Switch,
  Upload,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useAsync, useAsyncFn } from 'react-use';

type Props = {
  onFinish: (values: any) => void;
};

export default function ProjecEditInfo({ onFinish }: Props) {
  const [form] = useForm();
  const { initialState } = useModel('@@initialState');
  const userName = initialState?.userInfo?.userName || '用户';

  const industryTypeOptions = useAsync(async () => {
    return await IndustryService.fetchIndustryList();
  });

  const evaluateTypeOptions = useAsync(async () => {
    return await ProjectManagementService.fetchEvaluateTypeList();
  });

  const [submitState, doFetch] = useAsyncFn(async values => {
    values.status = '正常';
    values.progress = '创建';
    onFinish(values);
  });

  const formlist: LabelFormItem[] = [
    {
      label: '项目名称',
      name: 'projectName',
      rules: [{ required: true, message: '请输入项目名称' }],
    },
    {
      label: '项目简称',
      name: 'shortName',
      rules: [{ required: true, message: '请输入项目简称' }],
    },
    {
      label: '客户名称',
      name: 'customerName',
      rules: [{ required: true, message: '请输入客户名称' }],
    },
    {
      label: '市场类型',
      name: 'source',
      rules: [{ required: true, message: '请选择市场类型' }],
      initialValue: '自营',
      children: (
        <Radio.Group
          options={[
            { label: '自营', value: '自营' },
            { label: '合作', value: '合作' },
          ]}
        />
      ),
    },
    { label: '项目所在地址', name: 'address' },

    {
      label: '所属行业',
      name: 'industryType',
      rules: [{ required: true, message: '请选择所属行业' }],
      children: (
        <Select
          options={industryTypeOptions.value
            ?.map((item: any) => item.industryType)
            .map((item: any) => ({ label: item, value: item }))}
        />
      ),
    },
    {
      label: '项目类型',
      name: 'evaluateType',
      rules: [{ required: true, message: '请选择项目类型' }],
      children: (
        <Select
          options={evaluateTypeOptions.value?.map((item: any) => ({ label: item, value: item }))}
        />
      ),
    },
    {
      label: '是否法定评价',
      name: 'highRisk',
      initialValue: true,
      children: <Switch checkedChildren="是" unCheckedChildren="否" />,
    },
    {
      label: '市场人员',
      name: 'establisher',
      rules: [{ required: true, message: '请输入立项人' }],
      initialValue: userName,
      children: <Input disabled />,
    },
    {
      label: '前期文件',
      name: 'report',
      children: (
        <Upload
          action={`/v1/singleFileUpload?token=${userName}`}
          listType="text"
          onChange={({ file }) => {
            if (file.status === 'done') {
              message.success(`${file.name} 上传成功`);
              form.setFieldsValue({
                report: file.response.data,
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
      label: '送审稿数量',
      name: 'auditQuantity',
      children: <InputNumber />,
    },
    {
      label: '备案稿数量',
      name: 'backupQuanitit',
      children: <InputNumber />,
    },
    {
      label: '合同额',
      name: 'amount',
      rules: [{ required: true, message: '请输入合同额' }],
      children: (
        <InputNumber
          onChange={(value: any) =>
            form.setFieldsValue({
              firstAudit: value * 0.01,
              techAudit: value * 0.04,
              projectAudit: value * 0.05,
            })
          }
        />
      ),
    },
    { label: '完成时间', name: 'finishedTime', children: <DatePicker /> },
    {
      label: '紧急程度',
      name: 'rank',
      initialValue: '一般',
      children: (
        <Radio.Group
          options={[
            { label: '紧急', value: '紧急' },
            { label: '重要', value: '重要' },
            { label: '一般', value: '一般' },
          ]}
        />
      ),
    },
    {
      label: '送审的市级管理部门',
      name: 'cityBureau',
      children: <Input placeholder="请输入送审的市级管理部门" />,
    },
    {
      label: '送审的区级管理部门',
      name: 'districtBureau',
      children: <Input placeholder="请输入送审的区级管理部门" />,
    },
    { label: '项目描述', name: 'describe' },
    {
      label: '说明',
      name: 'explain',
      children: <TextArea placeholder="请输入说明" />,
    },
  ];

  return (
    <div>
      <LabelForm
        props={{
          form,
          onFinish: doFetch,
          labelCol: { span: 3 },
          wrapperCol: { span: 20 },
        }}
        formlist={formlist}
      />
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button type="primary" onClick={() => form.submit()} loading={submitState.loading}>
          保存项目基本信息
        </Button>
      </div>
    </div>
  );
}
