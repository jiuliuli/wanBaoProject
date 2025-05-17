import { useTableDataFn } from '@/hooks/useTableDataFn';
import showAddRank from '@/pages/personnel-level-maintenance/showAddRank';
import PersonnelService from '@/services/personnel.service';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles.less';

const getColumns = () => [
  {
    title: '级别',
    dataIndex: 'rank',
    align: 'center',
  },
  {
    title: '差旅津贴',
    dataIndex: 'allowance',
    align: 'center',
  },
];

const PersonnelLevelMaintenance = () => {
  const [params] = useState({});

  const [state, doFetch] = useTableDataFn({
    Fetch: PersonnelService.fetchPersonnelList,
    params: params,
  });

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>人员级别维护</h2>
        <Button
          type="primary"
          onClick={() => {
            showAddRank({
              onFinish: () => {
                doFetch();
              },
            });
          }}
          className={styles.createButton}
        >
          新建级别
        </Button>
      </div>

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
  );
};

export default PersonnelLevelMaintenance;
