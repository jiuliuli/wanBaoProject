import AutoTag from "@/components/AutoTag";
import LongTextContent from "@/components/LongText";
import PATH_ENUM from "@/components/routes/path";
import SearchForm from "@/components/SearchForm";
import { PROCESS_STATUS, PROCESS_STATUS_TEXT } from "@/constants/process.constants";
import { useTableDataFn } from "@/hooks/useTableDataFn";
import ProcessManagementService from "@/services/process.service";
import { formatDate } from "@/utils/format";
import { Link, useNavigate } from "@umijs/max";
import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import styles from '../styles.less';

const getColumns = (doFetch: (params: any) => void) => [
    {
        title: "ID",
        dataIndex: 'id',
        align: 'center',
        render: (id: string) => <Link to={PATH_ENUM.PROCESS_EDIT.replace(':id', id)}>{id}</Link>
    },
    {
        title: '项目编号',
        dataIndex: 'project_number',
        align: 'center',
    },
    {
        title: '执行人',
        dataIndex: 'operator',
        align: 'center',
    },
    {
        title: "紧急程度",
        dataIndex: 'rank',
        align: 'center',
        render: (text: string) => <Tag color={text === '紧急' ? 'red' : text === '重要' ? 'blue' : text === '普通' ? 'green' : text === '通知' ? 'orange' : 'purple'}>{text}</Tag>
    },
    {
        title: "处理结果",
        dataIndex: 'result',
        align: 'center',
        render: (text: string) => text === "同意" ? <span style={{ color: 'green', fontSize: '16px' }}>✅</span> : <span style={{ color: 'red', fontSize: '16px' }}>❌</span>
    },
    {
        title: "处理意见",
        dataIndex: 'opinion',
        align: 'center',
        render: (text: string) => <LongTextContent>{text}</LongTextContent>
    },
    {
        title: "处理状态",
        dataIndex: 'status',
        align: 'center',
        render: (text: PROCESS_STATUS) => <AutoTag text={PROCESS_STATUS_TEXT[text]} />
    },
    {
        title: "开始时间",
        dataIndex: 'start_time',
        align: 'center',
        render: (text: string) => formatDate(text)
    },
    {
        title: "完成时间",
        dataIndex: 'finish_time',
        align: 'center',
        render: (text: string) => formatDate(text)
    },
];

export default function ProcessManagement() {
    const navigate = useNavigate();
    const [params] = useState({});

    const [state, doFetch] = useTableDataFn({
        Fetch: ProcessManagementService.fetchProcessList,
        params: params,
    });

    useEffect(() => {
        doFetch();
    }, []);
    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>流程管理</h2>
                <Button
                    type="primary"
                    onClick={() => navigate(PATH_ENUM.PROCESS_CREATE)}
                    className={styles.createButton}
                >
                    发起流程
                </Button>
            </div>

            <SearchForm
                className={styles['search-form']}
                onFinish={values => {
                    doFetch(values);
                }}
                columns={[
                    {
                        name: 'operator',
                        title: '执行人',
                        valueType: 'text',
                    },
                ]}
            />

            <div className={styles.table}>
                <Table
                    rowKey="id"
                    loading={state.loading}
                    columns={getColumns(doFetch) as any}
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