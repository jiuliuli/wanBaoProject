import { useTableDataFn } from '@/hooks/useTableDataFn';
import showEditProfessionalModal from '@/pages/professional-info-maintenance/showEditProfessionalModal';
import IndustryService from '@/services/industry.service';
import { Button, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles.less';

const getColumns = (doFetch: () => void) => [
  {
    title: '行业类型',
    dataIndex: 'fullName',
    align: 'center',
  },
  {
    title: '行业类型简称',
    dataIndex: 'industryType',
    align: 'center',
  },
  {
    title: '配备专业',
    dataIndex: 'major',
    align: 'center',
    render: (text: any) =>
      text ? text.split('/').map((item: any) => <Tag key={item}>{item}</Tag>) : '',
  },
  {
    title: '操作',
    align: 'center',
    render: (text: any, data: any) => (
      <Button
        type="link"
        onClick={() =>
          showEditProfessionalModal({
            data: data,
            onFinish: () => {
              doFetch();
            },
          })
        }
      >
        编辑
      </Button>
    ),
  },
];

const ProfessionalInfoMaintenance = () => {
  const [params] = useState({});

  const [state, doFetch] = useTableDataFn({
    Fetch: IndustryService.fetchIndustryList,
    params: params,
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>行业专业信息维护</h2>
      </div>

      <div className={styles.table}>
        <Table
          rowKey="id"
          loading={state.loading}
          columns={getColumns(doFetch) as any}
          dataSource={state.value?.dataSource}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

export default ProfessionalInfoMaintenance;
