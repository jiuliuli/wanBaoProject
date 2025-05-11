import { MaterialInfoVO } from '@/types/project.types';
import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';

type MaterialInfoProps = {
  data: MaterialInfoVO[];
};

const columns = [
  {
    title: '项目编号',
    dataIndex: 'projectNumber',
    align: 'center',
    key: 'projectNumber',
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '类别',
    dataIndex: 'category',
    align: 'center',
    key: 'category',
  },
  {
    title: '是否获取',
    dataIndex: 'gain',
    align: 'center',
    key: 'gain',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    align: 'center',
    key: 'memo',
  },
];

export default function MaterialInfo({ data }: MaterialInfoProps) {
  return (
    <div className="p-4">
      <Table
        dataSource={data}
        columns={columns as ColumnType<MaterialInfoVO>[]}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}
