import { ProgressInfoVO } from '@/types/project.types';
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';

interface ProgressInfoEditProps {
  data: ProgressInfoVO;
  onSubmit: (values: any) => Promise<void>;
}

export default function ProgressInfoEdit({ data, onSubmit }: ProgressInfoEditProps) {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    // 转换日期格式
    if (values.startTime) {
      values.startTime = dayjs(values.startTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    if (values.endTime) {
      values.endTime = dayjs(values.endTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    if (values.finishedTime) {
      values.finishedTime = dayjs(values.finishedTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    await onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...data,
        startTime: data.startTime ? dayjs(data.startTime) : undefined,
        endTime: data.endTime ? dayjs(data.endTime) : undefined,
        finishedTime: data.finishedTime ? dayjs(data.finishedTime) : undefined,
      }}
      onFinish={handleSubmit}
    >
      <div style={{ padding: '24px' }}>
        <Form.Item
          label="当前进度"
          name="currentProgress"
          rules={[{ required: true, message: '请输入当前进度' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="开始时间"
          name="startTime"
          rules={[{ required: true, message: '请选择开始时间' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="结束时间" name="endTime">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="完成时间" name="finishedTime">
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
