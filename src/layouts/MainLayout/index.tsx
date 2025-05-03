import UserService from '@/services/user.service';
import { ContactsOutlined, DollarOutlined, HomeOutlined, LogoutOutlined, PartitionOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';
import { history, Link, Outlet, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './styles.less';

const { Content, Sider } = Layout;
const { Text } = Typography;

const menuItems: MenuProps['items'] = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link to="/">首页</Link>,
  },
  {
    key: "/project-management",
    icon: <SnippetsOutlined />,
    label: <Link to="/project-management/list">项目管理</Link>,
  },
  {
    key: '/process-management',
    icon: <PartitionOutlined />,
    label: <Link to="/process-management/list">流程管理</Link>,
  },
  {
    key: '/finance-management',
    icon: <DollarOutlined />,
    label: <Link to="/reimburse-management/list">报销管理</Link>,

  },
  {
    key: '/personnel-management',
    icon: <UserOutlined />,
    label: <Link to="/personnel-management/list">人员管理</Link>,
  },
  {
    key: '/customer-management',
    icon: <ContactsOutlined />,
    label: <Link to="/customer-management/list">客户管理</Link>,
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
    <Layout className={styles.layout}>
      <Sider
        width={200}
        className={styles.sider}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
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
                    filter: 'brightness(1.1)'
                  }}
                />
                管理系统
              </Link>
            </>

          ) : (
            <div className={styles.logo}>
              <img
                src={"/images/logo.png"}
                alt="logo"
                style={{
                  height: '26px',
                  borderRadius: '3px',
                  filter: 'brightness(1.1)'
                }}
                onClick={() => history.push("/")}
              />
            </div>

          )}
        </div>

        {initialState?.userInfo && (
          <div className={styles.userContainer}>
            <Dropdown menu={{ items: userDropdownItems }} placement="bottomRight" trigger={['click']}>
              <Space className={styles.userInfo}>
                <Avatar size="small" icon={<UserOutlined />} />
                {!collapsed && <Text ellipsis className={styles.userName}>{initialState.userInfo.realName}</Text>}
              </Space>
            </Dropdown>
          </div>
        )}

        {initialState?.userInfo && (
          <Menu
            mode="inline"
            theme="dark"
            items={menuItems}
            className={styles.siderMenu}
          />
        )}
      </Sider>

      <Layout style={{
        marginLeft: collapsed ? '80px' : '200px',
        width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
        transition: 'margin-left 0.2s, width 0.2s'
      }}>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 