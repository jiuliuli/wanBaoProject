import AutoTag from '@/components/AutoTag';
import { BasicInfoVO } from '@/types/project.types';
import { Card, Space } from 'antd';
import Descriptions, { DescriptionsItemType } from 'antd/es/descriptions';
import dayjs from 'dayjs';

type BasicInfoProps = {
  data: BasicInfoVO;
};

export default function BasicInfo({ data }: BasicInfoProps) {
  const items: DescriptionsItemType[] = [
    {
      label: '项目名称',
      key: 'projectName',
      children: <strong>{data.projectName}</strong>,
    },
    {
      label: '项目进度',
      key: 'progress',
      children: <>{data.progress}</>,
    },
    {
      label: '下单时间',
      key: 'signDate',
      children: dayjs(data.signDate).format('YYYY-MM-DD'),
    },
    {
      label: '市场人员',
      key: 'establisher',
      children: <>{data.establisher}</>,
    },
    {
      label: '计划完成时间',
      key: 'endTime',
      children: dayjs(data.endTime).format('YYYY-MM-DD'),
    },
    {
      label: '紧急程度',
      key: 'rank',
      children: <>{data.rank}</>,
    },
    {
      label: '项目状态',
      key: 'status',
      children: <AutoTag options={['正常', '停滞', '终止']} value={data.status} />,
    },
  ];

  return (
    data && (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Descriptions
            bordered
            items={items}
            column={2}
            size="middle"
            labelStyle={{ fontWeight: 'bold', backgroundColor: '#fafafa' }}
          />
        </Space>
      </Card>
    )
  );
}
