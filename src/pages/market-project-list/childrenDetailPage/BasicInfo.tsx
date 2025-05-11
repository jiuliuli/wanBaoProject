import { BasicInfoVO } from '@/types/project.types';
import { Card, Space } from 'antd';
import Descriptions, { DescriptionsItemType } from 'antd/es/descriptions';

type BasicInfoProps = {
  data: BasicInfoVO;
};

export default function BasicInfo({ data }: BasicInfoProps) {
  const items: DescriptionsItemType[] = [
    {
      label: '项目编号',
      key: 'projectNumber',
      children: <strong>{data.projectNumber}</strong>,
    },
    {
      label: '项目名称',
      key: 'projectName',
      children: <strong>{data.projectName}</strong>,
    },
    {
      label: '项目简称',
      key: 'shortName',
      children: <>{data.shortName}</>,
    },
    {
      label: '客户名称',
      key: 'customerName',
      children: <>{data.customerName}</>,
    },
    {
      label: '项目所在地址',
      key: 'address',
      children: <>{data.address}</>,
    },
    {
      label: '市场类型',
      key: 'source',
      children: <>{data.source}</>,
    },
    {
      label: '所属行业',
      key: 'industryType',
      children: <>{data.industryType}</>,
    },
    {
      label: '项目类型',
      key: 'evaluateType',
      children: <>{data.evaluateType}</>,
    },
    {
      label: '是否法定评价',
      key: 'highRisk',
      children: <>{data.highRisk}</>,
    },
    {
      label: '立项人',
      key: 'establisher',
      children: <>{data.establisher}</>,
    },
    {
      label: '合同额',
      key: 'amount',
      children: <>{data.amount}</>,
    },
    {
      label: '完成时间',
      key: 'finishedTime',
      children: <>{data.finishedTime}</>,
    },
    {
      label: '紧急程度',
      key: 'urgencyLevel',
      children: <>{data.urgencyLevel}</>,
    },
    {
      label: '需要送审的管理部门',
      key: 'bureau',
      children: <>{data.bureau}</>,
    },
    {
      label: '项目描述',
      key: 'describe',
      span: 2,
      children: <div style={{ whiteSpace: 'pre-wrap' }}>{data.describe}</div>,
    },
    {
      label: '公司信誉',
      key: 'companyVenture',
      children: <>{data.companyVenture}</>,
    },
    {
      label: '周边环境',
      key: 'environment',
      children: <div style={{ whiteSpace: 'pre-wrap' }}>{data.environment}</div>,
    },
    {
      label: '是否外聘专家',
      key: 'expert',
      children: <>{data.expert}</>,
    },
    {
      label: '项目规模',
      key: 'projectScale',
      children: <>{data.projectScale}</>,
    },
    {
      label: '技术风险',
      key: 'technicalVenture',
      children: <>{data.technicalVenture}</>,
    },
    {
      label: '主要风险',
      key: 'mainVenture',
      children: <>{data.mainVenture}</>,
    },
    {
      label: '风险因素',
      key: 'ventureFactor',
      children: <>{data.ventureFactor}</>,
    },
    {
      label: '差旅费',
      key: 'travelFee',
      children: <>{data.travelFee}</>,
    },
    {
      label: '打印装订费',
      key: 'printFee',
      children: <>{data.printFee}</>,
    },
    {
      label: '招待费',
      key: 'entertainFee',
      children: <>{data.entertainFee}</>,
    },
    {
      label: '渠道费',
      key: 'channelFee',
      children: <>{data.channelFee}</>,
    },
    {
      label: '工时',
      key: 'taskDays',
      children: <>{data.taskDays}</>,
    },
    {
      label: '编制成本',
      key: 'compileCost',
      children: <>{data.compileCost}</>,
    },
    {
      label: '委外成本',
      key: 'delegateCost',
      children: <>{data.delegateCost}</>,
    },
    {
      label: '分摊成本',
      key: 'apportionFee',
      children: <>{data.apportionFee}</>,
    },
    {
      label: '市场提成',
      key: 'marketCommission',
      children: <>{data.marketCommission}</>,
    },
    {
      label: '技术提成',
      key: 'technicalCommission',
      children: <>{data.technicalCommission}</>,
    },
    {
      label: '审核人审核费',
      key: 'firstAudit',
      children: <>{data.firstAudit}</>,
    },
    {
      label: '技术负责人审核费',
      key: 'techAudit',
      children: <>{data.techAudit}</>,
    },
    {
      label: '项目负责人审核费',
      key: 'projectAudit',
      children: <>{data.projectAudit}</>,
    },
    {
      label: '评审费',
      key: 'reviewAudit',
      children: <>{data.reviewAudit}</>,
    },
    {
      label: '签字费',
      key: 'signFee',
      children: <>{data.signFee}</>,
    },
    {
      label: '公司协助发生的费用',
      key: 'cooperateFee',
      children: <>{data.cooperateFee}</>,
    },
    {
      label: '增值税费',
      key: 'taxFee',
      children: <>{data.taxFee}</>,
    },
    {
      label: '其他费用',
      key: 'otherFee',
      children: <>{data.otherFee}</>,
    },
    {
      label: '前期文件',
      key: 'report',
      children: <>{data.report}</>,
    },
    {
      label: '项目状态',
      key: 'status',
      children: <>{data.status}</>,
    },
    {
      label: '项目负责人',
      key: 'director',
      children: <>{data.director}</>,
    },
    {
      label: '编制人',
      key: 'compiler',
      children: <>{data.compiler}</>,
    },
    {
      label: '创建时间',
      key: 'createTime',
      children: <>{data.createTime}</>,
    },
    {
      label: '创建人',
      key: 'createBy',
      children: <>{data.createBy}</>,
    },
    {
      label: '联系人',
      key: 'contactPerson',
      children: <>{data.contactPerson}</>,
    },
    {
      label: '联系人电话',
      key: 'contactPhone',
      children: <>{data.contactPhone}</>,
    },
    {
      label: '合同签订时间',
      key: 'orderTime',
      children: <>{data.orderTime}</>,
    },
    {
      label: '目前进度',
      key: 'currentProgress',
      children: <>{data.currentProgress}</>,
    },
    {
      label: '需要送审的市级管理部门',
      key: 'cityDepartment',
      children: <>{data.cityDepartment?.join(', ')}</>,
    },
    {
      label: '需要送审的区级管理部门',
      key: 'districtDepartment',
      children: <>{data.districtDepartment?.join(', ')}</>,
    },
    {
      label: '特殊情况说明',
      key: 'specialNotes',
      children: <div style={{ whiteSpace: 'pre-wrap' }}>{data.specialNotes}</div>,
    },
  ];

  return (
    data && (
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Descriptions
            bordered
            items={items}
            column={2}
            size="middle"
            labelStyle={{ fontWeight: 'bold', backgroundColor: '#fafafa' }}
          />
        </Space>
      </Card>
    )
  );
}
