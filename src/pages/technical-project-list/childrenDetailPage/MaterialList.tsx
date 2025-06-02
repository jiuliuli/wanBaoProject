import { Descriptions, Tag } from 'antd';
import dayjs from 'dayjs';

type MaterialListProps = {
  data: any[];
};

export default function MaterialList({ data }: MaterialListProps) {
  return (
    <div>
      {data.map(item => (
        <Descriptions
          key={item.id}
          title={`材料详情（ID: ${item.id}）`}
          bordered
          column={1}
          style={{ marginBottom: 24 }}
          labelStyle={{ fontWeight: 'bold' }}
        >
          <Descriptions.Item label="项目编号">{item.projectNumber}</Descriptions.Item>
          <Descriptions.Item label="资料名称">{item.name}</Descriptions.Item>
          <Descriptions.Item label="资料类别">{item.category}</Descriptions.Item>
          <Descriptions.Item label="备注">{item.memo}</Descriptions.Item>
          <Descriptions.Item label="是否获取">
            {item.gain ? <Tag color="success">是</Tag> : <Tag color="error">否</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="获取时间">
            {dayjs(item.gainTime).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      ))}
    </div>
  );
}
