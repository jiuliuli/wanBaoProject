import { Button, Form, Input, Radio, Switch } from 'antd';
import { useEffect } from 'react';

interface RiskAnalysisEditProps {
    data?: any;
    onSubmit: (values: any) => Promise<void>;
}

export default function RiskAnalysisEdit({ data = {}, onSubmit }: RiskAnalysisEditProps) {
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        await onSubmit(values);
    };

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);

    return (
        <Form
            form={form}
            layout="horizontal"
            initialValues={data}
            onFinish={handleSubmit}
        >
            <div style={{ padding: '24px' }}>
                <Form.Item label="企业过往风险水平" name="companyVenture">
                    <Radio.Group options={[
                        { label: '高', value: '高' },
                        { label: '中', value: '中' },
                        { label: '低', value: '低' },
                        { label: '不清楚', value: '不清楚' },
                    ]} />
                </Form.Item>
                <Form.Item label="企业信誉水平" name="companyReputation">
                    <Radio.Group options={[
                        { label: '高', value: '高' },
                        { label: '中', value: '中' },
                        { label: '低', value: '低' },
                        { label: '不清楚', value: '不清楚' },
                    ]} />
                </Form.Item>
                <Form.Item label="行业风险特性" name="industryVenture">
                    <Radio.Group options={[
                        { label: '高', value: '高' },
                        { label: '中', value: '中' },
                        { label: '低', value: '低' },
                        { label: '不清楚', value: '不清楚' },
                    ]} />
                </Form.Item>
                <Form.Item label="周边环境" name="environment">
                    <Input />
                </Form.Item>
                <Form.Item label="是否在资质范围内" name="ifCredential" valuePropName="checked">
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                </Form.Item>
                <Form.Item label="评价人员专业是否满足" name="ifEvaluator" valuePropName="checked">
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                </Form.Item>
                <Form.Item label="项目是否有备案或核准" name="ifRecord">
                    <Radio.Group options={[
                        { label: '有', value: '有' },
                        { label: '否', value: '否' },
                        { label: '不需要', value: '不需要' },
                    ]} />
                </Form.Item>
                <Form.Item label="是否有可行性研究报告" name="ifAnalysis">
                    <Radio.Group options={[
                        { label: '有', value: '有' },
                        { label: '否', value: '否' },
                        { label: '不需要', value: '不需要' },
                    ]} />
                </Form.Item>
                <Form.Item label="是否有安全设施设计" name="ifSafety">
                    <Radio.Group options={[
                        { label: '有', value: '有' },
                        { label: '否', value: '否' },
                        { label: '不需要', value: '不需要' },
                    ]} />
                </Form.Item>
                <Form.Item label="如果存在问题企业是否可以配合" name="ifRectification" valuePropName="checked">
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                </Form.Item>
                <Form.Item label="主要风险" name="mainVenture">
                    <Input />
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        保存风险分析
                    </Button>
                </div>
            </div>
        </Form>
    );
} 