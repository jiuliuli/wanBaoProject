import ProjecEditInfo from '@/pages/create-project/components/ProjecEditInfo';
import ProjectBudgetEditInfo from '@/pages/create-project/components/ProjectBudgetEditInfo';
import ProjectRiskAnalysisEditInfo from '@/pages/create-project/components/ProjectRiskAnalysisEditInfo';
import ProjectManagementService from '@/services/project-management.service';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useSearchParams } from '@umijs/max';
import { message, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useRef, useState } from 'react';
import { useAsyncFn } from 'react-use';

const CreateProject: React.FC = () => {
  // 用 useRef 保存所有表单数据
  const formDataRef = useRef({
    basicInfo: {
      amount: 0,
    },
    budgetInfo: {},
    riskInfo: {}
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeKey, setActiveKey] = useState('ProjecEditInfo');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveKey(tab);
    }
  }, [searchParams]);

  const [state, onSubmit] = useAsyncFn(async (finalData) => {
    try {
      await ProjectManagementService.createProject(Object.assign({}, finalData.basicInfo, finalData.budgetInfo, finalData.riskInfo));
      message.success('项目创建成功');
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <PageHeader title="(市场)新建项目">
      <Tabs activeKey={activeKey} onChange={(key) => {
        setActiveKey(key);
        navigate(`?tab=${key}`);
      }}>
        <TabPane tab="项目信息" key="ProjecEditInfo">
          <ProjecEditInfo onFinish={(values) => {
            formDataRef.current.basicInfo = values;
            navigate('?tab=ProjectBudgetEditInfo');
          }} />
        </TabPane>
        <TabPane tab="项目预算" key="ProjectBudgetEditInfo">
          <ProjectBudgetEditInfo amount={formDataRef.current.basicInfo.amount || 0} onFinish={(budgetValues) => {
            formDataRef.current.budgetInfo = budgetValues;
            navigate('?tab=ProjectRiskAnalysisEditInfo');
          }} />
        </TabPane>
        <TabPane tab="风险分析" key="ProjectRiskAnalysisEditInfo">
          <ProjectRiskAnalysisEditInfo onFinish={(riskValues) => {
            formDataRef.current.riskInfo = riskValues;
            onSubmit(formDataRef.current);
          }} />
        </TabPane>
        {/* <TabPane tab="合同信息" key="ContractEditInfo">
          <ContractEditInfo />
        </TabPane>
        <TabPane tab="风险评估" key="RiskEditInfo">
          <RiskEditInfo />
        </TabPane>
        <TabPane tab="发票开具" key="InvoiceEditInfo">
          <InvoiceEditInfo />
        </TabPane>
        <TabPane tab="报告邮寄" key="ReportMailEditInfo">
          <ReportMailEditInfo />
        </TabPane>
        <TabPane tab="收款情况" key="PaymentStatusEditInfo">
          <PaymentStatusEditInfo />
        </TabPane> */}
      </Tabs>
    </PageHeader>
  );
};

export default CreateProject;
