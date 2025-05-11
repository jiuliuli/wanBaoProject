import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import ProjectManagementService from '@/services/project-management.service';
import { PageHeader } from '@ant-design/pro-components';
import { Link, useNavigate } from '@umijs/max';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../styles.less';

const getColumns = (navigate: (path: string) => void) => [
  {
    title: '项目编号',
    dataIndex: 'projectNumber',
    align: 'center',
    render: (text: string) => {
      return <Link to={`${PATH_ENUM.COMPLETED_PROJECTS_DETAIL}`.replace(':id', text)}>{text}</Link>;
    },
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    align: 'center',
  },
  {
    title: '下单时间',
    dataIndex: 'startTime',
    align: 'center',
    render: (text: string) => {
      return text ? text.split('T')[0] : '';
    },
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    align: 'center',
    render: (text: string) => {
      return text ? text.split('T')[0] : '';
    },
  },
  {
    title: '操作',
    align: 'center',
    render: (data: any) => {
      return (
        <>
          <Button
            type="link"
            onClick={() => {
              navigate(`${PATH_ENUM.COMPLETED_PROJECTS_DETAIL}`.replace(':id', data.projectNumber));
            }}
          >
            查看
          </Button>
        </>
      );
    },
  },
];

const CompletedProjects: React.FC = () => {
  const [params] = useState({});
  const navigate = useNavigate();

  const [state, doFetch] = useTableDataFn({
    Fetch: ProjectManagementService.fetchProjectList,
    params: params,
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <PageHeader title={'已完成项目列表'} style={{ background: '#ffffff' }}>
        <SearchForm
          className={styles['search-form']}
          onFinish={values => {
            doFetch(values);
          }}
          columns={[
            {
              name: 'projectName',
              title: '项目名称',
              valueType: 'text',
            },
            {
              name: 'projectNumber',
              title: '项目编号',
              valueType: 'text',
            },
          ]}
        />
      </PageHeader>

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
};

export default CompletedProjects;
