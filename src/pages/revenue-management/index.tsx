import AutoTag from '@/components/AutoTag';
import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import RevenueManagementService from '@/services/revenue.service';
import { RevenueVO } from '@/types/revenue.types';
import { useNavigate } from '@umijs/max';
import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from '../styles.less';

const getColumns = (navigate: (path: string) => void) => [
  {
    title: '收款单号',
    dataIndex: 'revenueNumber',
    key: 'revenueNumber',
    align: 'center',
  },
  {
    title: '执行人',
    dataIndex: 'operator',
    key: 'operator',
    align: 'center',
  },
  {
    title: '合同号',
    dataIndex: 'contractNumber',
    key: 'contractNumber',
    align: 'center',
  },
  {
    title: '尾款',
    dataIndex: 'phase',
    key: 'phase',
    align: 'center',
    render: (text: string) => `第${text}期`,
  },
  {
    title: '到账金额',
    dataIndex: 'payment',
    key: 'payment',
    align: 'center',
    render: (text: string) => `${text}元`,
  },
  {
    title: '合同付款时间',
    dataIndex: 'revenueTime',
    key: 'revenueTime',
    align: 'center',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
  },
  {
    title: '到款状态',
    dataIndex: 'receive',
    key: 'receive',
    align: 'center',
    render: (text: string) => <AutoTag options={['已到账', '未到账']} value={text} />,
  },
  {
    title: '开票时间',
    dataIndex: 'invoiceTime',
    key: 'invoiceTime',
    align: 'center',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
  },
  {
    title: '操作',
    align: 'center',
    render: (data: RevenueVO) => (
      <Button
        type="link"
        onClick={() =>
          navigate(PATH_ENUM.REVENUE_MANAGEMENT_EDIT.replace(':id', data.revenueNumber))
        }
      >
        详情
      </Button>
    ),
  },
];

export default function RevenueManagementList() {
  const navigate = useNavigate();
  const [params] = useState({});

  const [state, doFetch] = useTableDataFn({
    Fetch: RevenueManagementService.fetchRevenueList,
    params: params,
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>收款管理</h2>
        <Button
          type="primary"
          onClick={() => navigate(PATH_ENUM.REVENUE_MANAGEMENT_CREATE)}
          className={styles.createButton}
        >
          新建收款单
        </Button>
      </div>

      <SearchForm
        className={styles['search-form']}
        onFinish={values => {
          doFetch(values);
        }}
        columns={[
          {
            name: 'revenueNumber',
            title: '收款单号',
            valueType: 'text',
          },
          {
            name: 'operator',
            title: '执行人',
            valueType: 'text',
          },
          {
            name: 'contractNumber',
            title: '合同号',
            valueType: 'text',
          },
        ]}
      />

      <div className={styles.table}>
        <Table
          rowKey="id"
          loading={state.loading}
          columns={getColumns(navigate) as any}
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
}
