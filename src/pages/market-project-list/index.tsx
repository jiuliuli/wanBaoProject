import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import ProjectManagementService from '@/services/project-management.service';
import { PageHeader } from '@ant-design/pro-components';
import { Link, useNavigate } from '@umijs/max';
import { Button, message, Modal, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles.less';

const getColumns = (navigate: (path: string) => void, doFetch: (params?: any) => void) => [
  {
    title: '项目编号',
    dataIndex: 'projectNumber',
    align: 'center',
    render: (text: string) => {
      return <Link to={`${PATH_ENUM.MARKET_PROJECTS_DETAIL}`.replace(':id', text)}>{text}</Link>;
    },
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    align: 'center',
  },
  {
    title: '合同额',
    align: 'center',
    dataIndex: 'amount',
  },
  {
    title: '项目进度',
    width: 70,
    align: 'center',
    dataIndex: 'progress',
  },
  {
    title: '编制人',
    dataIndex: 'compiler',
    align: 'center',
  },
  {
    title: '市场人员（签单人）',
    width: 100,
    dataIndex: 'establisher',
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
    title: '计划完成时间',
    dataIndex: 'endTime',
    align: 'center',
    width: 150,
    render: (text: string) => {
      return text ? text.split('T')[0] : '';
    },
  },
  {
    title: '紧急程度',
    dataIndex: 'rank',
    align: 'center',
    width: 100,
    render: (text: string) => {
      return text === '紧急' ? (
        <Tag color="red">紧急</Tag>
      ) : text === '重要' ? (
        <Tag color="blue">重要</Tag>
      ) : (
        <Tag color="green">普通</Tag>
      );
    },
  },
  {
    title: '操作',
    align: 'center',
    width: 100,
    render: (data: any) => {
      return (
        <>
          <Button
            type="link"
            onClick={() => {
              navigate(`${PATH_ENUM.MARKET_PROJECTS_DETAIL}`.replace(':id', data.projectNumber));
            }}
          >
            查看
          </Button>
          <Button
            type="link"
            onClick={() => {
              navigate(`${PATH_ENUM.MARKET_PROJECTS_EDIT}`.replace(':id', data.projectNumber));
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            disabled={data.progress !== '创建'}
            onClick={() => {
              Modal.confirm({
                content: `确定要提交项目审核吗？【提交后将无法修改项目信息】`,
                onOk: () => {
                  ProjectManagementService.submitProjectAudit({
                    ...data,
                  }).then(res => {
                    message.success('提交成功');
                    doFetch();
                  });
                },
              });
            }}
          >
            提交
          </Button>
        </>
      );
    },
  },
];

export default function MarketProjectList() {
  const [params] = useState({ finished: false });
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
      <PageHeader title={'市场项目列表'} style={{ background: '#ffffff' }}>
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
          columns={getColumns(navigate, doFetch) as any}
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
