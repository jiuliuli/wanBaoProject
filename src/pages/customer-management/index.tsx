import AutoTag from "@/components/AutoTag";
import PATH_ENUM from "@/components/routes/path";
import SearchForm from "@/components/SearchForm";
import { INDUSTRY_TYPE, INDUSTRY_TYPE_TEXT } from "@/constants/project.constants";
import { useTableDataFn } from "@/hooks/useTableDataFn";
import CustomerManagementService from "@/services/customer.service";
import { Link, useNavigate } from "@umijs/max";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styles from '../styles.less';
type TableItem = Record<string, any>;

const columns: ColumnsType<TableItem> = [
    {
        title: '客户名称',
        dataIndex: 'customer_name',
        align: 'center',
        render: (customer_name: string) => <Link to={PATH_ENUM.CUSTOMER_EDIT.replace(':id', customer_name)}>{customer_name}</Link>,
    },
    {
        title: "所属行业",
        dataIndex: 'industry_type',
        align: 'center',
        render: (industry_type: INDUSTRY_TYPE) => <AutoTag text={INDUSTRY_TYPE_TEXT[industry_type]} />,
    },
    {
        title: "公司电话",
        dataIndex: 'company_tel',
        align: 'center',
    },
    {
        title: "公司地址",
        dataIndex: 'register_address',
        align: 'center',
    },
    {
        title: "法人",
        dataIndex: 'legal_person',
        align: 'center',
    },
]

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
                <h2 className={styles.title}>客户管理</h2>
                <Button
                    type="primary"
                    onClick={() => navigate(PATH_ENUM.CUSTOMER_CREATE)}
                    className={styles.createButton}
                >
                    新建客户信息
                </Button>
            </div>

            <SearchForm
                className={styles['search-form']}
                onFinish={values => {
                    doFetch(values);
                }}
                columns={[
                    {
                        name: 'customer_name',
                        title: '客户名称',
                        valueType: 'text',
                    }
                ]}
            />

            <div className={styles.table}>
                <Table
                    rowKey="id"
                    loading={state.loading}
                    columns={columns}
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