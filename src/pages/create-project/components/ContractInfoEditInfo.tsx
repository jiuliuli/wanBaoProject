import PATH_ENUM from "@/components/routes/path";
import { ContractService } from "@/services/ContractService";
import PersonnelService from "@/services/personnel.service";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "@umijs/max";
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Space, Upload } from "antd";
import { useState } from "react";
import { useAsync } from "react-use";

type Props = {
    projectNumber: string;
}

export default function ContractInfoEditInfo({ projectNumber }: Props) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [userName] = useState<string>(localStorage.getItem('user') || '');

    const staffListState = useAsync(async () => {
        return await PersonnelService.fetchPersonnelList({});
    });

    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            const submitData = {
                ...values,
                signDate: values.signDate?.format('YYYY-MM-DD'),
            };

            await ContractService.createContract(submitData);
            message.success('创建合同成功');
            navigate(PATH_ENUM.MARKET_PROJECTS_LIST);
        } catch (error) {
            console.error('保存合同失败:', error);
            message.error('保存合同失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        staffListState.value &&
        staffListState.value.length > 0 && (
            <Form form={form} layout="horizontal" onFinish={handleSubmit}>
                <div style={{ padding: '24px' }}>
                    <h3>合同信息</h3>
                    <Form.Item
                        name={['contract', 'title']}
                        label="合同标题"
                        rules={[{ required: true, message: '请输入合同标题' }]}
                    >
                        <Input placeholder="请输入合同标题" />
                    </Form.Item>
                    <Form.Item
                        initialValue={projectNumber}
                        name={['contract', 'contractNumber']}
                        label="项目编号"
                        rules={[{ required: true, message: '请输入项目编号' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        name={['contract', 'contractType']}
                        label="合同类型"
                        rules={[{ required: true, message: '请选择合同类型' }]}
                    >
                        <Select placeholder="请选择合同类型" options={[
                            { label: '主合同', value: '主合同' },
                            { label: '补充合同', value: '补充合同' },
                        ]} />
                    </Form.Item>

                    <Form.Item
                        name={['contract', 'amount']}
                        label="合同金额"
                        rules={[{ required: true, message: '请输入合同金额' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            precision={2}
                            placeholder="请输入合同金额"
                            prefix="¥"
                        />
                    </Form.Item>

                    <Form.Item
                        name={['contract', 'signDate']}
                        label="签订日期"
                        rules={[{ required: true, message: '请选择签订日期' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name={['contract', 'payMode']}
                        label="支付方式"
                        rules={[{ required: true, message: '请输入支付方式' }]}
                    >
                        <Input placeholder="请输入支付方式" />
                    </Form.Item>

                    <Form.Item name={['contract', 'document']} label="合同文档">
                        <Upload
                            action={`/v1/singleFileUpload?token=${userName}`}
                            listType="text"
                            onChange={({ file }) => {
                                if (file.status === 'done') {
                                    message.success(`${file.name} 上传成功`);
                                    form.setFieldsValue({
                                        contract: {
                                            ...form.getFieldValue('contract'),
                                            document: file.response.data,
                                        },
                                    });
                                } else if (file.status === 'error') {
                                    message.error(`${file.name} 上传失败`);
                                }
                            }}
                        >
                            <Button>点击上传</Button>
                        </Upload>
                    </Form.Item>

                    <h3>付款约定</h3>
                    <Form.List name="revenues">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item {...restField} name={[name, 'phase']}>
                                            <Input placeholder="付款期数" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'qualification']}>
                                            <Input placeholder="付款条件" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'amount']}>
                                            <InputNumber placeholder="付款额" suffix="元" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'memo']}>
                                            <Input placeholder="备注" style={{ width: 500 }} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        添加付款约定记录
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{ marginRight: 16 }}
                        >
                            保存新建合同
                        </Button>
                        <Button onClick={() => navigate(PATH_ENUM.CONTRACT_MANAGEMENT)}>取消</Button>
                    </Form.Item>
                </div>
            </Form>
        )
    );
}