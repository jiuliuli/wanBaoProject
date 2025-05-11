import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import PersonnelService from '@/services/personnel.service';
import { useNavigate } from '@umijs/max';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles.less';

const getColumns = (navigate: any) => [
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'center',
  },
  {
    title: '角色',
    dataIndex: 'role',
    align: 'center',
  },
  {
    title: '部门',
    dataIndex: 'division',
    align: 'center',
  },
  {
    title: '地区',
    dataIndex: 'region',
    align: 'center',
  },
  {
    title: '职级',
    dataIndex: 'rank',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'valid',
    align: 'center',
  },
  {
    title: '在线状态',
    dataIndex: 'online',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    render: (text: any, data: any) => (
      <Button
        type="link"
        onClick={() => navigate(PATH_ENUM.PERSONNEL_EDIT.replace(':id', data.userName))}
      >
        编辑
      </Button>
    ),
  },
];

export default function PersonnelManagement() {
  const [params] = useState({});
  const navigate = useNavigate();

  const [state, doFetch] = useTableDataFn({
    Fetch: PersonnelService.fetchPersonnelList,
    params: params,
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>人员管理</h2>
        <Button
          type="primary"
          onClick={() => navigate(PATH_ENUM.PERSONNEL_CREATE)}
          className={styles.createButton}
        >
          新建人员信息
        </Button>
      </div>
      <SearchForm
        className={styles['search-form']}
        onFinish={values => {
          doFetch(values);
        }}
        columns={[
          {
            title: '姓名',
            name: 'userName',
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
