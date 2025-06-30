import ProjectManagementService from '@/services/project-management.service';
import { BasicInfoVO } from '@/types/project.types';
import { Button, Form, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';

interface ProjectBudgetEditProps {
    data: BasicInfoVO;
    onSubmit: (values: any) => void;
    amount: number;
}


function getAmount(data: any, amount: number) {
    const {
        travelFee = 0,
        printFee = 0,
        entertainFee = 0,
        channelFee = 0,
        compileCost = 0,
        delegateCost = 0,
        apportionFee = 0,
        marketCommission = 0,
        technicalCommission = 0,
        firstAudit = 0,
        techAudit = 0,
        projectAudit = 0,
        reviewAudit = 0,
        signFee = 0,
        cooperateFee = 0,
        taxFee = 0,
        otherFee = 0,
    } = data || {};

    const total =
        travelFee +
        printFee +
        entertainFee +
        channelFee +
        compileCost +
        delegateCost +
        apportionFee +
        marketCommission +
        technicalCommission +
        firstAudit +
        techAudit +
        projectAudit +
        reviewAudit +
        signFee +
        cooperateFee +
        taxFee +
        otherFee;

    return amount - total;
}

export default function ProjectBudgetEdit({ data, onSubmit, amount }: ProjectBudgetEditProps) {
    const [form] = Form.useForm();
    const [result, setResult] = useState(amount - amount * 0.17);
    const [dayCount, setDayCount] = useState(0);
    const [initAmount, setInitAmount] = useState(data.amount === amount ? data.amount : amount);
    const percentState = useAsync(async () => {
        return await ProjectManagementService.fetchPercent();
    });


    useEffect(() => {
        setDayCount(percentState.value?.find((item: any) => item.item === '平均日工资').value);
    }, [percentState.value]);

    const handleSubmit = async (values: any) => {
        await onSubmit(values);
    };

    useEffect(() => {
        let initData = {};
        if (data.amount !== amount) {
            setResult(amount - amount * 0.17);
            initData = {
                taxFee: amount * 0.07,
                firstAudit: amount * 0.01,
                techAudit: amount * 0.04,
                projectAudit: amount * 0.05,
            };
        } else {
            initData = {
                ...data,
            };
            setResult(getAmount(data, data.amount));
        }
        setInitAmount(data.amount === amount ? data.amount : amount);
        form.setFieldsValue(initData);
    }, [data, amount]);


    return (
        percentState.value &&
        <Form
            form={form}
            layout="horizontal"
            initialValues={data}
            onFinish={handleSubmit}
            onValuesChange={(changedValues, allValues) => {
                let {
                    taskDays,
                    travelFee = 0,
                    printFee = 0,
                    entertainFee = 0,
                    channelFee = 0,
                    compileCost = 0,
                    delegateCost = 0,
                    apportionFee = 0,
                    marketCommission = 0,
                    technicalCommission = 0,
                    firstAudit = 0,
                    techAudit = 0,
                    projectAudit = 0,
                    reviewAudit = 0,
                    signFee = 0,
                    cooperateFee = 0,
                    taxFee = 0,
                    otherFee = 0,
                } = allValues;

                // 如果工时发生变化，优先用最新工时算出新的编制成本
                if (changedValues.taskDays !== undefined) {
                    compileCost = changedValues.taskDays * dayCount;
                    form.setFieldsValue({ compileCost });
                }

                // 计算所有费用总和，compileCost 用最新值
                const totalCost =
                    travelFee +
                    printFee +
                    entertainFee +
                    channelFee +
                    compileCost +
                    delegateCost +
                    apportionFee +
                    marketCommission +
                    technicalCommission +
                    firstAudit +
                    techAudit +
                    projectAudit +
                    reviewAudit +
                    signFee +
                    cooperateFee +
                    taxFee +
                    otherFee;

                // 计算成本核算结果
                const result = initAmount - totalCost;
                setResult(result);
            }}
        >
            <div style={{ padding: '24px' }}>
                <Form.Item label="工时" name="taskDays">
                    <InputNumber
                        style={{ width: '100%' }}
                        onChange={(value: any) => form.setFieldsValue({ compileCost: value * dayCount })}
                    />
                </Form.Item>
                <Form.Item label="差旅费" name="travelFee">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="打印装订费" name="printFee">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="招待费" name="entertainFee">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="渠道费" name="channelFee">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="编制成本" name="compileCost">
                    <InputNumber style={{ width: '100%' }} disabled precision={2} />
                </Form.Item>
                <Form.Item label="委外成本" name="delegateCost">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="分摊成本" name="apportionFee">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="市场提成" name="marketCommission">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="技术提成" name="technicalCommission">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="审核人审核费" name="firstAudit">
                    <InputNumber style={{ width: '100%' }} disabled precision={2} />
                </Form.Item>
                <Form.Item label="技术负责人审核费" name="techAudit">
                    <InputNumber style={{ width: '100%' }} disabled precision={2} />
                </Form.Item>
                <Form.Item label="项目负责人审核费" name="projectAudit">
                    <InputNumber style={{ width: '100%' }} disabled precision={2} />
                </Form.Item>
                <Form.Item label="评审费" name="reviewAudit">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="签字费" name="signFee">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="公司协助发生的费用" name="cooperateFee">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="增值税费" name="taxFee" initialValue={0.00}>
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <Form.Item label="其他费用" name="otherFee">
                    <InputNumber style={{ width: '100%' }} precision={2} />
                </Form.Item>
                <div style={{ margin: '16px 0' }}>
                    成本核算结果：{result > 0 ? <span style={{ color: 'green' }}>通过</span> : <span style={{ color: 'red' }}>不通过</span>} - 毛利润：{getAmount(form.getFieldsValue(), initAmount)}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" disabled={result < 0}>
                        保存项目预算
                    </Button>
                </div>
            </div>
        </Form>
    );
} 