import { Card, Descriptions } from 'antd';
import dayjs from 'dayjs';
import './ProjectNotes.css';

type ProjectNotesProps = {
  data: any[];
};

export default function ProjectNotes({ data }: ProjectNotesProps) {
  return (
    <div className="notes-list">
      {data.map(item => (
        <Card
          key={item.id}
          className="note-card"
          style={{ marginBottom: 24 }}
          bodyStyle={{ padding: 20 }}
        >
          <Descriptions
            column={2}
            bordered
            size="middle"
            labelStyle={{ fontWeight: 'bold', background: '#fafafa' }}
          >
            <Descriptions.Item label="合同编号">{item.contractNumber}</Descriptions.Item>
            <Descriptions.Item label="记事点">{item.spotName}</Descriptions.Item>
            <Descriptions.Item label="发起人">{item.sponsor}</Descriptions.Item>
            <Descriptions.Item label="操作人">{item.operator}</Descriptions.Item>
            <Descriptions.Item label="操作内容" span={2}>
              {item.operation}
            </Descriptions.Item>
            <Descriptions.Item label="紧急程度">{item.rank}</Descriptions.Item>
            <Descriptions.Item label="处理意见" span={2}>
              {item.opinion}
            </Descriptions.Item>
            <Descriptions.Item label="状态">{item.status}</Descriptions.Item>
            <Descriptions.Item label="开始时间">
              {dayjs(item.startTime).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="完成时间">
              {dayjs(item.finishedTime).format('YYYY-MM-DD') || '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ))}
    </div>
  );
}
