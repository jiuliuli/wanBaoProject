import { ContractInfoVO } from '@/types/project.types';
import { Card, Table } from 'antd';
import { useEffect, useState } from 'react';

type InvoiceInfoProps = {
  data: ContractInfoVO;
};

export default function InvoiceInfo({ data }: InvoiceInfoProps) {
  const [revenues, setRevenues] = useState<any[]>([]);

  useEffect(() => {
    setRevenues(data?.revenues ?? []);
  }, [data]);

  const revenueColumns = [
    {
      title: '开票时间',
      dataIndex: 'invoiceTime',
      key: 'invoiceTime',
      align: 'center',
    },
    {
      title: '合同额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    {
      title: '开票金额',
      dataIndex: 'payment',
      key: 'payment',
      align: 'center',
    },
    {
      title: '第几次开票',
      dataIndex: 'phase',
      key: 'phase',
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'memo',
      key: 'memo',
      align: 'center',
    },
    // {
    //   title: "操作",
    //   align: 'center',
    //   render: (text: any, record: any) => {
    //     return <Button type="link">查看</Button>
    //   },
    // },
  ];

  return (
    <Card bordered={false} style={{ marginBottom: 24 }}>
      <Table
        dataSource={revenues}
        columns={revenueColumns as any}
        rowKey="invoiceTime"
        pagination={false}
      />
    </Card>
  );
}
