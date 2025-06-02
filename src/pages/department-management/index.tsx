import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import DepartmentService from '@/services/department.service';
import { useNavigate } from '@umijs/max';
import { Button, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles.less';

const getColumns = (navigate: any) => [
    {
        title: '部门名称',
        dataIndex: 'divisionName',
        align: 'center',
    },
    {
        title: '是否可用',
        dataIndex: 'valid',
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
            <Space>
                <Button
                    type="link"
                    onClick={() => navigate(PATH_ENUM.DEPARTMENT_EDIT.replace(':id', data.divisionName))}
                >
                    详情
                </Button>
                {/* <Button
          type="link"
          onClick={() =>
            navigate(
              PATH_ENUM.DEPARTMENT_PERSONNEL_LIST.replace(':departmentId', data.divisionName),
            )
          }
        >
          查看人员信息
        </Button> */}
            </Space>
        ),
    },
];

export default function DepartmentManagement() {
    const navigate = useNavigate();
    const [params] = useState({});

    const [state, doFetch] = useTableDataFn({
        Fetch: DepartmentService.fetchDepartmentList,
        params: params,
    });

    useEffect(() => {
        doFetch();
    }, []);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>部门管理</h2>
                <Button
                    type="primary"
                    onClick={() => navigate(PATH_ENUM.DEPARTMENT_CREATE)}
                    className={styles.createButton}
                >
                    新建部门信息
                </Button>
            </div>

            <SearchForm
                className={styles['search-form']}
                onFinish={values => {
                    doFetch(values);
                }}
                columns={[
                    {
                        title: '部门名称',
                        name: 'divisionName',
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
