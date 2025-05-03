import HomeService from '@/services/home.service';
import { getGreeting } from '@/utils/format';
import { RightOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { useAsync } from 'react-use';
import styles from './styles.less';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const userName = initialState?.userInfo?.realName || '用户';

  // 获取时间段
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekDay = weekDays[now.getDay()];

  const totalState = useAsync(async () => {
    return await HomeService.getTotalData()
  })


  return (
    <div className={styles.container}>
      {/* 欢迎语和日期 */}
      <div className={styles.welcome}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`${userName}，${getGreeting()}`}</Text>
        <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>{`${year}年${month}月${day}日 星期${weekDay}`}</Text>
        <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>您今天的任务：</Text>
      </div>

      {
        !totalState.loading && totalState.value && <>
          {/* 统计图表区域 */}
          <Row gutter={[24, 24]} style={{ marginTop: 20, width: '100%' }}>
            <Col span={8}>
              <Card
                title="流程任务"
                bordered={false}
                bodyStyle={{ display: 'flex', justifyContent: 'center' }}
                style={{ height: '100%', border: '1px solid #f0f0f0', borderRadius: '8px' }}
              >
                <div className={styles.pieChart}>
                  <div
                    className={styles.chartCanvas}
                    title="流程任务统计"
                    style={{
                      position: 'relative',
                      background: `conic-gradient(
                  ${totalState.value.flowTaskData.completed.color} 0% ${totalState.value.flowTaskData.completed.percent}%,
                  ${totalState.value.flowTaskData.inProgress.color} ${totalState.value.flowTaskData.completed.percent}% ${totalState.value.flowTaskData.completed.percent + totalState.value.flowTaskData.inProgress.percent}%,
                  ${totalState.value.flowTaskData.waiting.color} ${totalState.value.flowTaskData.completed.percent + totalState.value.flowTaskData.inProgress.percent}% 100%
                )`
                    }}>
                  </div>
                  <div className={styles.legend}>
                    <div className={styles.legendItem}>
                      <span className={styles.legendColor} style={{ backgroundColor: totalState.value.flowTaskData.waiting.color }}></span>
                      <span>待审</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={styles.legendColor} style={{ backgroundColor: totalState.value.flowTaskData.completed.color }}></span>
                      <span>已审</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={styles.legendColor} style={{ backgroundColor: totalState.value.flowTaskData.inProgress.color }}></span>
                      <span>待阅</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col span={8}>
              <Card
                title="项目情况"
                bordered={false}
                bodyStyle={{ display: 'flex', justifyContent: 'center' }}
                style={{ height: '100%', border: '1px solid #f0f0f0', borderRadius: '8px' }}
              >
                <div className={styles.pieChart}>
                  <div
                    className={styles.chartCanvas}
                    title="项目情况统计"
                    style={{
                      position: 'relative',
                      background: `conic-gradient(
                  ${totalState.value.projectData.completed.color} 0% ${totalState.value.projectData.completed.percent}%,
                  ${totalState.value.projectData.inProgress.color} ${totalState.value.projectData.completed.percent}% ${totalState.value.projectData.completed.percent + totalState.value.projectData.inProgress.percent}%,
                  ${totalState.value.projectData.terminated.color} ${totalState.value.projectData.completed.percent + totalState.value.projectData.inProgress.percent}% ${totalState.value.projectData.completed.percent + totalState.value.projectData.inProgress.percent + totalState.value.projectData.terminated.percent}%,
                  ${totalState.value.projectData.waiting.color} ${totalState.value.projectData.completed.percent + totalState.value.projectData.inProgress.percent + totalState.value.projectData.terminated.percent}% 100%
                )`
                    }}>
                  </div>
                  <div className={styles.legend}>
                    <div className={styles.legendItem}>
                      <span className={styles.legendColor} style={{ backgroundColor: totalState.value.projectData.waiting.color }}></span>
                      <span>待审</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={styles.legendColor} style={{ backgroundColor: totalState.value.projectData.completed.color }}></span>
                      <span>完成</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={styles.legendColor} style={{ backgroundColor: totalState.value.projectData.inProgress.color }}></span>
                      <span>进行中</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={styles.legendColor} style={{ backgroundColor: '#E57979' }}></span>
                      <span>终止</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col span={8}>
              <Card
                title="财务状况"
                bordered={false}
                bodyStyle={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                style={{ height: '100%', border: '1px solid #f0f0f0', borderRadius: '8px' }}
              >
                <div className={styles.barChart}>
                  {/* 柱状图表示 */}
                  <div className={styles.barContainer}>
                    <div className={styles.bar} style={{ height: `${totalState.value.financeData.expense.value}%`, backgroundColor: totalState.value.financeData.expense.color }}></div>
                    <div className={styles.bar} style={{ height: `${totalState.value.financeData.income.value}%`, backgroundColor: totalState.value.financeData.income.color }}></div>
                    <div className={styles.bar} style={{ height: `${totalState.value.financeData.pending.value}%`, backgroundColor: totalState.value.financeData.pending.color }}></div>
                  </div>
                </div>

                {/* 财务状况下方的图例 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '12px 0',
                  marginTop: 'auto',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: "12px",
                      height: "12px",
                      backgroundColor: totalState.value.financeData.expense.color,
                      marginRight: '6px',
                      borderRadius: '2px'
                    }}></span>
                    <span>费用额</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      backgroundColor: totalState.value.financeData.income.color,
                      marginRight: '6px',
                      borderRadius: '2px'
                    }}></span>
                    <span>合同额</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      backgroundColor: totalState.value.financeData.pending.color,
                      marginRight: '6px',
                      borderRadius: '2px'
                    }}></span>
                    <span>利润额</span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* 资讯区域 */}
          <Row gutter={24} style={{ marginTop: 24 }}>
            <Col span={12}>
              <Card
                title="最新资讯 / 公司通知"
                bordered={false}
                extra={<a href="#">更多 <RightOutlined /></a>}
              >
                <div className={styles.newsList}>
                  资讯资讯
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="最新政策 / 法律法规"
                bordered={false}
                extra={<a href="#">更多 <RightOutlined /></a>}
              >
                <div className={styles.newsList}>
                  {/* 这里可以放政策法规列表内容 */}
                </div>
              </Card>
            </Col>
          </Row>

        </>
      }


    </div>
  );
};

export default Home; 