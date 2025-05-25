import { Button, DatePicker, Form, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';

interface ReceiptInfoEditProps {
  data: any;
  onSubmit: (values: any) => Promise<void>;
}

export default function ReceiptInfoEdit({ data, onSubmit }: ReceiptInfoEditProps) {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    // 转换日期格式
    if (values.receiptDate) {
      values.receiptDate = dayjs(values.receiptDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    await onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...data,
        receiptDate: data.receiptDate ? dayjs(data.receiptDate) : undefined,
      }}
      onFinish={handleSubmit}
    >
      <div style={{ padding: '24px' }}>
        <Form.Item
          label="收款金额"
          name="receiptAmount"
          rules={[{ required: true, message: '请输入收款金额' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="收款日期"
          name="receiptDate"
          rules={[{ required: true, message: '请选择收款日期' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="收款方式"
          name="receiptMode"
          rules={[{ required: true, message: '请选择收款方式' }]}
        >
          <Select>
            <Select.Option value="1">银行转账</Select.Option>
            <Select.Option value="2">现金</Select.Option>
            <Select.Option value="3">支票</Select.Option>
          </Select>
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
