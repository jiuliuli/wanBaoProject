import PATH_ENUM from '@/components/routes/path';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import CustomerManagementService from '@/services/customer.service';
import { useNavigate } from '@umijs/max';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles.less';

const getColumns = (navigate: any) => [
  {
    title: '企业名称',
    dataIndex: 'customerName',
    align: 'center',
  },
  {
    title: '统一社会信用代码',
    dataIndex: 'identification',
    align: 'center',
  },
  {
    title: '创建人',
    dataIndex: 'establisher',
    align: 'center',
  },
  {
    title: '邮寄地址',
    dataIndex: 'mailAddress',
    align: 'center',
  },
  {
    title: '公司电话',
    dataIndex: 'companyTel',
    align: 'center',
  },
  {
    title: '联系人',
    dataIndex: 'contactPerson',
    align: 'center',
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    render: (data: any) => {
      return (
        <div>
          <Button
            type="link"
            onClick={() => navigate(PATH_ENUM.CUSTOMER_EDIT.replace(':id', data.customerName))}
          >
            详情
          </Button>
        </div>
      );
    },
  },
];

export default function CustomerManagement() {
  const navigate = useNavigate();
  const [params] = useState({});

  const [state, doFetch] = useTableDataFn({
    Fetch: CustomerManagementService.fetchCustomerList,
    params: params,
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>企业管理</h2>
        <Button
          type="primary"
          onClick={() => navigate(PATH_ENUM.CUSTOMER_CREATE)}
          className={styles.createButton}
        >
          新建企业信息
        </Button>
      </div>

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
