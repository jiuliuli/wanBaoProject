import HomeService from '@/services/home.service';
import { useModel } from '@umijs/max';
import { Button, Card, Col, Form, Input, message, Modal, Radio, Row, Tag, Typography, Upload } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';
import styles from './styles.less';

const { Text } = Typography;
const { TextArea } = Input;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  const userName = initialState?.userInfo?.userName || '用户';
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekDay = weekDays[now.getDay()];

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const totalState = useAsync(async () => {
    return await HomeService.getTotalData();
  }, [refreshKey]);

  const handleProcess = (task: any) => {
    setCurrentTask(task);
    setIsModalVisible(true);
  };

  const handleSubmit = async (values: any) => {

    try {
      await HomeService.updateTaskStatus({
        ...currentTask,
        result: values.result,
        opinion: values.opinion,
        assignee: values.assignee,
        attachment: values.attachment,
      });
      message.success('处理成功');
      setIsModalVisible(false);
      form.resetFields();
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      message.error('处理失败');
    }
  };

  const handleProjectClick = (projectNumber: string) => {
    navigate(`/market-project-list/detail/${projectNumber}`);
  };

  const handleContractClick = (contractNumber: string) => {
    navigate(`/contract-management/edit/${contractNumber}`);
  };

  return (
    <div className={styles.container}>
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
          {totalState.value?.map((item: any, index: number) => (
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
                    <Text
                      style={{ cursor: 'pointer', color: '#1890ff' }}
                      onClick={() => handleProjectClick(item.projectNumber)}
                    >
                      {item.projectNumber}
                    </Text>
                  </div>
                  <div className={styles.taskItem}>
                    <Text type="secondary">合同编号：</Text>
                    <Text
                      style={{ cursor: 'pointer', color: '#1890ff' }}
                      onClick={() => handleContractClick(item.contractNumber)}
                    >
                      {item.contractNumber}
                    </Text>
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
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                  <Button type="primary" onClick={() => handleProcess(item)}>
                    处理
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        title="处理意见"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="horizontal"
        >
          <Form.Item
            name="result"
            label="处理结果"
            rules={[{ required: true, message: '请选择处理结果' }]}
          >
            <Radio.Group options={[{ label: '同意', value: '同意' }, { label: '驳回', value: '驳回' }]} />
          </Form.Item>
          <Form.Item
            name="assignee"
            label="指派人"
          >
            <Input placeholder="请输入指派人" />
          </Form.Item>
          <Form.Item
            name="opinion"
            label="处理意见"
          >
            <TextArea rows={4} placeholder="请输入处理意见" />
          </Form.Item>
          <Form.Item
            name="attachment"
            label="附件"
          >
            <Upload
              action={`/v1/singleFileUpload?token=${userName}`}
              listType="text"
              onChange={({ file }) => {
                if (file.status === 'done') {
                  message.success(`${file.name} 上传成功`);
                  form.setFieldsValue({
                    attachment: file.response.data,
                  });
                } else if (file.status === 'error') {
                  message.error(`${file.name} 上传失败`);
                }
              }}
            >
              <Button>点击上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
