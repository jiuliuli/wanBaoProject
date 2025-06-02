import { BasicInfoVO } from '@/types/project.types';
import { Card, Descriptions, Space } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';

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
      label: '企业名称',
      key: 'customerName',
      children: <>{data.customerName}</>,
    },
    {
      label: '项目所在地址',
      key: 'address',
      children: <>{data.address}</>,
    },
    {
      label: '行业类型',
      key: 'industryType',
      children: <>{data.industryType}</>,
    },
    {
      label: '项目类型',
      key: 'projectType',
      children: <>{data.projectType}</>,
    },
    {
      label: '联系人',
      // key: "contact",
      children: <></>,
    },
    {
      label: '联系电话',
      // key: "phone",
      children: <></>,
    },

    {
      label: '项目来源',
      key: 'source',
      children: <>{data.source}</>,
    },

    {
      label: '项目负责人',
      key: 'director',
      children: <>{data.director}</>,
    },
    {
      label: '评价类型',
      key: 'evaluateType',
      children: <>{data.evaluateType}</>,
    },
    {
      label: '是否法定 ',
      key: 'highRisk',
      children: <>{data.highRisk}</>,
    },
    {
      label: '编制人',
      key: 'compiler',
      children: <>{data.compiler}</>,
    },
    {
      label: '送审报告',
      key: 'report',
      children: <>{data.report}</>,
    },
    {
      label: '送审部门',
      key: 'bureau',
      children: <>{Array.isArray(data.bureau) ? data.bureau.join(', ') : data.bureau}</>,
    },
    {
      label: '投标保证金',
      key: 'bidBond',
      children: <strong style={{ color: '#1890ff' }}>{data.bidBond}元</strong>,
    },
    {
      label: '项目金额',
      key: 'amount',
      children: <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{data.amount}元</span>,
    },
    {
      label: '项目进行阶段',
      key: 'status',
      children: <>{data.status}</>,
    },
    {
      label: '送审数量',
      key: 'auditQuantity',
      children: <>{data.auditQuantity || 0}</>,
    },
    {
      label: '备案数量',
      key: 'backupQuantity',
      children: <>{data.backupQuantity || 0}</>,
    },
    {
      label: '公司风险',
      key: 'companyVenture',
      children: <>{data.companyVenture}</>,
    },
    {
      label: '技术风险',
      key: 'technicalVenture',
      children: <>{data.technicalVenture}</>,
    },
    {
      label: '行业风险',
      key: 'industryVenture',
      children: <>{data.industryVenture}</>,
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
      label: '项目规模',
      key: 'projectScale',
      children: <>{data.projectScale}</>,
    },
    {
      label: '项目类型',
      key: 'projectType',
      children: <>{data.projectType}</>,
    },
    {
      label: '差旅费',
      key: 'travelFee',
      children: <>{data.travelFee}</>,
    },
    {
      label: '打印费',
      key: 'printFee',
      children: <>{data.printFee}</>,
    },
    {
      label: '渠道费',
      key: 'channelFee',
      children: <>{data.channelFee}</>,
    },
    {
      label: '编制成本',
      key: 'compileCost',
      children: <>{data.compileCost}</>,
    },
    {
      label: '市场提成',
      key: 'commissionFee',
      children: <>{data.commissionFee}</>,
    },
    {
      label: '审核费',
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
      label: '增值税费',
      key: 'taxFee',
      children: <>{data.taxFee}</>,
    },
    {
      label: '是否外聘专家',
      key: 'expert',
      children: <>{data.expert}</>,
    },
    {
      label: '环境',
      key: 'environment',
      children: <>{data.environment}</>,
    },
    {
      label: '创建时间',
      key: 'startTime',
      children: data.startTime.split('T')[0],
    },
    {
      label: '计划完成日期',
      key: 'endTime',
      children: data.endTime ? data.endTime.split('T')[0] : '-',
    },
    {
      label: '实际完成时间',
      key: 'finishedTime',
      children: data.finishedTime ? data.finishedTime.split('T')[0] : '-',
    },
    {
      label: '项目工作内容',
      key: 'describe',
      children: <div style={{ whiteSpace: 'pre-wrap' }}>{data.describe}</div>,
    },
    {
      label: '创建人',
      key: 'establisher',
      children: <>{data.establisher}</>,
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
