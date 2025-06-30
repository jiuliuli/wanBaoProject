import PATH_ENUM from '@/components/routes/path';
import MarketProjectService from '@/services/market-project.service';
import ProjectManagementService from '@/services/project-management.service';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { message, Tabs } from 'antd';
import { useState } from 'react';
import { useAsync, useAsyncRetry } from 'react-use';
import BasicInfoEdit from './childrenEditPage/BasicInfoEdit';
import ContractInfoEdit from './childrenEditPage/ContractInfoEdit';

import ProjectBudgetEdit from '@/pages/market-project-list/childrenEditPage/ProjectBudgetEdit';
import RiskAnalysisEdit from '@/pages/market-project-list/childrenEditPage/RiskAnalysisEdit';
import ReportInfoEdit from './childrenEditPage/ReportInfoEdit';

export default function MarketProjectListEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('basic');
  const [formData, setFormData] = useState<any>();

  const projectState = useAsyncRetry(async () => {
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
      const mergedValues = {
        ...formData.basic,
        ...formData.budget,
        ...formData.risk,
        projectNumber: id,
      };
      await ProjectManagementService.updateProjectBasicInfo(mergedValues);
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
  }

  const handleInvoiceSubmit = async (values: any) => {
    try {
      if (!id) return;
      await MarketProjectService.updateInvoiceInfo(id, values);
      message.success('发票信息更新成功');
    } catch (error) {
      message.error('发票信息更新失败');
    }
  }

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
              label: '基本信息',
              key: 'basic',
              children: <BasicInfoEdit data={projectState.value[0]} onSubmit={(values) => {
                setFormData((prev: any) => ({ ...prev, basic: values }));
                setActiveKey('budget');
              }} />,
            },
            {
              label: '项目预算',
              key: 'budget',
              children: <ProjectBudgetEdit data={projectState.value[0]}
                amount={formData?.basic?.amount ?? projectState.value[0].amount}
                onSubmit={(values) => {
                  setFormData((prev: any) => ({ ...prev, budget: values }));
                  setActiveKey('risk');
                }} />,
            },
            {
              label: '风险分析',
              key: 'risk',
              children: <RiskAnalysisEdit data={projectState.value[0]} onSubmit={async (values) => {
                setFormData((prev: any) => ({ ...prev, risk: values }));
                await handleBasicSubmit(values);
                setActiveKey('contract');
              }} />,
            },
            {
              label: '合同信息',
              key: 'contract',
              children: (
                <ContractInfoEdit data={contractState.value[0]} onSubmit={handleContractSubmit} amount={formData?.basic?.amount ?? projectState.value[0].amount} />
              ),
            },
            {
              label: '报告邮寄',
              key: 'report',
              children: (
                <ReportInfoEdit
                  data={reportSendState.value}
                  onSubmit={handleReportSubmit}
                  id={id!}
                />
              ),
            },
          ]}
        />
      </PageHeader>
    )
  );
}
