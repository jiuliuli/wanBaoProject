import { ContractInfoVO } from '@/types/project.types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Select, Space } from 'antd';
import dayjs from 'dayjs';

interface ContractInfoEditProps {
  data: ContractInfoVO;
  onSubmit: (values: any) => Promise<void>;
}

export default function ContractInfoEdit({ data, onSubmit }: ContractInfoEditProps) {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    // 转换日期格式
    if (values.contract?.signDate) {
      values.contract.signDate = dayjs(values.contract.signDate).format(
        'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
      );
    }
    // 转换收款记录中的日期格式
    if (values.revenues) {
      values.revenues = values.revenues.map((revenue: any) => ({
        ...revenue,
        revenueTime: revenue.revenueTime
          ? dayjs(revenue.revenueTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          : undefined,
      }));
    }
    await onSubmit({ ...data, ...values });
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      initialValues={{
        contract: {
          ...(data?.contract ?? {}),
          signDate: data?.contract?.signDate ? dayjs(data?.contract?.signDate) : undefined,
        },
        revenues:
          data?.revenues?.map((revenue: any) => ({
            ...revenue,
            revenueTime: revenue.revenueTime ? dayjs(revenue.revenueTime) : undefined,
          })) ?? [],
      }}
      onFinish={handleSubmit}
    >
      <div style={{ padding: '24px' }}>
        <Form.Item
          label="合同编号"
          name={['contract', 'contractNumber']}
          rules={[{ required: true, message: '请输入合同编号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="合同类型"
          name={['contract', 'contractType']}
          rules={[{ required: true, message: '请选择合同类型' }]}
        >
          <Select>
            <Select.Option value="主合同">主合同</Select.Option>
            <Select.Option value="补充合同">补充合同</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="合同金额"
          name={['contract', 'amount']}
          rules={[{ required: true, message: '请输入合同金额' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="签订时间"
          name={['contract', 'signDate']}
          rules={[{ required: true, message: '请选择签订时间' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="付款方式"
          name={['contract', 'payMode']}
          rules={[{ required: true, message: '请选择付款方式' }]}
          initialValue="银行转账"
        >
          <Select>
            <Select.Option value="银行转账">银行转账</Select.Option>
            <Select.Option value="现金">现金</Select.Option>
            <Select.Option value="支票">支票</Select.Option>
          </Select>
        </Form.Item>

        <Form.List name="revenues">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'revenueNumber']}
                    rules={[{ required: true, message: '请输入收款编号' }]}
                  >
                    <Input placeholder="收款编号" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'title']}
                    rules={[{ required: true, message: '请输入收款标题' }]}
                  >
                    <Input placeholder="收款标题" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'operator']}
                    rules={[{ required: true, message: '请输入操作人' }]}
                  >
                    <Input placeholder="操作人" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'phase']}
                    rules={[{ required: true, message: '请输入阶段' }]}
                  >
                    <InputNumber placeholder="阶段" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'payment']}
                    rules={[{ required: true, message: '请输入付款金额' }]}
                  >
                    <InputNumber placeholder="付款金额" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'amount']}
                    rules={[{ required: true, message: '请输入总金额' }]}
                  >
                    <InputNumber placeholder="总金额" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'revenueTime']}
                    rules={[{ required: true, message: '请选择收款时间' }]}
                  >
                    <DatePicker placeholder="收款时间" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'invoice']}>
                    <Select placeholder="发票状态" style={{ width: 120 }}>
                      <Select.Option value="未到款">未到款</Select.Option>
                      <Select.Option value="已到款">已到款</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'memo']}>
                    <Input placeholder="备注" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加收款记录
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </div>
      </div>
    </Form>
  );
}
