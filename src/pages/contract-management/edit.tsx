import PATH_ENUM from '@/components/routes/path';
import { ContractService } from '@/services/ContractService';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Button, DatePicker, Form, Input, InputNumber, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';

const { Option } = Select;

const ContractEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [type] = useState<string>(id ? 'edit' : 'create');

  const contractState = useAsync(async () => {
    if (id) {
      return ContractService.getContractById(id);
    }
  });

  useEffect(() => {
    if (id && contractState.value) {
      console.log(contractState.value);
    }
  }, [id]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        signDate: values.signDate?.format('YYYY-MM-DD'),
      };

      if (id) {
        await ContractService.updateContract(id, submitData);
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
    <PageHeader
      title={type === 'edit' ? '编辑合同' : '新建合同'}
      onBack={() => navigate(PATH_ENUM.CONTRACT_MANAGEMENT)}
      style={{ background: '#ffffff' }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <Form.Item
          name="contractNumber"
          label="合同编号"
          rules={[{ required: true, message: '请输入合同编号' }]}
        >
          <Input placeholder="请输入合同编号" />
        </Form.Item>

        <Form.Item
          name="title"
          label="合同标题"
          rules={[{ required: true, message: '请输入合同标题' }]}
        >
          <Input placeholder="请输入合同标题" />
        </Form.Item>

        <Form.Item
          name="contractType"
          label="合同类型"
          rules={[{ required: true, message: '请选择合同类型' }]}
        >
          <Select placeholder="请选择合同类型">
            <Option value="主合同">主合同</Option>
            <Option value="补充合同">补充合同</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
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
          name="signDate"
          label="签订日期"
          rules={[{ required: true, message: '请选择签订日期' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="payMode"
          label="支付方式"
          rules={[{ required: true, message: '请输入支付方式' }]}
        >
          <Input placeholder="请输入支付方式" />
        </Form.Item>

        <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Select placeholder="请选择状态">
            <Option value="待审批">待审批</Option>
            <Option value="已审批">已审批</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="projectName"
          label="项目名称"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input placeholder="请输入项目名称" />
        </Form.Item>

        <Form.Item
          name="establisher"
          label="创建人"
          rules={[{ required: true, message: '请输入创建人' }]}
        >
          <Input placeholder="请输入创建人" />
        </Form.Item>

        <Form.Item name="progress" label="进度" rules={[{ required: true, message: '请输入进度' }]}>
          <Input placeholder="请输入进度" />
        </Form.Item>

        <Form.Item name="division" label="部门" rules={[{ required: true, message: '请输入部门' }]}>
          <Input placeholder="请输入部门" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 16 }}>
            保存
          </Button>
          <Button onClick={() => navigate(PATH_ENUM.CONTRACT_MANAGEMENT)}>取消</Button>
        </Form.Item>
      </Form>
    </PageHeader>
  );
};

export default ContractEdit;
