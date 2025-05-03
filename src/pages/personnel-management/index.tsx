import AutoTag from "@/components/AutoTag";
import PATH_ENUM from "@/components/routes/path";
import SearchForm from "@/components/SearchForm";
import { GENDER_TYPE, ROLE_TYPE, ROLE_TYPE_TEXT } from "@/constants/personnel.constants";
import { useTableDataFn } from "@/hooks/useTableDataFn";
import PersonnelManagementService from "@/services/personnel-management.service";
import { PersonnelVO } from "@/types/personnel.types";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "@umijs/max";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import styles from '../styles.less';

const getColumns = () => [
    {
        title: '姓名',
        dataIndex: 'real_name',
        align: 'center',
        render: (name: string, data: PersonnelVO) => <Link to={PATH_ENUM.PERSONNEL_EDIT.replace(':id', data.id.toString())}>{name}</Link>
    },
    {
        title: "性别",
        dataIndex: 'gender',
        align: 'center',
        render: (text: GENDER_TYPE) => text === GENDER_TYPE.MALE ? <ManOutlined style={{ color: 'blue' }} /> : <WomanOutlined style={{ color: 'pink' }} />
    },
    {
        title: "职位",
        dataIndex: 'role',
        align: 'center',
        render: (text: ROLE_TYPE) => <AutoTag text={ROLE_TYPE_TEXT[text]} />
    },
    {
        title: "联系方式",
        dataIndex: 'contact',
        align: 'center',
    },
    {
        title: "负责区域",
        dataIndex: 'region',
        align: 'center',
    }
];

export default function PersonnelManagement() {
    const navigate = useNavigate();
    const [params] = useState({});

    const [state, doFetch] = useTableDataFn({
        Fetch: PersonnelManagementService.fetchPersonnelList,
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
                        name: 'real_name',
                        title: '姓名',
                        valueType: 'text',
                    },
                ]}
            />

            <div className={styles.table}>
                <Table
                    rowKey="id"
                    loading={state.loading}
                    columns={getColumns() as any}
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
}
