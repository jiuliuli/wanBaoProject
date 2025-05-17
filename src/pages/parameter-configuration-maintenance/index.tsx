import { useTableDataFn } from '@/hooks/useTableDataFn';
import ParameterConfigurationService from '@/services/parameter.service';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles.less';

const ParameterConfigurationMaintenance = () => {
  const [params] = useState({});
  const [state, doFetch] = useTableDataFn({
    Fetch: ParameterConfigurationService.fetchParameterList,
    params: params,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    doFetch();
  }, []);

  const openModal = (record: any = null) => {
    setEditingItem(record);
    setModalVisible(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingItem) {
        await ParameterConfigurationService.updateParameter(values);
        message.success('编辑成功');
      }
      setModalVisible(false);
      doFetch();
    } catch (err) {
      message.error('操作失败');
    }
  };

  const columns = [
    { title: '参数项', dataIndex: 'item', key: 'item', align: 'center' },
    { title: '参数值', dataIndex: 'value', key: 'value', align: 'center' },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => openModal(record)}>
          编辑
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <div
        className={styles.header}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h2 className={styles.title}>参数配置维护</h2>
      </div>
      <Table
        columns={columns as any}
        dataSource={state.value?.dataSource || []}
        rowKey={(record: any) => record.item + record.value}
        style={{ marginTop: 16 }}
        pagination={false}
      />
      <Modal
        title={editingItem ? '编辑参数' : '新建参数'}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="horizontal">
          <Form.Item
            name="item"
            label="参数项"
            rules={[{ required: true, message: '请输入参数项' }]}
          >
            <Input disabled={!!editingItem} value={editingItem?.item} />
          </Form.Item>
          <Form.Item
            name="value"
            label="参数值"
            rules={[{ required: true, message: '请输入参数值' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ParameterConfigurationMaintenance;
