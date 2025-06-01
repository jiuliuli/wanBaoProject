import PATH_ENUM from '@/components/routes/path';
import BasicInfo from '@/pages/technical-project-list/childrenDetailPage/BasicInfo';
import ProjectManagementService from '@/services/project-management.service';

import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Tabs } from 'antd';
import { useAsync } from 'react-use';

export default function MarketProjectListDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectState = useAsync(async () => {
    if (id) {
      return await ProjectManagementService.fetchProjectById(id);
    }
  }, [id]);

  const materialListState = useAsync(async () => {
    if (id) {
      return await ProjectManagementService.fetchMaterialListById(id);
    }
  }, [id]);

  console.log(materialListState.value);

  return (
    projectState.value &&
    !projectState.loading &&
    materialListState.value &&
    !materialListState.loading && (
      <PageHeader
        title={projectState.value[0]?.projectNumber}
        onBack={() => navigate(PATH_ENUM.TECHNICAL_PROJECTS_LIST)}
        style={{ background: '#ffffff' }}
      >
        <Tabs
          defaultActiveKey="basic"
          items={[
            {
              label: '项目信息',
              key: 'basic',
              children: <BasicInfo data={projectState.value[0]} />,
            },
            // {
            //   label: '资料清单',
            //   key: 'materialList',
            //   children: <MaterialList data={contractState.value[0]} />,
            // },
            // {
            //   label: '项目记事',
            //   key: 'projectNotes',
            //   children: <ProjectNotes data={projectNotesState.value} />,
            // },
            // {
            //   label: "项目组成员",
            //   key: "projectMembers",
            //   children: <ProjectMembers data={projectMembersState.value} />,
            // },
            // {
            //   label: "过控整理",
            //   key: "overControl",
            //   children: <OverControl data={overControlState.value} />,
            // },
            // {
            //   label: "报告审核",
            //   key: "reportAudit",
            //   children: <ReportAudit data={reportAuditState.value} />,
            // },
            // {
            //   label: "申请出版",
            //   key: "publish",
            //   children: <Publish data={publishState.value} />,
            // },
            // {
            //   label: "存档文件",
            //   key: "archive",
            //   children: <Archive data={archiveState.value} />,
            // },
          ]}
        ></Tabs>
      </PageHeader>
    )
  );
}
