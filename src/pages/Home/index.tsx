import HomeService from '@/services/home.service';
import { useModel } from '@umijs/max';
import { Card, Col, Row, Tag, Typography } from 'antd';
import React from 'react';
import { useAsync } from 'react-use';
import styles from './styles.less';

const { Text } = Typography;

const Home: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const userName = initialState?.userInfo?.userName || '用户';
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekDay = weekDays[now.getDay()];

  const totalState = useAsync(async () => {
    return await HomeService.getTotalData(userName);
  });

  return (
    <div className={styles.container}>
      {/* 欢迎语和日期 */}
      <div className={styles.welcome}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`${userName}，早上好`}</Text>
        <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>{`${year}年${month}月${day}日 星期${weekDay}`}</Text>
      </div>

      <Card
        title="待处理项目"
        variant="borderless"
        style={{ marginTop: 24 }}
      >
        <Row gutter={[16, 16]}>
          {totalState.value?.map((item: any) => (
            <Col span={8} key={item.id}>
              <Card
                hoverable
                className={styles.taskCard}
                bodyStyle={{ padding: '16px' }}
              >
                <div className={styles.taskHeader}>
                  <Text strong style={{ fontSize: 16 }}>{item.spotName}</Text>
                  <div className={styles.taskTags}>
                    <Tag color={item.rank === '普通' ? 'blue' : 'red'}>{item.rank}</Tag>
                    <Tag color="orange" className={styles.statusTag}>{item.status}</Tag>
                  </div>
                </div>
                <div className={styles.taskContent}>
                  <div className={styles.taskItem}>
                    <Text type="secondary">项目编号：</Text>
                    <Text>{item.projectNumber}</Text>
                  </div>
                  <div className={styles.taskItem}>
                    <Text type="secondary">合同编号：</Text>
                    <Text>{item.contractNumber}</Text>
                  </div>
                  <div className={styles.taskItem}>
                    <Text type="secondary">操作人：</Text>
                    <Text>{item.operator}</Text>
                  </div>
                  <div className={styles.taskItem}>
                    <Text type="secondary">操作：</Text>
                    <Text>{item.operation}</Text>
                  </div>
                  <div className={styles.taskItem}>
                    <Text type="secondary">开始时间：</Text>
                    <Text>{new Date(item.startTime).toLocaleString()}</Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default Home;
