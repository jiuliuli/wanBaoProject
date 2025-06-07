import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Form, Input, InputNumber, Modal } from 'antd';
import { useAsyncFn } from 'react-use';

interface Props {
  onFinish: () => void;
}

const showAddRank = NiceModal.create<Props>(({ onFinish }) => {
  const modal = useModal();
  const [form] = Form.useForm();

  const [, onSubmit] = useAsyncFn(async () => {
    const values = await form.validateFields();
    onFinish();
  }, [form, onFinish]);

  return (
    <Modal
      title="新建级别"
      open={modal.visible}
      onOk={() => form.submit()}
      onCancel={() => modal.hide()}
      okText="确定"
      cancelText="取消"
    >
      <Form form={form} layout="horizontal" onFinish={onSubmit}>
        <Form.Item name="name" label="级别名称" required>
          <Input />
        </Form.Item>
        <Form.Item name="allowance" label="津贴" required>
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default (props: Props) => NiceModal.show(showAddRank, props);
