import { ContractInfoVO } from '@/types/project.types';
import { Card, Descriptions, Space, Table } from 'antd';
import dayjs from 'dayjs';

type ContractInfoProps = {
  data: ContractInfoVO;
};

export default function ContractInfo({ data }: ContractInfoProps) {
  const { contract, revenues } = data;

  const contractItems = [
    {
      key: 'contractNumber',
      label: '合同编号',
      children: contract.contractNumber,
    },
    {
      key: 'contractType',
      label: '合同类型',
      children: contract.contractType,
    },
    {
      key: 'contractAmount',
      label: '合同金额',
      children: `¥${contract.amount.toLocaleString()}`,
    },
    {
      key: 'signDate',
      label: '签订日期',
      children: dayjs(contract.signDate).format('YYYY-MM-DD'),
    },
    {
      key: 'payMode',
      label: '支付方式',
      children: contract.payMode,
    },
  ];

  const revenueColumns = [
    {
      title: '收入编号',
      dataIndex: 'revenueNumber',
      key: 'revenueNumber',
      align: 'center',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      align: 'center',
    },
    {
      title: '项目编号',
      dataIndex: 'projectNumber',
      key: 'projectNumber',
      align: 'center',
    },
    {
      title: '合同编号',
      dataIndex: 'contractNumber',
      key: 'contractNumber',
      align: 'center',
    },
    {
      title: '阶段',
      dataIndex: 'phase',
      key: 'phase',
      align: 'center',
      render: (phase: number) => `第${phase}期`,
    },
    {
      title: '收款金额',
      dataIndex: 'payment',
      key: 'payment',
      align: 'center',
      render: (payment: number) => `¥${payment.toLocaleString()}`,
    },
    {
      title: '总金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '收入时间',
      dataIndex: 'revenueTime',
      key: 'revenueTime',
      align: 'center',
      render: (time: string) => dayjs(time).format('YYYY-MM-DD'),
    },
    {
      title: '发票状态',
      dataIndex: 'invoice',
      key: 'invoice',
      align: 'center',
    },
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Card bordered={false} title="合同信息" style={{ marginBottom: 24 }}>
        <Descriptions
          bordered
          items={contractItems}
          column={2}
          size="middle"
          labelStyle={{ fontWeight: 'bold', backgroundColor: '#fafafa' }}
        />
      </Card>

      <Card bordered={false} title="收入信息" style={{ marginBottom: 24 }}>
        <Table
          dataSource={revenues}
          columns={revenueColumns as any}
          rowKey="revenueNumber"
          pagination={false}
        />
      </Card>
    </Space>
  );
}
