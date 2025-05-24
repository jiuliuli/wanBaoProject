import { ContractInfoVO } from '@/types/project.types';
import { Card, Descriptions } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type ContractInfoProps = {
  data: ContractInfoVO;
};

export default function ContractInfo({ data }: ContractInfoProps) {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    setContract(data?.contract ?? {});
  }, [data]);

  const contractItems = [
    {
      key: 'contractNumber',
      label: '合同编号',
      children: contract?.contractNumber,
    },
    {
      key: 'contractType',
      label: '合同类型',
      children: contract?.contractType,
    },
    {
      key: 'contractAmount',
      label: '合同金额',
      children: `¥${contract?.amount?.toLocaleString() ?? 0}`,
    },
    {
      key: 'signDate',
      label: '签订时间',
      children: dayjs(contract?.signDate).format('YYYY-MM-DD'),
    },
    {
      key: 'payMode',
      label: '支付方式',
      children: contract?.payMode,
    },
  ];

  return (
    <Card bordered={false} style={{ marginBottom: 24 }}>
      <Descriptions
        bordered
        items={contractItems}
        column={2}
        size="middle"
        labelStyle={{ fontWeight: 'bold', backgroundColor: '#fafafa' }}
      />
    </Card>
  );
}
