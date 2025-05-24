import LabelForm from '@/components/LabelForm';
import { Form } from 'antd';
import dayjs from 'dayjs';

interface ProgressInfoEditProps {
  onSubmit: (values: any) => Promise<void>;
}

export default function ProgressInfoEdit({ onSubmit }: ProgressInfoEditProps) {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    // 转换日期格式
    if (values.startTime) {
      values.startTime = dayjs(values.startTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    if (values.finishedTime) {
      values.finishedTime = dayjs(values.finishedTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    await onSubmit(values);
  };

  const formList = [
    {
      label: '操作人',
      name: 'operator',
      rules: [{ required: true, message: '请输入操作人' }],
    },
    {
      label: '操作',
      name: 'operation',
      rules: [{ required: true, message: '请输入操作' }],
    },
    {
      label: '优先级',
      name: 'rank',
      rules: [{ required: true, message: '请选择优先级' }],
    },
    {
      label: '开始时间',
      name: 'startTime',
      rules: [{ required: true, message: '请选择开始时间' }],
    },
    {
      label: '完成时间',
      name: 'finishedTime',
    },
    {
      label: '意见',
      name: 'opinion',
    },
  ];

  return (
    <LabelForm
      props={{
        form,
        onFinish: handleSubmit,
        labelCol: { span: 3 },
        wrapperCol: { span: 20 },
      }}
      formlist={formList}
    />
  );
}
