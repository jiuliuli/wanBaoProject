import UserService from '@/services/user.service';
import {
  AccountBookOutlined,
  ApartmentOutlined,
  BellOutlined,
  CheckCircleOutlined,
  ClusterOutlined,
  DatabaseOutlined,
  FileProtectOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  PlusOutlined,
  ProjectOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import NiceModal from '@ebay/nice-modal-react';
import { history, Link, Outlet, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './styles.less';

const { Content, Sider } = Layout;
const { Text } = Typography;

const menuItems: MenuProps['items'] = [
  // {
  //   key: "/",
  //   icon: <HomeOutlined />,
  //   label: <Link to="/">首页</Link>,
  // },
  {
    key: '/personnel-management',
    icon: <UserSwitchOutlined />,
    label: <Link to="/personnel-management">人员信息维护</Link>,
  },
  {
    key: '/professional-info-maintenance',
    icon: <DatabaseOutlined />,
    label: <Link to="/professional-info-maintenance">行业专业信息维护</Link>,
  },
  {
    key: '/parameter-configuration-maintenance',
    icon: <UserSwitchOutlined />,
    label: <Link to="/parameter-configuration-maintenance">参数配置维护</Link>,
  },
  {
    key: '/loan-application',
    icon: <WalletOutlined />,
    label: <Link to="/loan-application">借款申请</Link>,
  },
  {
    key: '/reimburse-management',
    icon: <AccountBookOutlined />,
    label: <Link to="/reimburse-management">报销管理</Link>,
  },
  {
    key: '/revenue-management',
    icon: <WalletOutlined />,
    label: <Link to="/revenue-management">收款管理</Link>,
  },
  {
    key: '/market-project-list',
    icon: <OrderedListOutlined />,
    label: <Link to="/market-project-list">(市场)项目列表</Link>,
  },
  {
    key: '/technical-project-list',
    icon: <OrderedListOutlined />,
    label: <Link to="/technical-project-list">(技术)项目列表</Link>,
  },
  {
    key: '/create-project',
    icon: <PlusOutlined />,
    label: <Link to="/create-project">(市场)新建项目</Link>,
  },
  {
    key: '/customer-management',
    icon: <TeamOutlined />,
    label: <Link to="/customer-management">企业管理</Link>,
  },
  {
    key: '/department-management',
    icon: <ApartmentOutlined />,
    label: <Link to="/department-management">部门管理</Link>,
  },
  {
    key: '/contract-management',
    icon: <FileProtectOutlined />,
    label: <Link to="/contract-management">合同管理</Link>,
  },
  {
    key: '/salary-distribution',
    icon: <WalletOutlined />,
    label: <Link to="/salary-distribution">工资发放</Link>,
  },
  {
    key: '/project-urge',
    icon: <BellOutlined />,
    label: <Link to="/project-urge">项目催办</Link>,
  },
  {
    key: '/work-collaboration',
    icon: <ClusterOutlined />,
    label: <Link to="/work-collaboration">工作协同</Link>,
  },

  {
    key: '/project-settlement',
    icon: <AccountBookOutlined />,
    label: <Link to="/project-settlement">项目结算</Link>,
  },
  {
    key: '/bidding',
    icon: <TrophyOutlined />,
    label: <Link to="/bidding">招投标</Link>,
  },
  {
    key: '/ongoing-projects',
    icon: <ProjectOutlined />,
    label: <Link to="/ongoing-projects">进行中项目</Link>,
  },
  {
    key: '/completed-projects',
    icon: <CheckCircleOutlined />,
    label: <Link to="/completed-projects">已完成项目</Link>,
  },
  {
    key: '/document-library',
    icon: <DatabaseOutlined />,
    label: <Link to="/document-library">资料库</Link>,
  },
  {
    key: '/industry-info-maintenance',
    icon: <DatabaseOutlined />,
    label: <Link to="/industry-info-maintenance">行业信息维护</Link>,
  },
];

const MainLayout: React.FC = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // 检查用户是否已登录
    if (!UserService.isLoggedIn()) {
      history.push('/login');
    } else if (!initialState?.userInfo) {
      // 如果已登录但状态中没有用户信息，则刷新状态
      refresh();
    }
  }, [initialState, refresh]);

  const handleLogout = () => {
    UserService.logout();
  };

  // 用户下拉菜单
  const userDropdownItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <NiceModal.Provider>
      <Layout className={styles.layout}>
        <Sider
          width={200}
          className={styles.sider}
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
        >
          <div className={styles.logoContainer}>
            {!collapsed ? (
              <>
                <Link to="/" className={styles.logo}>
                  <img
                    src="/images/logo.png"
                    alt="logo"
                    style={{
                      height: '26px',
                      marginRight: '10px',
                      verticalAlign: 'middle',
                      borderRadius: '3px',
                      filter: 'brightness(1.1)',
                    }}
                  />
                  管理系统
                </Link>
              </>
            ) : (
              <div className={styles.logo}>
                <img
                  src={'/images/logo.png'}
                  alt="logo"
                  style={{
                    height: '26px',
                    borderRadius: '3px',
                    filter: 'brightness(1.1)',
                  }}
                  onClick={() => history.push('/')}
                />
              </div>
            )}
          </div>

          {initialState?.userInfo && (
            <div className={styles.userContainer}>
              <Dropdown
                menu={{ items: userDropdownItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Space className={styles.userInfo}>
                  <Avatar size="small" icon={<UserOutlined />} />
                  {!collapsed && (
                    <Text ellipsis className={styles.userName}>
                      {initialState.userInfo.userName}
                    </Text>
                  )}
                </Space>
              </Dropdown>
            </div>
          )}

          {initialState?.userInfo && (
            <Menu mode="inline" theme="dark" items={menuItems} className={styles.siderMenu} />
          )}
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? '80px' : '200px',
            width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
            transition: 'margin-left 0.2s, width 0.2s',
          }}
        >
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </NiceModal.Provider>
  );
};

export default MainLayout;
