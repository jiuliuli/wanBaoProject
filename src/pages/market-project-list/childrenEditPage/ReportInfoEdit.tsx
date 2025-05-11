import { ReportInfoVO } from '@/types/project.types';
import { Button, Form, Input } from 'antd';

interface ReportInfoEditProps {
  data: ReportInfoVO;
  onSubmit: (values: any) => Promise<void>;
}

export default function ReportInfoEdit({ data, onSubmit }: ReportInfoEditProps) {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" initialValues={data} onFinish={onSubmit}>
      <div style={{ padding: '24px' }}>
        <Form.Item
          label="报告名称"
          name="report"
          rules={[{ required: true, message: '请输入报告名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮寄地址"
          name="mailingAddress"
          rules={[{ required: true, message: '请输入邮寄地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="收件人"
          name="recipient"
          rules={[{ required: true, message: '请输入收件人' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="contactPhone"
          rules={[{ required: true, message: '请输入联系电话' }]}
        >
          <Input />
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
