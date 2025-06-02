import { Descriptions } from 'antd';

type ProjectMembersProps = {
  data: any[];
};

export default function ProjectMembers({ data }: ProjectMembersProps) {
  return (
    <div>
      {data.map((item, idx) => (
        <Descriptions
          key={item.id || idx}
          title={`成员 ${item.name}`}
          bordered
          size="small"
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label={<b>职务</b>}>{item.duty}</Descriptions.Item>
          <Descriptions.Item label={<b>项目编号</b>}>{item.projectNumber}</Descriptions.Item>
          <Descriptions.Item label={<b>项目组内职务</b>}>{item.title}</Descriptions.Item>
        </Descriptions>
      ))}
    </div>
  );
}
