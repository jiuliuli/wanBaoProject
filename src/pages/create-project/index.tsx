import ProjecEditInfo from '@/pages/create-project/components/ProjecEditInfo';
import { PageHeader } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React from 'react';

const CreateProject: React.FC = () => {
  return (
    <PageHeader title="新建项目">
      <Tabs defaultActiveKey="ProjecEditInfo">
        <TabPane tab="项目信息" key="ProjecEditInfo">
          <ProjecEditInfo />
        </TabPane>
        {/* <TabPane tab="项目预算" key="ProjectBudgetEditInfo">
                <ProjectBudgetEditInfo />
            </TabPane>
            <TabPane tab="合同信息" key="ContractEditInfo">
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
