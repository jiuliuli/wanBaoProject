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
      key: 'contactPerson',
      children: <>{data.contactPerson}</>,
    },
    {
      label: '联系人电话',
      key: 'contactPhone',
      children: <>{data.contactPhone}</>,
    },
    {
      label: '是否法定评价',
      key: 'highRisk',
      children: <>{data.highRisk}</>,
    },
    {
      label: '紧急程度',
      key: 'urgencyLevel',
      children: <>{data.urgencyLevel}</>,
    },
    {
      label: '下单时间',
      key: 'orderTime',
      children: <>{data.orderTime ? data.orderTime.split('T')[0] : '-'}</>,
    },
    {
      label: '项目状态',
      key: 'status',
      children: <>{data.status}</>,
    },
    {
      label: '目前进度',
      key: 'currentProgress',
      children: <>{data.currentProgress}</>,
    },
    {
      label: '需要送审的市级管理部门',
      key: 'cityDepartment',
      children: (
        <>
          {Array.isArray(data.cityDepartment)
            ? data.cityDepartment.join(', ')
            : data.cityDepartment}
        </>
      ),
    },
    {
      label: '需要送审的区级管理部门',
      key: 'districtDepartment',
      children: (
        <>
          {Array.isArray(data.districtDepartment)
            ? data.districtDepartment.join(', ')
            : data.districtDepartment}
        </>
      ),
    },
    {
      label: '特殊情况说明',
      key: 'specialNotes',
      children: <div style={{ whiteSpace: 'pre-wrap' }}>{data.specialNotes}</div>,
    },
    {
      label: '项目成员',
      key: 'projectMembers',
      children: (
        <>
          {Array.isArray(data.projectMembers)
            ? data.projectMembers.join(', ')
            : data.projectMembers}
        </>
      ),
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
