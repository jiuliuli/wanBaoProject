import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space } from 'antd';
import { useState } from 'react';

interface ReportInfoEditProps {
  onSubmit: (values: any) => Promise<void>;
}

export default function ReportInfoEdit({ onSubmit }: ReportInfoEditProps) {
  const [form] = Form.useForm();
  const [dataList, setDataList] = useState<any[]>([]);

  const handleAdd = () => {
    const newItem = {
      projectNumber: '',
      version: '',
      quantity: 1,
      sender: '',
      recipient: '',
      deliveryTime: '',
      deliveryNumber: '',
    };
    setDataList([...dataList, newItem]);
  };

  const handleDelete = (id: number) => {
    setDataList(dataList.filter(item => item.id !== id));
  };

  return (
    <Form form={form} layout="horizontal" initialValues={{ records: dataList }} onFinish={onSubmit}>
      <div style={{ padding: '24px' }}>
        <Form.List name="records">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Card
                  key={field.key}
                  style={{ marginBottom: 16 }}
                  extra={
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        remove(field.name);
                        handleDelete(dataList[index].id);
                      }}
                    />
                  }
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Form.Item
                      label="项目编号"
                      name={[field.name, 'projectNumber']}
                      rules={[{ required: true, message: '请输入项目编号' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="版本"
                      name={[field.name, 'version']}
                      rules={[{ required: true, message: '请输入版本' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="数量"
                      name={[field.name, 'quantity']}
                      rules={[{ required: true, message: '请输入数量' }]}
                    >
                      <Input type="number" />
                    </Form.Item>
                    <Form.Item
                      label="发送人"
                      name={[field.name, 'sender']}
                      rules={[{ required: true, message: '请输入发送人' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="收件人"
                      name={[field.name, 'recipient']}
                      rules={[{ required: true, message: '请输入收件人' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="发货时间"
                      name={[field.name, 'deliveryTime']}
                      rules={[{ required: true, message: '请输入发货时间' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="快递单号"
                      name={[field.name, 'deliveryNumber']}
                      rules={[{ required: true, message: '请输入快递单号' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Space>
                </Card>
              ))}
              <Button
                type="dashed"
                onClick={() => {
                  add();
                  handleAdd();
                }}
                block
                icon={<PlusOutlined />}
              >
                添加记录
              </Button>
            </>
          )}
        </Form.List>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </div>
      </div>
    </Form>
  );
}
