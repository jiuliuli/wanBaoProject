import PATH_ENUM from '@/components/routes/path';
import BasicInfoForm from '@/pages/personnel-management/children/BasicInfoForm';
import PersonnelService from '@/services/personnel.service';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { Form, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import CertificateInfoForm from './children/CertificateInfoForm';
import SalarySocialForm from './children/SalarySocialForm';

export default function PersonnelManagementEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [activeKey, setActiveKey] = useState('basic');
  const [userName, setUserName] = useState('');
  const userInfo = useAsync(async () => {
    if (!id) return;
    return await PersonnelService.getPersonnelById(id);
  }, [id]);

  const [form] = Form.useForm();
  const [type] = useState<string>(id ? 'edit' : 'create');

  const certificateState = useAsync(async () => {
    if (!id) return;
    return await PersonnelService.getCertificateById(id);
  }, [id]);

  useEffect(() => {
    if (userInfo.value) {
      setUserName(userInfo.value[0]?.userName ?? '');
    }
  }, [userInfo.value]);

  return (
    <PageHeader
      title={userInfo.value ? `编辑${userInfo.value[0]?.realName}` : '新建人员'}
      onBack={() => navigate(PATH_ENUM.PERSONNEL_MANAGEMENT)}
      style={{ background: '#ffffff' }}
    >
      <Tabs activeKey={activeKey ?? 'basic'} onChange={setActiveKey}>
        <Tabs.TabPane tab="人员基本信息" key="basic">
          {(userInfo.value || type === 'create') && (
            <BasicInfoForm
              data={type === 'create' ? {} : userInfo?.value[0]}
              type={type}
              getUserName={(userName: string) => {
                setUserName(userName);
              }}
              onNext={() => {
                setValid(true);
                setActiveKey('certificate');
              }}
            />
          )}
        </Tabs.TabPane>
        {valid && (
          <>
            <Tabs.TabPane tab="持证人员证书管理" key="certificate">
              <CertificateInfoForm
                data={type === 'create' ? {} : certificateState?.value[0]}
                type={type}
                userName={userName}
                onNext={() => {
                  setActiveKey('salarySocial');
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="工资和社保管理" key="salarySocial">
              <SalarySocialForm props={{ form }} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="离职管理【先不做】" key="leave">
              <div />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </PageHeader>
  );
}
