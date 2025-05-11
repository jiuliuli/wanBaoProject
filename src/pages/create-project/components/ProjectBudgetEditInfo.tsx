import LabelForm from '@/components/LabelForm';
import { LabelFormItem } from '@/components/LabelForm/types';
import { useNavigate } from '@umijs/max';
import { Button, InputNumber, Radio } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useAsyncFn } from 'react-use';

export default function ProjectBudgetEditInfo() {
  const navigate = useNavigate();
  const [form] = useForm();

  const [submitState, doFetch] = useAsyncFn(async () => {
    // 保存成功后跳转到合同信息tab
    navigate('?tab=ContractEditInfo');
  });

  const formItems: LabelFormItem[] = [
    {
      label: '渠道费',
      name: 'channelFee',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入渠道费" />,
    },
    {
      label: '工时',
      name: 'workHours',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入工时" />,
    },
    {
      label: '差旅费',
      name: 'travelExpense',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入差旅费" />,
    },
    {
      label: '评审费',
      name: 'reviewFee',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入评审费" />,
    },
    {
      label: '公司协助发生的费用',
      name: 'companyAssistanceFee',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入公司协助发生的费用" />,
    },
    {
      label: '委外成本',
      name: 'outsourcingCost',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入委外成本" />,
    },
    {
      label: '技术提成',
      name: 'technicalCommission',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入技术提成" />,
    },
    {
      label: '市场提成',
      name: 'marketCommission',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入市场提成" />,
    },
    {
      label: '签字费',
      name: 'signatureFee',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入签字费" />,
    },
    {
      label: '装订费',
      name: 'bindingFee',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入装订费" />,
    },
    {
      label: '招待费',
      name: 'entertainmentFee',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入招待费" />,
    },
    {
      label: '分摊成本',
      name: 'sharedCost',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入分摊成本" />,
    },
    {
      label: '其他',
      name: 'otherCost',
      required: true,
      children: <InputNumber style={{ width: '100%' }} placeholder="请输入其他费用" />,
    },
    {
      label: '成本核算结果',
      name: 'costCalculationResult',
      required: true,
      children: (
        <Radio.Group>
          <Radio value="pass">通过</Radio>
          <Radio value="fail">不通过</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (
    <div>
      <LabelForm
        props={{
          form,
          onFinish: doFetch,
        }}
        formlist={formItems}
      />
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button type="primary" onClick={() => form.submit()} loading={submitState.loading}>
          保存并继续
        </Button>
      </div>
    </div>
  );
}
