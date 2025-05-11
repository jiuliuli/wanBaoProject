import PATH_ENUM from '@/components/routes/path';
import BasicInfo from '@/pages/market-project-list/childrenPage/BasicInfo';
import ApplyPublishInfo from '@/pages/ongoing-projects/childrenPage/ApplyPublishInfo';
import ArchiveInfo from '@/pages/ongoing-projects/childrenPage/ArchiveInfo';
import MaterialInfo from '@/pages/ongoing-projects/childrenPage/MaterialInfo';
import NoteInfo from '@/pages/ongoing-projects/childrenPage/NoteInfo';
import OverControlInfo from '@/pages/ongoing-projects/childrenPage/OverControlInfo';
import ReportAuditInfo from '@/pages/ongoing-projects/childrenPage/ReportAuditInfo';
import CompletedService from '@/services/complete.service';
import { ArchiveInfoVO, BasicInfoVO, MaterialInfoVO } from '@/types/project.types';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Tabs } from 'antd';
import { useAsync } from 'react-use';

export default function CompletedProjectsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectState = useAsync(async () => {
    if (id) {
      return await CompletedService.fetchCompletedProjectListById(id);
    }
  }, [id]);

  const materialState = useAsync(async () => {
    if (id) {
      return await CompletedService.fetchMaterialById(id);
    }
  }, [id]);

  return (
    projectState.value &&
    !projectState.loading &&
    materialState.value &&
    !materialState.loading && (
      <PageHeader
        title={projectState.value[0]?.projectNumber}
        onBack={() => navigate(PATH_ENUM.COMPLETED_PROJECTS_LIST)}
        style={{ background: '#ffffff' }}
      >
        <Tabs
          defaultActiveKey="basic"
          items={[
            {
              label: '项目信息',
              key: 'basic',
              children: <BasicInfo data={projectState.value[0] as BasicInfoVO} />,
            },
            {
              label: '资料清单',
              key: 'material',
              children: <MaterialInfo data={materialState.value as MaterialInfoVO} />,
            },
            {
              label: '项目记事',
              key: 'note',
              children: <NoteInfo data={projectState.value?.note as NoteInfoVO} />,
            },
            {
              label: '过控整理',
              key: 'overControl',
              children: (
                <OverControlInfo data={projectState.value?.overControl as OverControlInfoVO} />
              ),
            },
            {
              label: '报告审核',
              key: 'reportAudit',
              children: (
                <ReportAuditInfo data={projectState.value?.reportAudit as ReportAuditInfoVO} />
              ),
            },
            {
              label: '申请出版',
              key: 'applyPublish',
              children: (
                <ApplyPublishInfo data={projectState.value?.applyPublish as ApplyPublishInfoVO} />
              ),
            },
            {
              label: '存档文件',
              key: 'archive',
              children: <ArchiveInfo data={projectState.value?.archive as ArchiveInfoVO} />,
            },
          ]}
        ></Tabs>
      </PageHeader>
    )
  );
}
