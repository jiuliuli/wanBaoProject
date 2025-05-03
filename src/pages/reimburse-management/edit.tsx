import LabelForm from "@/components/LabelForm";
import { LabelFormItem } from "@/components/LabelForm/types";
import PATH_ENUM from "@/components/routes/path";
import ProjectManagementService from "@/services/project-management.service";
import ReimburseManagementService from "@/services/reimburse-manage.service";
import { UploadOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-components";
import { useNavigate, useParams } from "@umijs/max";
import { Button, Form, InputNumber, message, Select, Space, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useAsync, useAsyncFn } from 'react-use';

export default function ReimburseManagementEdit() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [type, setType] = useState<string>();
  const [projectOptions, setProjectOptions] = useState<{ label: string; value: string }[]>([]);
  const [projectCategory, setProjectCategory] = useState<{ label: string; value: string }[]>([]);
  const [nonProjectCategory, setNonProjectCategory] = useState<{ label: string; value: string }[]>([]);
  const navigate = useNavigate();
  const reimburseState = useAsync(async () => {
    if (id) {
      return await ReimburseManagementService.fetchReimburseById(id);
    }
  }, [id]);

  const categoryStatus = useAsync(async () => {
    return await ReimburseManagementService.fetchCategoryStatus();
  }, []);

  useEffect(() => {
    if (id && reimburseState.value && categoryStatus.value) {
      console.log(id);
      form.setFieldsValue(reimburseState.value[0]);
      setProjectCategory(categoryStatus.value.filter((item: any) => item.startsWith('项目')));
      setNonProjectCategory(categoryStatus.value.filter((item: any) => item.startsWith('非项目')));
      setType('edit');
    } else {
      setType('create');
    }
  }, [id, form, reimburseState.value, categoryStatus.value]);

  const handleProjectSearch = async (id: string) => {
    if (id) {
      const result = await ProjectManagementService.fetchProjectById(id);
      const options = result.map((item: any) => ({
        label: `${item.projectNumber} - ${item.projectName}`,
        value: item.projectNumber,
        projectName: item.projectName
      }));
      setProjectOptions(options);
    } else {
      setProjectOptions([]);
    }
  };

  const handleProjectSelect = (value: string, option: any) => {
    console.log(option);
    form.setFieldsValue({
      projectNumber: option.value,
      projectName: option.projectName
    });
  };

  const [submitState, doFetch] = useAsyncFn(
    async values => {
      if (type === 'edit') {
        values.expenseNumber = id;
      }
      try {
        if (type === 'edit') {
          await ReimburseManagementService.updateReimburse(values);
        } else {
          await ReimburseManagementService.createReimburse(values);
        }
        message.success(type === 'edit' ? '更新报销单成功' : '新建报销单成功');
        navigate(PATH_ENUM.REIMBURSE_MANAGEMENT);
      } catch (error) {
        message.error(type === 'edit' ? '更新报销单失败' : '新建报销单失败');
      }
    },
    [type],
  );

  const formlist: LabelFormItem[] = [
    {
      label: "报销人",
      name: "reimburser",
    },
    {
      label: "项目",
      name: "projectNumber",
      children: (
        <Select
          allowClear
          showSearch
          placeholder="请输入项目编号"
          onSearch={handleProjectSearch}
          onChange={handleProjectSelect}
          options={projectOptions}
          filterOption={false}
        />
      )
    },
    {
      name: "projectName",
      hidden: true
    },
    {
      label: "报销金额",
      name: "amount",
      children: <InputNumber />
    },
    {
      label: "费用类型",
      shouldUpdate: (prev, cur) => prev.projectNumber !== cur.projectNumber,
      name: "category",
      children: (form) => {
        const projectNumber = form.getFieldValue('projectNumber');
        if (projectNumber) {
          return <Select options={projectCategory.map((item: any) => ({ label: item, value: item }))} placeholder="请选择费用类型" />
        } else {
          return <Select options={nonProjectCategory.map((item: any) => ({ label: item, value: item }))} placeholder="请选择费用类型" />
        }
      }
    },
    {
      label: "报销事由",
      name: "purpose",
      children: <TextArea />
    },
    {
      label: "费用承担部门",
      name: "division"
    },
    {
      label: "备注",
      name: "memo",
      children: <TextArea />
    },
    {
      label: "收款人",
      name: "accountName",
    },
    {
      label: "开户行",
      name: "bankName",
    },
    {
      label: "账号",
      name: "accountNumber",
    },
    {
      label: "附件",
      name: "attachment",
      children: <Upload>
        <Button icon={<UploadOutlined />}>上传附件</Button>
      </Upload>
    }
  ];

  return (
    <PageHeader
      title={id ? `编辑${id}` : '新建报销单'}
      onBack={() => navigate(PATH_ENUM.REIMBURSE_MANAGEMENT)}
      style={{ background: '#ffffff' }}
    >
      <Space>
        <Button
          type="primary"
          loading={submitState.loading}
          style={{
            marginBottom: 20,
            marginRight: 10,
          }}
          onClick={() => {
            doFetch(form.getFieldsValue());
          }}
        >
          保存当前编辑
        </Button>

        <Button
          style={{
            marginBottom: 20,
            marginRight: 10,
          }}
          onClick={() => navigate(PATH_ENUM.REIMBURSE_MANAGEMENT)}
        >
          取消
        </Button>
      </Space>

      <LabelForm
        props={{
          form,
          onFinish: doFetch,
          labelCol: { span: 3 },
          wrapperCol: { span: 20 },
        }}
        formlist={formlist}
      />
    </PageHeader >
  );
}
