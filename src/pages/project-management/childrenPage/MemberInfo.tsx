import { MemberInfoVO } from "@/types/project.types";
import { Table } from 'antd';
import dayjs from 'dayjs';


type MemberInfoProps = {
    data: MemberInfoVO[];
}

// 成员列表展示组件
export default function MemberInfo({ data }: MemberInfoProps) {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '职责',
            dataIndex: 'duty',
            key: 'duty',
            align: 'center',
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            align: 'center',
            render: (text: string) => text ? dayjs(text).format('YYYY-MM-DD') : '-'
        },
        {
            title: '完成时间',
            dataIndex: 'finishedTime',
            key: 'finishedTime',
            align: 'center',
            render: (text: string) => text ? dayjs(text).format('YYYY-MM-DD') : '-'
        }
    ];

    return (
        <div className="member-info">
            <h3 className="text-lg font-medium mb-4">项目成员信息</h3>
            <Table
                dataSource={data}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
        </div>
    );
}