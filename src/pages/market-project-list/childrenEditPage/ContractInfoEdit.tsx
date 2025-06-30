import { ContractInfoVO } from '@/types/project.types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { Button, Card, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface ContractInfoEditProps {
  data: ContractInfoVO;
  onSubmit: (values: any) => Promise<void>;
  amount: number;
}

export default function ContractInfoEdit({ data, onSubmit, amount }: ContractInfoEditProps) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const userName = JSON.parse(localStorage.getItem('userInfo') || '{}').userName;

  useEffect(() => {
    form.setFieldsValue({
      contract: {
        ...(data?.contract ?? {}),
        signDate: data?.contract?.signDate ? dayjs(data?.contract?.signDate) : undefined,
      },
      revenues:
        data?.revenues?.map((revenue: any) => ({
          ...revenue,
          revenueTime: revenue.revenueTime ? dayjs(revenue.revenueTime) : undefined,
        })) ?? [],
    });
  }, [data]);

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
          initialValue={id}
        >
          <Input disabled />
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
          initialValue={amount}
        >
          <InputNumber style={{ width: '100%' }} disabled />
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
                <div key={key} style={{ position: 'relative', marginBottom: 16 }}>
                  <Card bodyStyle={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                      <Form.Item {...restField} name={[name, 'revenueNumber']} label="收款编号" style={{ flex: 1 }}>
                        <Input placeholder="收款编号" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'title']} label="收款标题" rules={[{ required: true, message: '请输入收款标题' }]} style={{ flex: 1 }}>
                        <Input placeholder="收款标题" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'operator']} label="操作人" rules={[{ required: true, message: '请输入操作人' }]} style={{ flex: 1 }} initialValue={userName}>
                        <Input placeholder="操作人" disabled />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'phase']} label="阶段" rules={[{ required: true, message: '请输入阶段' }]} style={{ flex: 1 }}>
                        <Select options={[{ label: "首付款", value: "首付款" }, { label: "中期款", value: "中期款" }, { label: "尾款", value: "尾款" }]} />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'payment']} label="付款金额" rules={[{ required: true, message: '请输入付款金额' }]} style={{ flex: 1 }}>
                        <InputNumber style={{ width: '100%' }} min={0} precision={2} placeholder="付款金额" prefix="¥" />
                      </Form.Item>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <Form.Item {...restField} name={[name, 'amount']} label="总金额" rules={[{ required: true, message: '请输入总金额' }]} style={{ flex: 1 }}>
                        <InputNumber style={{ width: '100%' }} min={0} precision={2} placeholder="总金额" prefix="¥" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'revenueTime']} label="收款时间" rules={[{ required: true, message: '请选择收款时间' }]} style={{ flex: 1 }}>
                        <DatePicker placeholder="收款时间" style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'invoice']} label="发票状态" style={{ flex: 1 }}>
                        <Select placeholder="发票状态">
                          <Select.Option value="未到款">未到款</Select.Option>
                          <Select.Option value="已到款">已到款</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'memo']} label="备注" style={{ flex: 1 }}>
                        <Input placeholder="备注" />
                      </Form.Item>
                    </div>
                  </Card>
                  <div
                    onClick={() => remove(name)}
                    style={{
                      position: 'absolute',
                      right: -8,
                      top: -8,
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#fff',
                      borderRadius: '50%',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      cursor: 'pointer'
                    }}
                  >
                    <MinusCircleOutlined style={{ fontSize: '16px', color: '#ff4d4f' }} />
                  </div>
                </div>
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
