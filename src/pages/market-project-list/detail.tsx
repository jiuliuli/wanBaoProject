import PATH_ENUM from '@/components/routes/path';
import BasicInfo from '@/pages/market-project-list/childrenDetailPage/BasicInfo';
import ContractInfo from '@/pages/market-project-list/childrenDetailPage/ContractInfo';
import InvoiceInfo from '@/pages/market-project-list/childrenDetailPage/InvoiceInfo';
import ProgressInfo from '@/pages/market-project-list/childrenDetailPage/ProgressInfo';
import ReceiptInfo from '@/pages/market-project-list/childrenDetailPage/ReceiptInfo';
import ReportInfo from '@/pages/market-project-list/childrenDetailPage/ReportInfo';
import MarketProjectService from '@/services/market-project.service';
import ProjectManagementService from '@/services/project-management.service';
import { BasicInfoVO, ContractInfoVO } from '@/types/project.types';
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

  const reportSendState = useAsync(async () => {
    if (id) {
      return await ProjectManagementService.fetchReportSendById(id);
    }
  }, [id]);

  return (
    projectState.value &&
    !projectState.loading &&
    contractState.value &&
    !contractState.loading && (
      <PageHeader
        title={projectState.value[0]?.projectNumber}
        onBack={() => navigate(PATH_ENUM.MARKET_PROJECTS_LIST)}
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
              label: '合同信息',
              key: 'contract',
              children: <ContractInfo data={contractState.value[0] as ContractInfoVO} />,
            },
            {
              label: '项目进度详情',
              key: 'progress',
              children: <ProgressInfo data={progressState.value} />,
            },
            {
              label: '发票管理',
              key: 'invoice',
              children: <InvoiceInfo data={contractState.value[0]} />,
            },
            {
              label: '报告邮寄',
              key: 'report',
              children: <ReportInfo data={reportSendState.value} />,
            },
            {
              label: '收款情况',
              key: 'receipt',
              children: <ReceiptInfo data={contractState.value[0]} />,
            },
          ]}
        ></Tabs>
      </PageHeader>
    )
  );
}
