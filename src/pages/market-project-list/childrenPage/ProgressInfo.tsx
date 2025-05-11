import { ProcessInfoVO } from '@/types/project.types';
import { Card, Tag } from 'antd';
import styled from 'styled-components';

type ProgressInfoProps = {
  data: ProcessInfoVO[];
};

const ProgressContainer = styled.div`
  .progress-item {
    margin-bottom: 16px;

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .spot-name {
        font-size: 16px;
        font-weight: 500;
      }
    }

    .progress-content {
      .info-row {
        margin-bottom: 8px;
        display: flex;

        .label {
          width: 80px;
          color: #666;
        }
      }
    }
  }
`;

export default function ProgressInfo({ data }: ProgressInfoProps) {
  return (
    <ProgressContainer>
      {data?.map(item => (
        <Card key={item.id} className="progress-item">
          <div className="progress-header">
            <span className="spot-name">{item.spotName}</span>
            <Tag color={item.status === '待处理' ? 'warning' : 'success'}>{item.status}</Tag>
          </div>
          <div className="progress-content">
            <div className="info-row">
              <span className="label">操作人：</span>
              <span>{item.operator}</span>
            </div>
            <div className="info-row">
              <span className="label">操作：</span>
              <span>{item.operation}</span>
            </div>
            <div className="info-row">
              <span className="label">优先级：</span>
              <span>{item.rank}</span>
            </div>
            <div className="info-row">
              <span className="label">开始时间：</span>
              <span>{new Date(item.startTime).toLocaleString()}</span>
            </div>
            {item.finishedTime && (
              <div className="info-row">
                <span className="label">完成时间：</span>
                <span>{new Date(item.finishedTime).toLocaleString()}</span>
              </div>
            )}
            {item.opinion && (
              <div className="info-row">
                <span className="label">意见：</span>
                <span>{item.opinion}</span>
              </div>
            )}
          </div>
        </Card>
      ))}
    </ProgressContainer>
  );
}
