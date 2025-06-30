import IndustryService from '@/services/industry.service';
import ProjectManagementService from '@/services/project-management.service';
import { BasicInfoVO } from '@/types/project.types';
import { Button, DatePicker, Form, Input, InputNumber, message, Radio, Select, Switch, Upload } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useAsync } from 'react-use';

interface BasicInfoEditProps {
  data: BasicInfoVO;
  onSubmit: (values: any) => void;
}

export default function BasicInfoEdit({ data, onSubmit }: BasicInfoEditProps) {
  const [form] = Form.useForm();
  const [userName] = useState<string>(JSON.parse(localStorage.getItem('userInfo') || '{}').userName);

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
          label="企业名称"
          name="customerName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="市场类型"
          name="source"
          rules={[{ required: true, message: '请选择市场类型' }]}
        >
          <Radio.Group
            options={[
              { label: '自营', value: '自营' },
              { label: '合作', value: '合作' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="项目所在地"
          name="address"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="所属行业"
          name="industryType"
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
          <Switch checkedChildren="是" unCheckedChildren="否" />

        </Form.Item>
        <Form.Item
          label="市场人员"
          name="establisher"
          initialValue="admin"
          rules={[{ required: true, message: '请输入市场人员' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="前期文件"
          name="report"
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
        <Form.Item
          label="送审稿数量"
          name="submitCount"
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="备案稿数量"
          name="recordCount"
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="合同额"
          name="amount"
          rules={[{ required: true, message: '请输入合同额' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="完成时间"
          name="finishedTime"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="紧急程度"
          name="rank"
        >
          <Radio.Group
            options={[
              { label: '紧急', value: '紧急' },
              { label: '重要', value: '重要' },
              { label: '一般', value: '一般' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="送审的市级管理部门"
          name="cityBureau"
        >
          <Input placeholder="请输入送审的市级管理部门,多个以逗号隔开" />
        </Form.Item>
        <Form.Item
          label="送审的区级管理部门"
          name="districtBureau"
        >
          <Input placeholder="请输入送审的区级管理部门,多个以逗号隔开" />
        </Form.Item>
        <Form.Item
          label="项目描述"
          name="describe"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="说明"
          name="remark"
        >
          <Input.TextArea />
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            保存基本信息
          </Button>
        </div>
      </div>
    </Form>
  );
}
