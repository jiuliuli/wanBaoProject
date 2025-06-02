import PATH_ENUM from '@/components/routes/path';
import ArchiveInfo from '@/pages/project-management/childrenPage/ArchiveInfo';
import BasicInfo from '@/pages/project-management/childrenPage/BasicInfo';
import ContractInfo from '@/pages/project-management/childrenPage/ContractInfo';
import MaterialInfo from '@/pages/project-management/childrenPage/MaterialInfo';
import MemberInfo from '@/pages/project-management/childrenPage/MemberInfo';
import ProcessInfo from '@/pages/project-management/childrenPage/ProcessInfo';
import RiskInfo from '@/pages/project-management/childrenPage/RiskInfo';
import { ContractService } from '@/services/ContractService';
import MemberManagementService from '@/services/member.service';
import ProjectManagementService from '@/services/project-management.service';
import {
  ArchiveInfoVO,
  BasicInfoVO,
  MaterialInfoVO,
  MemberInfoVO,
  RiskInfoVO,
} from '@/types/project.types';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Tabs } from 'antd';
import { useAsync } from 'react-use';

export default function ProjectManagementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectState = useAsync(async () => {
    if (id) {
      return await ProjectManagementService.fetchProjectById(id);
    }
  }, [id]);

  const contractState = useAsync(async () => {
    if (id) {
      return await ContractService.getContractById(id);
    }
  }, [id]);

  console.log('contractState', contractState.value);

  // const processState = useAsync(async () => {
  //     if (id) {
  //         return await ProcessManagementService.fetchProcessByProjectId(id);
  //     }
  // }, [id]);

  const memberState = useAsync(async () => {
    if (id) {
      return await MemberManagementService.fetchMemberByProjectId(id);
    }
  }, [id]);

  console.log('contractState', contractState.value);

  return (
    projectState.value &&
    !projectState.loading &&
    memberState.value &&
    !memberState.loading &&
    contractState.value &&
    !contractState.loading && (
      <PageHeader
        title={projectState.value[0]?.projectNumber}
        onBack={() => navigate(PATH_ENUM.PROJECT_MANAGEMENT)}
        style={{ background: '#ffffff' }}
      >
        <Tabs
          defaultActiveKey="basic"
          items={[
            {
              label: '基本信息',
              key: 'basic',
              children: <BasicInfo data={projectState.value[0] as BasicInfoVO} />,
            },
            {
              label: '合同',
              key: 'contract',
              children: <ContractInfo data={contractState.value[0]} />,
            },
            {
              label: '流程',
              key: 'process',
              children: <ProcessInfo data={projectState.value?.process} />,
            },
            {
              label: '项目组成员',
              key: 'member',
              children: <MemberInfo data={memberState.value as MemberInfoVO[]} />,
            },
            {
              label: '资料清单',
              key: 'material',
              children: <MaterialInfo data={projectState.value?.material as MaterialInfoVO} />,
            },
            {
              label: '存档备案',
              key: 'archive',
              children: <ArchiveInfo data={projectState.value?.archive as ArchiveInfoVO} />,
            },
            {
              label: '风险分析',
              key: 'risk',
              children: <RiskInfo data={projectState.value?.risk as RiskInfoVO} />,
            },
          ]}
        ></Tabs>
      </PageHeader>
    )
  );
}
