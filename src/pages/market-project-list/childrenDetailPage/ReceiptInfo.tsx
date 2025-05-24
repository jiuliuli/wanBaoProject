import { ContractInfoVO } from '@/types/project.types';
import { Card, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type ReceiptInfoProps = {
  data: ContractInfoVO;
};

export default function ReceiptInfo({ data }: ReceiptInfoProps) {
  const [revenues, setRevenues] = useState<any[]>([]);

  useEffect(() => {
    setRevenues(data?.revenues ?? []);
  }, [data]);

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
      render: (payment: number) => `¥${payment?.toLocaleString()}`,
    },
    {
      title: '总金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (amount: number) => `¥${amount?.toLocaleString()}`,
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
    <Card bordered={false} style={{ marginBottom: 24 }}>
      <Table
        dataSource={revenues}
        columns={revenueColumns as any}
        rowKey="revenueNumber"
        pagination={false}
      />
    </Card>
  );
}
