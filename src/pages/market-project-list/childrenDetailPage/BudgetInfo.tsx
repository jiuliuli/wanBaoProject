import { BasicInfoVO } from '@/types/project.types';
import { Card, Descriptions } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';

type BudgetInfoProps = {
  data: BasicInfoVO;
};

export default function BudgetInfo({ data }: BudgetInfoProps) {
  const items: DescriptionsItemType[] = [
    {
      label: '工时',
      key: 'taskDays',
      children: <>{data.taskDays || 0}</>,
    },
    {
      label: '差旅费',
      key: 'travelFee',
      children: <>{data.travelFee || 0}</>,
    },
    {
      label: '打印装订费',
      key: 'printFee',
      children: <>{data.printFee || 0}</>,
    },
    {
      label: '招待费',
      key: 'entertainFee',
      children: <>{data.entertainFee || 0}</>,
    },
    {
      label: '渠道费',
      key: 'channelFee',
      children: <>{data.channelFee || 0}</>,
    },
    {
      label: '编制成本',
      key: 'compileCost',
      children: <>{data.compileCost || 0}</>,
    },
    {
      label: '委外成本',
      key: 'delegateCost',
      children: <>{data.delegateCost || 0}</>,
    },
    {
      label: '分摊成本',
      key: 'apportionFee',
      children: <>{data.apportionFee || 0}</>,
    },
    {
      label: '市场提成',
      key: 'marketCommission',
      children: <>{data.marketCommission || 0}</>,
    },
    {
      label: '技术提成',
      key: 'technicalCommission',
      children: <>{data.technicalCommission || 0}</>,
    },
    {
      label: '审核人审核费',
      key: 'firstAudit',
      children: <>{data.firstAudit || 0}</>,
    },
    {
      label: '技术负责人审核费',
      key: 'techAudit',
      children: <>{data.techAudit || 0}</>,
    },
    {
      label: '项目负责人审核费',
      key: 'projectAudit',
      children: <>{data.projectAudit || 0}</>,
    },
    {
      label: '评审费',
      key: 'reviewAudit',
      children: <>{data.reviewAudit || 0}</>,
    },
    {
      label: '签字费',
      key: 'signFee',
      children: <>{data.signFee || 0}</>,
    },
    {
      label: '公司协助发生的费用',
      key: 'cooperateFee',
      children: <>{data.cooperateFee || 0}</>,
    },
    {
      label: '增值税费',
      key: 'taxFee',
      children: <>{data.taxFee || 0}</>,
    },
    {
      label: '其他费用',
      key: 'otherFee',
      children: <>{data.otherFee || 0}</>,
    },
  ];

  return (
    <Card>
      <Descriptions items={items} column={3} labelStyle={{ fontWeight: 'bold' }} />
    </Card>
  );
}
