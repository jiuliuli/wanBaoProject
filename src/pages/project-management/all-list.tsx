import AutoTag from '@/components/AutoTag';
import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { PROJECT_STATUS } from '@/constants/project.constants';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import IndustryService from '@/services/industry.service';
import ProjectManagementService from '@/services/project-management.service';
import { PageHeader } from '@ant-design/pro-components';
import { Link, useNavigate } from '@umijs/max';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import styles from '../styles.less';

const getColumns = (industryList: any, evaluateTypeList: any) => [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    align: 'center',
  },
  {
    title: '项目编号',
    dataIndex: 'projectNumber',
    align: 'center',
    render: (text: string) => {
      return <Link to={`${PATH_ENUM.PROJECT_DETAIL}`.replace(':id', text)}>{text}</Link>;
    },
  },
  {
    title: '项目来源',
    dataIndex: 'source',
    align: 'center',
  },
  {
    title: '市场人员（签单人）',
    dataIndex: 'establisher',
    align: 'center',
  },
  {
    title: '项目状态',
    dataIndex: 'status',
    align: 'center',
    render: (text: string) => {
      return <AutoTag value={text} options={PROJECT_STATUS} />;
    },
  },
  {
    title: '项目金额',
    dataIndex: 'amount',
    align: 'center',
  },
  {
    title: '企业名称',
    dataIndex: 'customerName',
    align: 'center',
  },
  {
    title: '行业类型',
    dataIndex: 'industryType',
    align: 'center',
    render: (text: string) => {
      return <AutoTag value={text} options={industryList} />;
    },
  },
  {
    title: '编制人',
    dataIndex: 'compiler',
    align: 'center',
  },
  {
    title: '是否法定',
    dataIndex: 'highRisk',
    align: 'center',
  },
  {
    title: '评价类型',
    dataIndex: 'evaluateType',
    align: 'center',
    render: (text: string) => {
      return <AutoTag value={text} options={evaluateTypeList} />;
    },
  },
  {
    title: '开始时间',
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
];

export default function AllProjectList() {
  const [params] = useState({});
  const navigate = useNavigate();

  const [state, doFetch] = useTableDataFn({
    Fetch: ProjectManagementService.fetchProjectList,
    params: params,
  });

  const industryListState = useAsync(async () => {
    return await IndustryService.fetchIndustryList();
  });

  const evaluateTypeState = useAsync(async () => {
    return await ProjectManagementService.fetchEvaluateTypeList();
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title={'全部项目列表'}
        onBack={() => navigate(PATH_ENUM.PROJECT_MANAGEMENT)}
        style={{ background: '#ffffff' }}
      >
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
              name: 'evaluateType',
              title: '评价类型',
              valueType: 'select',
              options: evaluateTypeState.value?.map((item: any) => ({ label: item, value: item })),
            },
            {
              name: 'industryType',
              title: '行业类型',
              valueType: 'select',
              options: industryListState.value
                ?.map((item: any) => item.industryType)
                .map((item: any) => ({ label: item, value: item })),
            },
            {
              name: 'source',
              title: '项目来源',
              valueType: 'select',
              options: ['自有', '合作'].map((item: any) => ({ label: item, value: item })),
            },
          ]}
        />
      </PageHeader>

      {industryListState.value && (
        <div className={styles.table}>
          <Table
            rowKey="id"
            loading={state.loading}
            columns={
              getColumns(
                industryListState.value.map((item: any) => item.industryType),
                evaluateTypeState.value,
              ) as any
            }
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
      )}
    </div>
  );
}
