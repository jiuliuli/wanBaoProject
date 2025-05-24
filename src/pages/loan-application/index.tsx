import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import LoanApplicationService from '@/services/loanApplication.service';
import { PageHeader } from '@ant-design/pro-layout';
import { useNavigate } from '@umijs/max';
import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import styles from '../styles.less';
const getColumns = (navigate: (path: string) => void) => [
  {
    title: '借款单号',
    dataIndex: 'loanNumber',
    align: 'center',
  },
  {
    title: '申请人',
    dataIndex: 'maker',
    align: 'center',
  },
  {
    title: '借款人',
    dataIndex: 'debtor',
    align: 'center',
  },
  {
    title: '项目编号',
    dataIndex: 'projectNumber',
    align: 'center',
  },
  {
    title: '借款事由',
    dataIndex: 'purpose',
    align: 'center',
  },
  {
    title: '借款金额',
    dataIndex: 'amount',
    align: 'center',
  },
  {
    title: '计划借款时间',
    dataIndex: 'payTime',
    align: 'center',
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : '-'),
  },
  {
    title: '计划还款时间',
    dataIndex: 'returnTime',
    align: 'center',
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : '-'),
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    render: (text: any, record: any) => (
      <Button
        type="link"
        onClick={() => navigate(PATH_ENUM.LOAN_APPLICATION_EDIT.replace(':id', record.loanNumber))}
      >
        编辑
      </Button>
    ),
  },
];

const LoanApplication: React.FC = () => {
  const [params] = useState({});
  const navigate = useNavigate();

  const [state, doFetch] = useTableDataFn({
    Fetch: LoanApplicationService.fetchLoanApplicationList,
    params: params,
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <>
      <PageHeader
        title={'借款申请列表'}
        style={{ background: '#ffffff' }}
        extra={[
          <Button
            key="create"
            type="primary"
            onClick={() => navigate(PATH_ENUM.LOAN_APPLICATION_CREATE)}
          >
            新建借款申请
          </Button>,
        ]}
      >
        <SearchForm
          className={styles['search-form']}
          onFinish={values => {
            doFetch(values);
          }}
          columns={[
            {
              name: 'loanNumber',
              title: '借款单号',
              valueType: 'text',
            },
            {
              name: 'maker',
              title: '申请人',
              valueType: 'text',
            },
            {
              name: 'debtor',
              title: '借款人',
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
      </PageHeader>
    </>
  );
};

export default LoanApplication;
