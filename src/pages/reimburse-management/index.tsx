import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import ReimburseManagementService from '@/services/reimburse-manage.service';
import { useNavigate } from '@umijs/max';
import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import styles from '../styles.less';

type TableItem = Record<string, any>;

const getColumns = (navigate: (path: string) => void) => [
  {
    title: '报销人',
    dataIndex: 'reimburser',
    width: 100,
    align: 'center' as const,
  },
  {
    title: '项目编号',
    dataIndex: 'projectNumber',
    width: 200,
    align: 'center' as const,
  },
  {
    title: '费用类型',
    dataIndex: 'category',
    width: 120,
    align: 'center' as const,
  },
  {
    title: '报销事由',
    dataIndex: 'purpose',
    width: 200,
    align: 'center' as const,
  },
  {
    title: '费用承担部门',
    dataIndex: 'division',
    width: 120,
    align: 'center' as const,
  },
  {
    title: '报销金额',
    dataIndex: 'amount',
    width: 120,
    align: 'center' as const,
  },
  {
    title: '费用发生时间',
    dataIndex: 'feeTime',
    width: 150,
    align: 'center' as const,
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : '-'),
  },
  {
    title: '备注',
    dataIndex: 'memo',
    width: 200,
    align: 'center' as const,
  },
  {
    title: '操作',
    align: 'center' as const,
    width: 100,
    render: (record: TableItem) => {
      return (
        <Button
          type="link"
          onClick={() => navigate(PATH_ENUM.REIMBURSE_DETAIL.replace(':id', record.expenseNumber))}
        >
          查看
        </Button>
      );
    },
  },
];

export default function ReimburseManagementList() {
  const navigate = useNavigate();
  const [params] = useState({});

  const [state, doFetch] = useTableDataFn({
    Fetch: ReimburseManagementService.fetchReimburseList,
    params: params,
  });

  const categoryStatus = useAsync(async () => {
    return await ReimburseManagementService.fetchCategoryStatus();
  }, []);

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>报销管理</h2>
        <Button
          type="primary"
          onClick={() => navigate(PATH_ENUM.REIMBURSE_CREATE)}
          className={styles.createButton}
        >
          新建报销单
        </Button>
      </div>

      <SearchForm
        className={styles['search-form']}
        onFinish={values => {
          doFetch(values);
        }}
        columns={[
          {
            name: 'category',
            title: '费用类型',
            valueType: 'select',
            options: categoryStatus.value?.map((item: any) => ({ label: item, value: item })),
          },
          {
            name: 'division',
            title: '费用承担部门',
            valueType: 'text',
          },
          {
            name: 'reimburser',
            title: '报销人',
            valueType: 'text',
          },
        ]}
      />

      <div className={styles.table}>
        <Table
          rowKey="id"
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
}
