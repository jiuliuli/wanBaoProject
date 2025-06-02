import PATH_ENUM from '@/components/routes/path';
import { ContractService } from '@/services/ContractService';
import PersonnelService from '@/services/personnel.service';
import { Revenue } from '@/types/contract.types';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Space, Upload } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';

const { Option } = Select;

const ContractEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [type] = useState<string>(id ? 'edit' : 'create');
  const [userName] = useState<string>(localStorage.getItem('user') || '');

  const contractState = useAsync(async () => {
    if (id) {
      return ContractService.getContractById(id);
    }
  });

  const staffListState = useAsync(async () => {
    return await PersonnelService.fetchPersonnelList({});
  });

  useEffect(() => {
    if (id && contractState.value) {
      const formData = {
        contract: {
          ...contractState.value.contract,
          signDate: contractState.value.contract.signDate
            ? dayjs(contractState.value.contract.signDate)
            : undefined,
        },
        revenues:
          contractState.value.revenues?.map((revenue: Revenue) => ({
            ...revenue,
            revenueTime: revenue.revenueTime ? dayjs(revenue.revenueTime) : undefined,
          })) || [],
      };
      form.setFieldsValue(formData);
    }
  }, [id, contractState.value]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        signDate: values.signDate?.format('YYYY-MM-DD'),
      };

      if (id) {
        submitData.contract.contractNumber = id;
        await ContractService.updateContract(submitData);
        message.success('更新合同成功');
      } else {
        await ContractService.createContract(submitData);
        message.success('创建合同成功');
      }
      navigate(PATH_ENUM.CONTRACT_MANAGEMENT);
    } catch (error) {
      console.error('保存合同失败:', error);
      message.error('保存合同失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    staffListState.value &&
    staffListState.value.length > 0 && (
      <PageHeader
        title={type === 'edit' ? '合同详情' : '新建合同'}
        onBack={() => navigate(PATH_ENUM.CONTRACT_MANAGEMENT)}
        style={{ background: '#ffffff' }}
      >
        <Form form={form} layout="horizontal" onFinish={handleSubmit}>
          <div style={{ padding: '24px' }}>
            <h3>合同信息</h3>
            <Form.Item
              name={['contract', 'title']}
              label="合同标题"
              rules={[{ required: true, message: '请输入合同标题' }]}
            >
              <Input placeholder="请输入合同标题" />
            </Form.Item>
            <Form.Item
              hidden={type === 'edit'}
              name={['contract', 'contractNumber']}
              label="项目编号"
              rules={[{ required: true, message: '请输入项目编号' }]}
            >
              <Input placeholder="请输入项目编号" />
            </Form.Item>

            <Form.Item
              name={['contract', 'contractType']}
              label="合同类型"
              rules={[{ required: true, message: '请选择合同类型' }]}
            >
              <Select placeholder="请选择合同类型">
                <Option value="主合同">主合同</Option>
                <Option value="补充合同">补充合同</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={['contract', 'amount']}
              label="合同金额"
              rules={[{ required: true, message: '请输入合同金额' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                precision={2}
                placeholder="请输入合同金额"
                prefix="¥"
              />
            </Form.Item>

            <Form.Item
              name={['contract', 'signDate']}
              label="签订日期"
              rules={[{ required: true, message: '请选择签订日期' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name={['contract', 'payMode']}
              label="支付方式"
              rules={[{ required: true, message: '请输入支付方式' }]}
            >
              <Input placeholder="请输入支付方式" />
            </Form.Item>

            <Form.Item
              name={['contract', 'status']}
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select
                placeholder="请选择状态"
                options={[
                  { label: '待审批', value: '待审批' },
                  { label: '待盖章', value: '待盖章' },
                  { label: '待签订', value: '待签订' },
                  { label: '已签订', value: '已签订' },
                  { label: '已存档', value: '已存档' },
                ]}
              />
            </Form.Item>

            <Form.Item name={['contract', 'document']} label="合同文档">
              <Upload
                action={`/v1/singleFileUpload?token=${userName}`}
                listType="text"
                onChange={({ file }) => {
                  if (file.status === 'done') {
                    message.success(`${file.name} 上传成功`);
                    form.setFieldsValue({
                      contract: {
                        ...form.getFieldValue('contract'),
                        document: file.response.data,
                      },
                    });
                  } else if (file.status === 'error') {
                    message.error(`${file.name} 上传失败`);
                  }
                }}
              >
                <Button>点击上传</Button>
              </Upload>
            </Form.Item>

            <h3>{type === "edit" ? "收入信息" : "付款约定"}</h3>

            {
              type === "create" ? <Form.List name="revenues">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item {...restField} name={[name, 'phase']}>
                          <Input placeholder="付款期数" />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'qualification']}>
                          <Input placeholder="付款条件" />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'amount']}>
                          <InputNumber placeholder="付款额" suffix="元" />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'memo']}>
                          <Input placeholder="备注" style={{ width: 500 }} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加付款约定记录
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List> :
                <Form.List name="revenues">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item {...restField} name={[name, 'revenueNumber']}>
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
                            initialValue={JSON.parse(localStorage.getItem('userInfo') || '{}').userName}
                            rules={[{ required: true, message: '请输入操作人' }]}
                          >
                            <Select
                              showSearch
                              placeholder="请选择操作人"
                              optionFilterProp="children"
                              filterOption={(input: string, option: any) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                              }
                              options={staffListState.value?.map((staff: any) => ({
                                value: staff.userName,
                                label: staff.userName,
                              }))}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'phase']}
                            rules={[{ required: true, message: '请输入阶段' }]}
                          >
                            <Select placeholder="阶段">
                              <Option value="首付款">首付款</Option>
                              <Option value="中期款">中期款</Option>
                              <Option value="尾款">尾款</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'payment']}
                            rules={[{ required: true, message: '请输入付款金额' }]}
                          >
                            <InputNumber
                              style={{ width: 80 }}
                              min={0}
                              precision={2}
                              placeholder="付款金额"
                              prefix="¥"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'amount']}
                            rules={[{ required: true, message: '请输入总金额' }]}
                          >
                            <InputNumber
                              style={{ width: 80 }}
                              min={0}
                              precision={2}
                              placeholder="总金额"
                              prefix="¥"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'revenueTime']}
                            rules={[{ required: true, message: '请选择收款时间' }]}
                          >
                            <DatePicker placeholder="收款时间" style={{ width: 150 }} />
                          </Form.Item>
                          <Form.Item {...restField} name={[name, 'revenueMode']}>
                            <Input placeholder="收款方式" style={{ width: 100 }} />
                          </Form.Item>
                          <Form.Item {...restField} name={[name, 'invoice']}>
                            <Select placeholder="发票状态" style={{ width: 100 }}>
                              <Option value="未到款">未到款</Option>
                              <Option value="已到款">已到款</Option>
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
                          {/* 添加付款约定记录 */}
                          添加收入记录
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
            }



            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginRight: 16 }}
              >
                保存
              </Button>
              <Button onClick={() => navigate(PATH_ENUM.CONTRACT_MANAGEMENT)}>取消</Button>
            </Form.Item>
          </div>
        </Form>
      </PageHeader>
    )
  );
};

export default ContractEdit;
