import HomeService from "@/services/home.service";
import { Link, useNavigate } from "@umijs/max";
import { Spin, Table, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { useAsync } from "react-use";
import styles from '../styles.less';

export default function TodoList() {
    const totalState = useAsync(async () => {
        return await HomeService.getTotalData();
    });

    const navigate = useNavigate();

    const columns: ColumnsType<any> = [
        {
            title: '项目进度',
            dataIndex: 'spotName',
            key: 'spotName',
            align: 'center',
        },
        {
            title: '项目编号',
            dataIndex: 'projectNumber',
            key: 'projectNumber',
            align: 'center',
            render: (text: string) => <Link to={`/market-project-list/detail/${text}`}>{text}</Link>,
        },
        {
            title: '合同编号',
            dataIndex: 'contractNumber',
            key: 'contractNumber',
            align: 'center',
            render: (text: string) => <Link to={`/contract-management/edit/${text}`}>{text}</Link>,
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
        },
        {
            title: '优先级',
            dataIndex: 'rank',
            key: 'rank',
            render: (rank: string) => (
                <Tag color={rank === '普通' ? 'blue' : 'red'}>{rank}</Tag>
            ),
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color="orange">{status}</Tag>
            ),
            align: 'center',
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (time: string) => new Date(time).toLocaleString(),
            align: 'center',
        },
    ];

    return (
        totalState.loading ? <Spin /> :
            <div>
                <div className={styles.header}>
                    <h2 className={styles.title}>待办工作</h2>
                </div>
                <Table
                    columns={columns}
                    dataSource={totalState.value}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                />
            </div>
    )
}