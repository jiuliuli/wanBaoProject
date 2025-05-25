import { InvoiceInfoVO } from '@/types/project.types';
import { Button, DatePicker, Form, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';

interface InvoiceInfoEditProps {
  data: InvoiceInfoVO;
  onSubmit: (values: any) => Promise<void>;
}

export default function InvoiceInfoEdit({ data, onSubmit }: InvoiceInfoEditProps) {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    // 转换日期格式
    if (values.invoiceDate) {
      values.invoiceDate = dayjs(values.invoiceDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    await onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...data,
        invoiceDate: data.invoiceDate ? dayjs(data.invoiceDate) : undefined,
      }}
      onFinish={handleSubmit}
    >
      <div style={{ padding: '24px' }}>
        <Form.Item
          label="发票类型"
          name="invoiceType"
          rules={[{ required: true, message: '请选择发票类型' }]}
        >
          <Select>
            <Select.Option value="1">增值税专用发票</Select.Option>
            <Select.Option value="2">增值税普通发票</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="发票金额"
          name="invoiceAmount"
          rules={[{ required: true, message: '请输入发票金额' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="开票日期"
          name="invoiceDate"
          rules={[{ required: true, message: '请选择开票日期' }]}
        >
          <DatePicker style={{ width: '100%' }} />
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
