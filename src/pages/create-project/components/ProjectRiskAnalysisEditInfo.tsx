import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import { Button, Radio, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { useAsyncFn } from 'react-use';

type Props = {
  onFinish: (values: any) => void;
  createProjectButton: boolean;
};

export default function ProjectRiskAnalysisEditInfo({ onFinish, createProjectButton }: Props) {
  const [form] = useForm();

  const [submitState, doFetch] = useAsyncFn(async values => {
    onFinish(values);
  });

  const [createProjectButtonState, setCreateProjectButtonState] = useState<boolean>(createProjectButton);

  const formlist: LabelFormItem[] = [
    {
      label: '企业过往风险水平',
      name: 'companyVenture',
      initialValue: '中',
      children: (
        <Radio.Group
          options={[
            { label: '高', value: '高' },
            { label: '中', value: '中' },
            { label: '低', value: '低' },
            { label: '不清楚', value: '不清楚' },
          ]}
        />
      ),
    },
    {
      label: '企业信誉水平',
      name: 'companyReputation',
      initialValue: '中',
      children: (
        <Radio.Group
          options={[
            { label: '高', value: '高' },
            { label: '中', value: '中' },
            { label: '低', value: '低' },
            { label: '不清楚', value: '不清楚' },
          ]}
        />
      ),
    },
    {
      label: '行业风险特性',
      name: 'industryVenture',
      initialValue: '中',
      children: (
        <Radio.Group
          options={[
            { label: '高', value: '高' },
            { label: '中', value: '中' },
            { label: '低', value: '低' },
            { label: '不清楚', value: '不清楚' },
          ]}
        />
      ),
    },
    { label: '周边环境', name: 'environment' },
    {
      label: '是否在资质范围内',
      name: 'ifCredential',
      initialValue: true,
      children: <Switch checkedChildren="是" unCheckedChildren="否" />,
    },
    {
      label: '评价人员专业是否满足要求',
      name: 'ifEvaluator',
      initialValue: true,
      children: <Switch checkedChildren="是" unCheckedChildren="否" />,
    },
    {
      label: '项目是否有备案或核准',
      name: 'ifRecord',
      initialValue: '不需要',
      children: (
        <Radio.Group
          options={[
            { label: '有', value: '有' },
            { label: '否', value: '否' },
            { label: '不需要', value: '不需要' },
          ]}
        />
      ),
    },
    {
      label: '是否有可行性研究报告',
      name: 'ifAnalysis',
      initialValue: '不需要',
      children: (
        <Radio.Group
          options={[
            { label: '有', value: '有' },
            { label: '否', value: '否' },
            { label: '不需要', value: '不需要' },
          ]}
        />
      ),
    },
    {
      label: '是否有安全设施设计',
      name: 'ifSafety',
      initialValue: '不需要',
      children: (
        <Radio.Group
          options={[
            { label: '有', value: '有' },
            { label: '否', value: '否' },
            { label: '不需要', value: '不需要' },
          ]}
        />
      ),
    },
    {
      label: '如果存在问题企业是否可以配合',
      name: 'ifRectification',
      initialValue: true,
      children: <Switch checkedChildren="是" unCheckedChildren="否" />,
    },
    { label: '主要风险', name: 'mainVenture' },
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
        <Button type="primary" onClick={() => form.submit()} loading={submitState.loading} disabled={!createProjectButtonState}>
          保存新建项目
        </Button>
      </div>
    </div>
  );
}
