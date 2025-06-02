import AutoTag from '@/components/AutoTag';
import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import DepartmentService from '@/services/department.service';
import SalaryManagementService from '@/services/salary.service';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Button, message, Modal, Table, Upload } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';
import styles from '../styles.less';

const getColumns = (navigate: (path: string) => void, divisionList: any[]) => [
  {
    title: '员工真实姓名',
    dataIndex: 'realName',
    key: 'realName',
    align: 'center',
  },
  {
    title: '部门',
    dataIndex: 'division',
    key: 'division',
    align: 'center',
    render: (text: string) => (
      <AutoTag options={divisionList.map((item: any) => item.divisionName)} value={text} />
    ),
  },
  {
    title: '基本工资',
    dataIndex: 'basicWage',
    key: 'basicWage',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '发放时间',
    dataIndex: 'payDate',
    key: 'payDate',
    align: 'center',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
  },
  {
    title: '职务津贴',
    dataIndex: 'jobAllowance',
    key: 'jobAllowance',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '绩效工资',
    dataIndex: 'performance',
    key: 'performance',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '提成',
    dataIndex: 'commission',
    key: 'commission',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '餐补',
    dataIndex: 'mealSubsidy',
    key: 'mealSubsidy',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '税前补',
    dataIndex: 'pretaxSubsidy',
    key: 'pretaxSubsidy',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '税前扣',
    dataIndex: 'pretaxDeduction',
    key: 'pretaxDeduction',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '税前工资',
    dataIndex: 'pretaxSalary',
    key: 'pretaxSalary',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '社保',
    dataIndex: 'socialSecurity',
    key: 'socialSecurity',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '公积金',
    dataIndex: 'providentFund',
    key: 'providentFund',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '其他扣款',
    dataIndex: 'otherDeduction',
    key: 'otherDeduction',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '其他补',
    dataIndex: 'otherSubsidy',
    key: 'otherSubsidy',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '税款',
    dataIndex: 'selfTax',
    key: 'selfTax',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '实发',
    dataIndex: 'actualSalary',
    key: 'actualSalary',
    align: 'center',
    render: (text: string) => text + '元',
  },
  {
    title: '操作',
    align: 'center',
    render: (text: string, record: any) => (
      <Button
        type="link"
        onClick={() => navigate(PATH_ENUM.SALARY_DISTRIBUTION_EDIT.replace(':id', record.userName))}
      >
        详情
      </Button>
    ),
  },
];

const SalaryDistribution = () => {
  const navigate = useNavigate();
  const [params] = useState({});
  const [userName] = useState<string>(localStorage.getItem('user') || '');

  const [state, doFetch] = useTableDataFn({
    Fetch: SalaryManagementService.fetchSalaryList,
    params: params,
  });

  const divisionListState = useAsync(async () => {
    return await DepartmentService.fetchDepartmentList({});
  }, []);

  const [, onSubmit] = useAsyncFn(async (file: any) => {
    try {
      await SalaryManagementService.importBatchSalary(file);
      message.success('导入成功');
    } catch (error) {
      message.error('导入失败');
    }
  }, []);

  useEffect(() => {
    doFetch();
  }, []);

  return (
    divisionListState.value && (
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>工资管理</h2>
          <Button
            type="primary"
            onClick={() =>
              Modal.confirm({
                title: '批量导入工资基础数据',
                okText: '导入',
                cancelText: '取消',
                onOk: () => {
                  doFetch();
                },
                content: (
                  <div>
                    <Upload
                      action={`/v1/batchAddSalary?token=${userName}`}
                      listType="text"
                      onChange={({ file }) => {
                        if (file.status === 'done' && file.response.code === 200) {
                          message.success(`${file.name} 上传成功`);
                          onSubmit(file.response.data);
                        }
                      }}
                    >
                      <Button icon={<UploadOutlined />}>批量导入</Button>
                    </Upload>
                  </div>
                ),
              })
            }
            className={styles.createButton}
          >
            批量导入工资基础数据
          </Button>
        </div>

        <SearchForm
          className={styles['search-form']}
          onFinish={values => {
            doFetch(values);
          }}
          columns={[
            {
              name: 'userName',
              title: '员工名登录名',
              valueType: 'text',
            },
            {
              name: 'division',
              title: '部门',
              valueType: 'select',
              options:
                divisionListState.value?.map((item: any) => ({
                  label: item.divisionName,
                  value: item.divisionName,
                })) || [],
            },
          ]}
        />

        <div className={styles.table}>
          <Table
            rowKey="id"
            loading={state.loading}
            columns={getColumns(navigate, divisionListState.value) as any}
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
    )
  );
};

export default SalaryDistribution;
