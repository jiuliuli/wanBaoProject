import PATH_ENUM from '@/components/routes/path';
import SearchForm from '@/components/SearchForm';
import { useTableDataFn } from '@/hooks/useTableDataFn';
import PersonnelService from '@/services/personnel.service';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Button, message, Modal, Table, Upload } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import styles from '../styles.less';

const getColumns = (navigate: any) => [
  {
    title: '姓名',
    dataIndex: 'realName',
    align: 'center',
  },
  {
    title: '部门',
    dataIndex: 'division',
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'center',
  },
  {
    title: '出生年月',
    dataIndex: 'birthday',
    align: 'center',
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
  },
  {
    title: '毕业学校',
    dataIndex: 'graduateCollege',
    align: 'center',
  },
  {
    title: '毕业时间',
    dataIndex: 'graduateDate',
    align: 'center',
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
  },
  {
    title: '员工类别',
    dataIndex: 'role',
    align: 'center',
  },
  {
    title: '员工等级（分4级）',
    dataIndex: 'rank',
    align: 'center',
    render: (text: any) => (text ? text + '级' : ''),
  },
  {
    title: '入职时间',
    dataIndex: 'entryDate',
    align: 'center',
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
  },
  {
    title: '操作',
    align: 'center',
    render: (text: any, data: any) => (
      <Button
        type="link"
        onClick={() => navigate(PATH_ENUM.PERSONNEL_EDIT.replace(':id', data.userName))}
      >
        详情
      </Button>
    ),
  },
];

export default function PersonnelManagement() {
  const [params] = useState({});
  const navigate = useNavigate();
  const [userName] = useState<string>(localStorage.getItem('user') || '');

  const [state, doFetch] = useTableDataFn({
    Fetch: PersonnelService.fetchPersonnelList,
    params: params,
  });

  useEffect(() => {
    doFetch();
  }, []);

  const [, onSubmit] = useAsyncFn(async (file: any) => {
    try {
      await PersonnelService.importBatchPersonnel(file);
      message.success('导入成功');
    } catch (error) {
      message.error('导入失败');
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>人员信息维护</h2>
        <Button
          type="primary"
          onClick={() => navigate(PATH_ENUM.PERSONNEL_CREATE)}
          className={styles.createButton}
        >
          新建人员信息
        </Button>
        <Button
          type="primary"
          onClick={() =>
            Modal.confirm({
              title: '批量导入人员信息',
              okText: '导入',
              cancelText: '取消',
              onOk: () => {
                doFetch();
              },
              content: (
                <div>
                  <Upload
                    action={`/v1/singleFileUpload?token=${userName}`}
                    listType="text"
                    onChange={({ file }) => {
                      if (file.status === 'done') {
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
          批量导入人员信息
        </Button>
      </div>
      <SearchForm
        className={styles['search-form']}
        onFinish={values => {
          doFetch(values);
        }}
        columns={[
          {
            title: '姓名',
            name: 'userName',
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
