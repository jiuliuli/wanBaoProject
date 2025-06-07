import AutoTag from '@/components/AutoTag';
import SearchForm from '@/components/SearchForm';
import PATH_ENUM from '@/components/routes/path';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import { ContractService } from '@/services/ContractService';
import { Contract } from '@/types/contract.types';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles.less';

const getColumns = (navigate: any): ColumnsType<Contract> => [
  {
    title: '合同编号',
    dataIndex: 'contractNumber',
    key: 'contractNumber',
    align: 'center',
  },
  {
    title: '合同标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: '合同类型',
    dataIndex: 'contractType',
    key: 'contractType',
    align: 'center',
    render: (contractType: string) => (
      <AutoTag options={['主合同', '分合同', '补充合同']} value={contractType} />
    ),
  },
  {
    title: '合同额',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
    render: (amount: number) => `¥${amount.toFixed(2)}`,
  },
  {
    title: '合同签订时间',
    dataIndex: 'signDate',
    key: 'signDate',
    align: 'center',
    render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
  },
  {
    title: '付款方式',
    dataIndex: 'payMode',
    key: 'payMode',
    align: 'center',
  },
  {
    title: '合同状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (status: string) => (
      <AutoTag options={['待审批', '待盖章', '待签订', '已签订', '已存档']} value={status} />
    ),
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
    align: 'center',
  },
  {
    title: '创建人',
    dataIndex: 'establisher',
    key: 'establisher',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="link"
          onClick={() => navigate(PATH_ENUM.CONTRACT_EDIT.replace(':id', record.contractNumber))}
        >
          详情
        </Button>
      </Space>
    ),
  },
];

const ContractManagement: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useState({});

  const [state, doFetch] = useTableDataFn({
    Fetch: ContractService.getContractList,
    params: params,
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>合同管理</h2>
      </div>

      <SearchForm
        className={styles['search-form']}
        onFinish={values => {
          doFetch(values);
        }}
        columns={[
          {
            name: 'contractNumber',
            title: '合同编号',
            valueType: 'text',
          },
          {
            name: 'title',
            title: '合同标题',
            valueType: 'text',
          },
        ]}
      />

      <div className={styles.table}>
        <Table
          rowKey="contractNumber"
          loading={state.loading}
          columns={getColumns(navigate)}
          {...state.value}
          scroll={{ x: 1000 }}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条`,
            defaultPageSize: 10,
          }}
        />
      </div>
    </div>
  );
};

export default ContractManagement;
