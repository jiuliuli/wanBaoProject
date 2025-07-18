import ContractInfoEditInfo from '@/pages/create-project/components/ContractInfoEditInfo';
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
  const [projectNumber, setProjectNumber] = useState('');
  const [projectHidden, setProjectHidden] = useState(true);
  const [amount, setAmount] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [createProjectButton, setCreateProjectButton] = useState(true);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveKey(tab);
    }
  }, [searchParams]);

  const [, onSubmit] = useAsyncFn(async (finalData) => {
    try {
      const res = await ProjectManagementService.createProject(Object.assign({}, finalData.basicInfo, finalData.budgetInfo, finalData.riskInfo));
      setProjectNumber(res.projectNumber);
      setProjectName(res.projectName);
      setAmount(res.amount);
      setProjectHidden(false);
      setActiveKey('ContractInfoEditInfo');
      setCreateProjectButton(false)
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
          <ProjectRiskAnalysisEditInfo  createProjectButton = {createProjectButton}
          onFinish={(riskValues) => {
            formDataRef.current.riskInfo = riskValues;
            onSubmit(formDataRef.current);
          }} />
        </TabPane>
        {
          !projectHidden && (
            <TabPane tab="合同信息" key="ContractInfoEditInfo">
              <ContractInfoEditInfo projectNumber={projectNumber} projectName={projectName} amount={amount} />
            </TabPane>
          )
        }

      </Tabs>
    </PageHeader>
  );
};

export default CreateProject;
