import IndustryService from '@/services/industry.service';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Form, Input, message, Modal } from 'antd';
import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';

interface Props {
  data: any;
  onFinish: () => void;
}

const showEditProfessionalModal = NiceModal.create<Props>(({ data, onFinish }) => {
  const modal = useModal();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const [state, onSubmit] = useAsyncFn(async () => {
    const values = await form.validateFields();
    try {
      await IndustryService.updateIndustry(values);
      onFinish();
      modal.hide();
      message.success('编辑成功');
    } catch (error) {
      console.error(error);
    }
  }, [form]);

  return (
    <Modal
      title={`编辑专业`}
      open={modal.visible}
      onOk={() => form.submit()}
      onCancel={() => modal.hide()}
      okText="确定"
      cancelText="取消"
      confirmLoading={state.loading}
    >
      <Form form={form} layout="horizontal" onFinish={onSubmit}>
        <Form.Item name="fullName" label="行业名称" required>
          <Input />
        </Form.Item>
        <Form.Item name="industryType" label="行业类型" required>
          <Input />
        </Form.Item>
        <Form.Item name="major" label="包含专业" required>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default (props: Props) => NiceModal.show(showEditProfessionalModal, props);
