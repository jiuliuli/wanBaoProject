import IndustryService from '@/services/industry.service';
import ProjectManagementService from '@/services/project-management.service';
import { BasicInfoVO } from '@/types/project.types';
import { Button, DatePicker, Form, Input, InputNumber, message, Radio, Select, Upload } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useAsync } from 'react-use';

interface BasicInfoEditProps {
  data: BasicInfoVO;
  onSubmit: (values: any) => Promise<void>;
}

export default function BasicInfoEdit({ data, onSubmit }: BasicInfoEditProps) {
  const [form] = Form.useForm();
  const [userName] = useState<string>(localStorage.getItem('user') || '');

  const industryTypeOptions = useAsync(async () => {
    return await IndustryService.fetchIndustryList();
  });

  const evaluateTypeOptions = useAsync(async () => {
    return await ProjectManagementService.fetchEvaluateTypeList();
  });

  const handleSubmit = async (values: any) => {
    if (values.finishedTime) {
      values.finishedTime = dayjs(values.finishedTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    await onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      initialValues={{
        ...data,
        finishedTime: data.finishedTime ? dayjs(data.finishedTime) : undefined,
      }}
      onFinish={handleSubmit}
    >
      <div style={{ padding: '24px' }}>
        <Form.Item
          label="项目名称"
          name="projectName"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目简称"
          name="shortName"
          rules={[{ required: true, message: '请输入项目简称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="企业名称"
          name="customerName"
          rules={[{ required: true, message: '请输入企业名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目所在地址"
          name="address"
          rules={[{ required: true, message: '请输入项目地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="市场类型"
          name="source"
          rules={[{ required: true, message: '请选择市场类型' }]}
        >
          <Select
            options={[
              { label: '自营', value: '自营' },
              { label: '合作', value: '合作' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="所属行业"
          name="industryType"
          rules={[{ required: true, message: '请选择所属行业' }]}
        >
          <Select
            options={industryTypeOptions.value
              ?.map((item: any) => item.industryType)
              .map((item: any) => ({ label: item, value: item }))}
          />
        </Form.Item>
        <Form.Item
          label="项目类型"
          name="evaluateType"
          rules={[{ required: true, message: '请选择项目类型' }]}
        >
          <Select
            options={evaluateTypeOptions.value?.map((item: any) => ({
              label: item,
              value: item,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="是否法定评价"
          name="highRisk"
          rules={[{ required: true, message: '请选择是否法定评价' }]}
        >
          <Radio.Group
            options={[
              { label: '是', value: '是' },
              { label: '否', value: '否' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="立项人"
          name="establisher"
          rules={[{ required: true, message: '请输入立项人' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="合同额"
          name="amount"
          rules={[{ required: true, message: '请输入合同额' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            onChange={(value: any) =>
              form.setFieldsValue({
                firstAudit: value * 0.01,
                techAudit: value * 0.04,
                projectAudit: value * 0.05,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="完成时间"
          name="finishedTime"
          rules={[{ required: true, message: '请选择完成时间' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="紧急程度"
          name="rank"
          rules={[{ required: true, message: '请选择紧急程度' }]}
        >
          <Radio.Group
            options={[
              { label: '紧急', value: '紧急' },
              { label: '重要', value: '重要' },
              { label: '普通', value: '普通' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="需要送审市级管理部门"
          name="cityBureau"
          rules={[{ required: true, message: '请输入需要送审的市级管理部门' }]}
        >
          <Input placeholder="请输入需要送审的市级管理部门,多个以逗号隔开" />
        </Form.Item>
        <Form.Item
          label="需要送审区级管理部门"
          name="districtBureau"
          rules={[{ required: true, message: '请输入需要送审的区级管理部门' }]}
        >
          <Input placeholder="请输入需要送审的区级管理部门,多个以逗号隔开" />
        </Form.Item>
        <Form.Item
          label="项目描述"
          name="describe"
          rules={[{ required: true, message: '请输入项目描述' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="公司信誉"
          name="companyVenture"
          rules={[{ required: true, message: '请输入公司信誉' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="周边环境"
          name="environment"
          rules={[{ required: true, message: '请输入周边环境' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="是否外聘专家"
          name="expert"
          rules={[{ required: true, message: '请选择是否外聘专家' }]}
        >
          <Radio.Group
            options={[
              { label: '是', value: '是' },
              { label: '否', value: '否' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="项目规模"
          name="projectScale"
          rules={[{ required: true, message: '请选择项目规模' }]}
        >
          <Radio.Group
            options={[
              { label: '大', value: '大' },
              { label: '中', value: '中' },
              { label: '小', value: '小' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="技术风险"
          name="technicalVenture"
          rules={[{ required: true, message: '请选择技术风险' }]}
        >
          <Radio.Group
            options={[
              { label: '高', value: '高' },
              { label: '中', value: '中' },
              { label: '低', value: '低' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="主要风险"
          name="mainVenture"
          rules={[{ required: true, message: '请输入主要风险' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="风险因素"
          name="ventureFactor"
          rules={[{ required: true, message: '请输入风险因素' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="差旅费"
          name="travelFee"
          rules={[{ required: true, message: '请输入差旅费' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="打印装订费"
          name="printFee"
          rules={[{ required: true, message: '请输入打印装订费' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="招待费"
          name="entertainFee"
          rules={[{ required: true, message: '请输入招待费' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="渠道费"
          name="channelFee"
          rules={[{ required: true, message: '请输入渠道费' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="工时" name="taskDays" rules={[{ required: true, message: '请输入工时' }]}>
          <InputNumber
            style={{ width: '100%' }}
            onChange={(value: any) => form.setFieldsValue({ compileCost: value * 1000 })}
          />
        </Form.Item>
        <Form.Item
          label="编制成本"
          name="compileCost"
          rules={[{ required: true, message: '请输入编制成本' }]}
        >
          <InputNumber style={{ width: '100%' }} disabled />
        </Form.Item>
        <Form.Item
          label="委外成本"
          name="delegateCost"
          rules={[{ required: true, message: '请输入委外成本' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="分摊成本"
          name="apportionFee"
          rules={[{ required: true, message: '请输入分摊成本' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="市场提成"
          name="marketCommission"
          rules={[{ required: true, message: '请输入市场提成' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="技术提成"
          name="technicalCommission"
          rules={[{ required: true, message: '请输入技术提成' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="审核人审核费"
          name="firstAudit"
          rules={[{ required: true, message: '请输入审核人审核费' }]}
        >
          <InputNumber style={{ width: '100%' }} disabled />
        </Form.Item>
        <Form.Item
          label="技术负责人审核费"
          name="techAudit"
          rules={[{ required: true, message: '请输入技术负责人审核费' }]}
        >
          <InputNumber style={{ width: '100%' }} disabled />
        </Form.Item>
        <Form.Item
          label="项目负责人审核费"
          name="projectAudit"
          rules={[{ required: true, message: '请输入项目负责人审核费' }]}
        >
          <InputNumber style={{ width: '100%' }} disabled />
        </Form.Item>
        <Form.Item
          label="评审费"
          name="reviewAudit"
          rules={[{ required: true, message: '请输入评审费' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="签字费"
          name="signFee"
          rules={[{ required: true, message: '请输入签字费' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="公司协助发生的费用"
          name="cooperateFee"
          rules={[{ required: true, message: '请输入公司协助发生的费用' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="增值税费"
          name="taxFee"
          rules={[{ required: true, message: '请输入增值税费' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="其他费用"
          name="otherFee"
          rules={[{ required: true, message: '请输入其他费用' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="前期文件"
          name="report"
          rules={[{ required: true, message: '请上传前期文件' }]}
        >
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
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </div>
      </div>
    </Form>
  );
}
