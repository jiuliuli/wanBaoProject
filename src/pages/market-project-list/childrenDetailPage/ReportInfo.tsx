import { Card, Table } from 'antd';

type ReportInfoProps = {
  data: any;
};

export default function ReportInfo({ data }: ReportInfoProps) {
  const columns = [
    {
      title: '项目编号',
      dataIndex: 'projectNumber',
      align: 'center',
    },
    {
      title: '报告版本',
      dataIndex: 'version',
      align: 'center',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: '邮寄人',
      dataIndex: 'sender',
      align: 'center',
    },
    {
      title: '收件人',
      dataIndex: 'recipient',
      align: 'center',
    },
    {
      title: '邮寄时间',
      dataIndex: 'deliveryTime',
      align: 'center',
    },
    {
      title: '快递单号',
      dataIndex: 'deliveryNumber',
      align: 'center',
    },
  ];

  return (
    <Card bordered={false} style={{ marginBottom: 24 }}>
      <Table dataSource={data} columns={columns as any} pagination={false} />
    </Card>
  );
}
