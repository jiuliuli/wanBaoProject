import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import PATH_ENUM from '@/components/routes/path';
import { PROJECT_SOURCE_TYPE_TEXT } from '@/constants/project.constants';
import IndustryService from '@/services/industry.service';
import ProjectManagementService from '@/services/project-management.service';
import { getSelectOptions } from '@/utils/format';
import { useNavigate } from '@umijs/max';
import { Button, DatePicker, Input, InputNumber, message, Radio, Select, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

export default function ProjecEditInfo() {
  const [form] = useForm();
  const navigate = useNavigate();
  const [dayCount, setDayCount] = useState(0);
  const userInfo = localStorage.getItem('userInfo');

  const industryTypeOptions = useAsync(async () => {
    return await IndustryService.fetchIndustryList();
  });

  const evaluateTypeOptions = useAsync(async () => {
    return await ProjectManagementService.fetchEvaluateTypeList();
  });

  const percentState = useAsync(async () => {
    return await ProjectManagementService.fetchPercent();
  });

  useEffect(() => {
    setDayCount(percentState.value?.find((item: any) => item.item === '平均日工资').value);
  }, [percentState.value]);

  const [submitState, doFetch] = useAsyncFn(async values => {
    values.establisher = JSON.parse(userInfo || '{}').userName;
    try {
      await ProjectManagementService.createProject(values);
      message.success('新建项目信息成功');
      navigate(PATH_ENUM.MARKET_PROJECTS_LIST);
    } catch (error) {
      message.error('新建项目失败');
    }

    // navigate('?tab=ProjectBudgetEditInfo');
  });

  const formlist: LabelFormItem[] = [
    { label: '项目名称', name: 'projectName' },
    { label: '项目简称', name: 'shortName' },
    { label: '客户名称', name: 'customerName' },
    { label: '项目所在地址', name: 'address' },
    {
      label: '市场类型',
      name: 'source',
      children: <Select options={getSelectOptions(PROJECT_SOURCE_TYPE_TEXT)} />,
    },
    {
      label: '所属行业',
      name: 'industryType',
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
      children: (
        <Select
          options={evaluateTypeOptions.value?.map((item: any) => ({ label: item, value: item }))}
        />
      ),
    },
    {
      label: '是否法定评价',
      name: 'highRisk',
      children: (
        <Radio.Group
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
        />
      ),
    },
    { label: '立项人', name: 'establisher' },
    {
      label: '合同额',
      name: 'amount',
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
      children: (
        <Radio.Group
          options={[
            { label: '紧急', value: '紧急' },
            { label: '重要', value: '重要' },
            { label: '普通', value: '普通' },
          ]}
        />
      ),
    },
    {
      label: '需要送审的管理部门',
      name: 'bureau',
      children: <Input placeholder="请输入需要送审的应急管理局,多个以逗号隔开" />,
    },
    { label: '项目描述', name: 'describe' },
    { label: '公司信誉', name: 'companyVenture' },
    { label: '周边环境', name: 'environment' },
    {
      label: '是否外聘专家',
      name: 'expert',
      children: (
        <Radio.Group
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
        />
      ),
    },
    {
      label: '项目规模',
      name: 'projectScale',
      children: (
        <Radio.Group
          options={[
            { label: '大', value: '大' },
            { label: '中', value: '中' },
            { label: '小', value: '小' },
          ]}
        />
      ),
    },
    {
      label: '技术风险',
      name: 'technicalVenture',
      children: (
        <Radio.Group
          options={[
            { label: '高', value: '高' },
            { label: '中', value: '中' },
            { label: '低', value: '低' },
          ]}
        />
      ),
    },
    { label: '主要风险', name: 'mainVenture' },
    { label: '风险因素', name: 'ventureFactor' },
    { label: '差旅费', name: 'travelFee', children: <InputNumber /> },
    { label: '打印装订费', name: 'printFee', children: <InputNumber /> },
    { label: '招待费', name: 'entertainFee', children: <InputNumber /> },
    { label: '渠道费', name: 'channelFee', children: <InputNumber /> },
    {
      label: '工时',
      name: 'taskDays',
      children: (
        <InputNumber
          onChange={(value: any) => form.setFieldsValue({ compileCost: value * dayCount })}
        />
      ),
    },
    { label: '编制成本', name: 'compileCost', children: <InputNumber disabled /> },
    { label: '委外成本', name: 'delegateCost', children: <InputNumber /> },
    { label: '分摊成本', name: 'apportionFee', children: <InputNumber /> },
    { label: '市场提成', name: 'marketCommission', children: <InputNumber /> },
    { label: '技术提成', name: 'technicalCommission', children: <InputNumber /> },
    {
      label: '审核人审核费',
      name: 'firstAudit',
      children: <InputNumber disabled />,
    },
    {
      label: '技术负责人审核费',
      name: 'techAudit',
      children: <InputNumber disabled />,
    },
    {
      label: '项目负责人审核费',
      name: 'projectAudit',
      children: <InputNumber disabled />,
    },
    { label: '评审费', name: 'reviewAudit', children: <InputNumber /> },
    { label: '签字费', name: 'signFee', children: <InputNumber /> },
    { label: '公司协助发生的费用', name: 'cooperateFee', children: <InputNumber /> },
    { label: '增值税费', name: 'taxFee', children: <InputNumber /> },
    { label: '其他费用', name: 'otherFee', children: <InputNumber /> },
    {
      label: '前期文件',
      name: 'report',
      children: (
        <Upload
          action="/v1/multipleFileUpload"
          multiple
          maxCount={10}
          listType="text"
          onChange={({ file }) => {
            if (file.status === 'done') {
              message.success(`${file.name} 上传成功`);
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
    <div>
      {!percentState.loading && (
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
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Button type="primary" onClick={() => form.submit()} loading={submitState.loading}>
              保存项目
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
