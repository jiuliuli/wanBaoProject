import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import PATH_ENUM from '@/components/routes/path';
import PersonnelService from '@/services/personnel.service';
import { PageHeader } from '@ant-design/pro-components';
import { history, useNavigate, useParams } from '@umijs/max';
import { Button, Form, Input, message, Radio, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

export default function PersonnelManagementEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userInfo = useAsync(async () => {
    if (!id) return;
    return await PersonnelService.getPersonnelById(id);
  }, [id]);

  const [form] = Form.useForm();
  const [type, setType] = useState<string>();

  useEffect(() => {
    if (userInfo.value && id) {
      form.setFieldsValue(userInfo.value);
      setType('edit');
    } else {
      setType('create');
    }
  }, [userInfo.value]);

  const [state, handleSubmit] = useAsyncFn(
    async (values: any) => {
      try {
        if (type === 'edit' && id) {
          await PersonnelService.updatePersonnel(values);
          message.success('更新成功');
        } else {
          await PersonnelService.createPersonnel(values);
          message.success('创建成功');
        }
        history.push('/personnel-management');
      } catch (error) {
        message.error('操作失败');
      }
    },
    [type, id],
  );

  const formlist: LabelFormItem[] = [
    {
      label: '用户名',
      name: 'userName',
      required: true,
    },
    {
      label: '真实姓名',
      name: 'realName',
      required: true,
    },
    {
      label: '显示名称',
      name: 'showName',
    },
    {
      label: '性别',
      name: 'gender',
      required: true,
      children: (
        <Radio.Group>
          <Radio value="男">男</Radio>
          <Radio value="女">女</Radio>
        </Radio.Group>
      ),
    },
    {
      label: '密码',
      name: 'password',
      required: type === 'create',
      children: <Input.Password minLength={6} />,
    },
    {
      label: '角色',
      name: 'role',
      required: true,
    },
    {
      label: '部门',
      name: 'division',
      required: true,
    },
    {
      label: '地区',
      name: 'region',
      required: true,
    },
    {
      label: '职级',
      name: 'rank',
      required: true,
    },
    {
      label: '联系方式',
      name: 'contact',
    },
    {
      label: '状态',
      name: 'valid',
      required: true,
    },
    {
      label: '在线状态',
      name: 'online',
      required: true,
    },
    {
      label: '权限',
      name: 'power',
      required: true,
    },
    {
      label: '备注',
      name: 'memo',
    },
  ];

  return (
    <PageHeader
      title={id ? `编辑${id}` : '新建人员'}
      onBack={() => navigate(PATH_ENUM.PERSONNEL_MANAGEMENT)}
      style={{ background: '#ffffff' }}
    >
      <Space>
        <Button
          type="primary"
          loading={state.loading}
          style={{
            marginBottom: 20,
            marginRight: 10,
          }}
          onClick={() => {
            handleSubmit(form.getFieldsValue());
          }}
        >
          保存当前编辑
        </Button>

        <Button
          style={{
            marginBottom: 20,
            marginRight: 10,
          }}
          onClick={() => navigate(PATH_ENUM.DEPARTMENT_MANAGEMENT)}
        >
          取消
        </Button>
      </Space>

      {(type === 'create' || userInfo.value) && (
        <LabelForm
          props={{
            form,
            onFinish: handleSubmit,
            labelCol: { span: 3 },
            wrapperCol: { span: 20 },
          }}
          formlist={formlist}
        />
      )}
    </PageHeader>
  );
}
