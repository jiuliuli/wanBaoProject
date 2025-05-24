import PATH_ENUM from '@/components/routes/path';
import MarketProjectService from '@/services/market-project.service';
import ProjectManagementService from '@/services/project-management.service';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { message, Tabs } from 'antd';
import { useState } from 'react';
import { useAsync } from 'react-use';
import BasicInfoEdit from './childrenEditPage/BasicInfoEdit';
import ContractInfoEdit from './childrenEditPage/ContractInfoEdit';
import ReportInfoEdit from './childrenEditPage/ReportInfoEdit';

export default function MarketProjectListEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('basic');

  const projectState = useAsync(async () => {
    if (id) {
      return await ProjectManagementService.fetchProjectById(id);
    }
  }, [id]);

  const contractState = useAsync(async () => {
    if (id) {
      return await MarketProjectService.fetchContractById(id);
    }
  }, [id]);

  const reportSendState = useAsync(async () => {
    if (id) {
      return await ProjectManagementService.fetchReportSendById(id);
    }
  }, [id]);

  const handleBasicSubmit = async (values: any) => {
    try {
      if (!id) return;
      values.projectNumber = id;
      await ProjectManagementService.updateProjectBasicInfo(values);
      message.success('项目信息更新成功');
    } catch (error) {
      message.error('项目信息更新失败');
    }
  };

  const handleContractSubmit = async (values: any) => {
    try {
      if (!id) return;
      await MarketProjectService.updateContractInfo(values);
      message.success('合同信息更新成功');
    } catch (error) {
      message.error('合同信息更新失败');
    }
  };

  const handleReportSubmit = async (values: any) => {
    try {
      if (!id) return;
      await MarketProjectService.updateReportInfo(id, values);
      message.success('报告信息更新成功');
    } catch (error) {
      message.error('报告信息更新失败');
    }
  };

  return (
    projectState.value &&
    !projectState.loading &&
    contractState.value &&
    !contractState.loading && (
      <PageHeader
        title="编辑项目"
        onBack={() => navigate(PATH_ENUM.MARKET_PROJECTS_LIST)}
        style={{ background: '#ffffff' }}
      >
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={[
            {
              label: '项目信息',
              key: 'basic',
              children: <BasicInfoEdit data={projectState.value[0]} onSubmit={handleBasicSubmit} />,
            },
            {
              label: '合同信息',
              key: 'contract',
              children: (
                <ContractInfoEdit data={contractState.value[0]} onSubmit={handleContractSubmit} />
              ),
            },
            {
              label: '报告邮寄',
              key: 'report',
              children: (
                <ReportInfoEdit data={reportSendState.value} onSubmit={handleReportSubmit} />
              ),
            },
          ]}
        />
      </PageHeader>
    )
  );
}
