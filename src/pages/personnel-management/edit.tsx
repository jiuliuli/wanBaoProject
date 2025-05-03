import LabelForm from "@/components/LabelForm";
import { LabelFormItem } from "@/components/LabelForm/types";
import PATH_ENUM from "@/components/routes/path";
import { GENDER_TYPE_TEXT, RIGHT_TYPE_TEXT, ROLE_TYPE_TEXT, VALID_TYPE_TEXT } from "@/constants/personnel.constants";
import PersonnelManagementService from "@/services/personnel-management.service";
import { getSelectOptions } from "@/utils/format";
import { PageHeader } from "@ant-design/pro-components";
import { useNavigate, useParams } from "@umijs/max";
import { Button, Form, Input, message, Radio, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useAsync, useAsyncFn } from "react-use";

export default function PersonnelManagementEdit() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [type, setType] = useState<string>();
    const navigate = useNavigate();
    const personState = useAsync(async () => {
        if (id) {
            return await PersonnelManagementService.fetchPersonById(id);
        }
    }, [id]);

    useEffect(() => {
        if (id && personState.value) {
            form.setFieldsValue(personState.value);
            setType('edit');
        } else {
            setType('create');
        }
    }, [id, form, personState.value]);

    const [submitState, doFetch] = useAsyncFn(
        async values => {
            if (type === 'edit') {
                values.id = Number(id);
            }
            try {
                if (type === 'edit') {
                    await PersonnelManagementService.updatePerson(values);
                } else {
                    await PersonnelManagementService.createPerson(values);
                }
                message.success(type === 'edit' ? '更新人员信息成功' : '新建人员信息成功');
                navigate(PATH_ENUM.PERSONNEL_MANAGEMENT);
            } catch (error) {
                message.error(type === 'edit' ? '更新人员信息失败' : '新建人员信息失败');
            }
        },
        [type],
    );

    const formlist: LabelFormItem[] = [
        {
            label: '姓名',
            name: 'real_name',
            required: true,
        },
        {
            label: '性别',
            name: 'gender',
            required: true,
            children: <Radio.Group options={getSelectOptions(GENDER_TYPE_TEXT)} />
        },
        {
            label: "密码",
            name: "password",
            required: true,
            children: <Input.Password />
        },
        {
            label: "职位",
            name: "role",
            required: true,
            children: <Select options={getSelectOptions(ROLE_TYPE_TEXT)} />
        },
        {
            label: "所在部门",
            name: "division",
            required: true,
        },
        {
            label: "负责区域",
            name: "region",
            required: true,
        },
        {
            label: "报销补贴等级",
            name: "rank",
            required: true,
        },
        {
            label: "联系方式",
            name: "contact",
            required: true,
        },
        {
            label: "状态",
            name: "valid",
            required: true,
            children: <Radio.Group options={getSelectOptions(VALID_TYPE_TEXT)} />
        },
        {
            label: "权限",
            name: "right",
            required: true,
            children: <Select mode="multiple" options={getSelectOptions(RIGHT_TYPE_TEXT)} />
        },
        {
            label: "备注",
            name: "memo",
            children: <Input.TextArea />
        }

    ];

    return (
        <PageHeader
            title={id ? `编辑${id}` : '新建人员信息'}
            onBack={() => navigate(PATH_ENUM.PERSONNEL_MANAGEMENT)}
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
                    onClick={() => navigate(PATH_ENUM.PERSONNEL_MANAGEMENT)}
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
    )
}