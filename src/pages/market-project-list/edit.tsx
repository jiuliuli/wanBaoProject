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
import InvoiceInfoEdit from './childrenEditPage/InvoiceInfoEdit';
import ProgressInfoEdit from './childrenEditPage/ProgressInfoEdit';
import ReceiptInfoEdit from './childrenEditPage/ReceiptInfoEdit';
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

  const progressState = useAsync(async () => {
    if (id) {
      return await ProjectManagementService.fetchProgressById(id);
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

  const handleProgressSubmit = async (values: any) => {
    try {
      if (!id) return;
      await ProjectManagementService.updateProgressInfo(id, values);
      message.success('进度信息更新成功');
    } catch (error) {
      message.error('进度信息更新失败');
    }
  };

  const handleInvoiceSubmit = async (values: any) => {
    try {
      if (!id) return;
      await MarketProjectService.updateInvoiceInfo(id, values);
      message.success('发票信息更新成功');
    } catch (error) {
      message.error('发票信息更新失败');
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

  const handleReceiptSubmit = async (values: any) => {
    try {
      if (!id) return;
      await MarketProjectService.updateReceiptInfo(id, values);
      message.success('收款信息更新成功');
    } catch (error) {
      message.error('收款信息更新失败');
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
              label: '项目进度详情',
              key: 'progress',
              children: (
                <ProgressInfoEdit data={progressState.value} onSubmit={handleProgressSubmit} />
              ),
            },
            {
              label: '发票开具',
              key: 'invoice',
              children: (
                <InvoiceInfoEdit data={projectState.value[0]} onSubmit={handleInvoiceSubmit} />
              ),
            },
            {
              label: '报告邮寄',
              key: 'report',
              children: (
                <ReportInfoEdit data={projectState.value[0]} onSubmit={handleReportSubmit} />
              ),
            },
            {
              label: '收款情况',
              key: 'receipt',
              children: (
                <ReceiptInfoEdit data={projectState.value[0]} onSubmit={handleReceiptSubmit} />
              ),
            },
          ]}
        />
      </PageHeader>
    )
  );
}
