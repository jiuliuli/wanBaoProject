import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import ProjectManagementService from '@/services/project-management.service';
import { Button, InputNumber } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

type Props = {
  amount: number;
  onFinish: (values: any) => void;
};

export default function ProjectBudgetEditInfo({ amount, onFinish }: Props) {
  const [form] = useForm();
  const [dayCount, setDayCount] = useState(0);
  const [pass, setPass] = useState(true);
  const [result, setResult] = useState(amount - amount * 0.17);

  useEffect(() => {
    form.resetFields();
    setResult(amount - amount * 0.17);
    setPass(true);
  }, [amount, form]);

  const [submitState, doFetch] = useAsyncFn(async () => {
    onFinish(form.getFieldsValue());
  });

  const percentState = useAsync(async () => {
    return await ProjectManagementService.fetchPercent();
  });

  useEffect(() => {
    setDayCount(percentState.value?.find((item: any) => item.item === '平均日工资').value);
  }, [percentState.value]);

  const formItems: LabelFormItem[] = [
    {
      label: '工时',
      name: 'taskDays',
      children: (
        <InputNumber
          onChange={(value: any) => form.setFieldsValue({ compileCost: value * dayCount })}
        />
      ),
    },
    { label: '差旅费', name: 'travelFee', children: <InputNumber /> },
    { label: '打印装订费', name: 'printFee', children: <InputNumber /> },
    { label: '招待费', name: 'entertainFee', children: <InputNumber /> },
    { label: '渠道费', name: 'channelFee', children: <InputNumber /> },

    { label: '编制成本', name: 'compileCost', children: <InputNumber disabled /> },
    { label: '委外成本', name: 'delegateCost', children: <InputNumber /> },
    { label: '分摊成本', name: 'apportionFee', children: <InputNumber /> },
    { label: '市场提成', name: 'marketCommission', children: <InputNumber /> },
    { label: '技术提成', name: 'technicalCommission', children: <InputNumber /> },
    {
      label: '审核人审核费',
      name: 'firstAudit',
      initialValue: amount * 0.01,
      children: <InputNumber disabled />,
    },
    {
      label: '技术负责人审核费',
      name: 'techAudit',
      initialValue: amount * 0.04,
      children: <InputNumber disabled />,
    },
    {
      label: '项目负责人审核费',
      name: 'projectAudit',
      initialValue: amount * 0.05,
      children: <InputNumber disabled />,
    },
    { label: '评审费', name: 'reviewAudit', children: <InputNumber /> },
    { label: '签字费', name: 'signFee', children: <InputNumber /> },
    { label: '公司协助发生的费用', name: 'cooperateFee', children: <InputNumber /> },
    { label: '增值税费', name: 'taxFee', initialValue: amount * 0.07, children: <InputNumber precision={2} /> },
    { label: '其他费用', name: 'otherFee', children: <InputNumber /> },
  ];

  return (
    <div>
      <LabelForm
        props={{
          form,
          onFinish: doFetch,
          onValuesChange: (changedValues, allValues) => {
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

            if (changedValues.taskDays !== undefined) {
              compileCost = changedValues.taskDays * dayCount;
              form.setFieldsValue({ compileCost });
            }

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
            const result = amount - totalCost;
            setPass(result > 0);
            setResult(result);
          },
        }}
        formlist={formItems}
      />
      <>
        成本核算结果:{' '}
        {pass ? (
          <span style={{ color: 'green' }}>通过 - 毛利润：{result}</span>
        ) : (
          <span style={{ color: 'red' }}>不通过 - 毛利润：{result}</span>
        )}
      </>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button
          type="primary"
          onClick={() => form.submit()}
          loading={submitState.loading}
          disabled={!pass}
        >
          保存并继续
        </Button>
      </div>
    </div>
  );
}
