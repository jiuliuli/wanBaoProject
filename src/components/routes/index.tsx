export const routes = [
  {
    path: '/login',
    component: '@/pages/login',
    layout: false,
  },
  {
    path: '/',
    name: '首页',
    component: '@/pages/Home',
  },
  {
    path: '/project-management/list',
    name: '项目管理',
    component: '@/pages/project-management/index',
  },
  {
    path: '/project-management/edit/:id',
    name: '项目管理编辑',
    component: '@/pages/project-management/edit',
  },
  {
    path: '/project-management/create',
    name: '项目管理创建',
    component: '@/pages/project-management/edit',
  },
  {
    path: '/project-management/detail/:id',
    name: '项目管理详情',
    component: '@/pages/project-management/detail',
  },
  {
    path: "/project-management/all-list",
    name: "全部项目列表",
    component: "@/pages/project-management/all-list",
  },
  {
    path: '/reimburse-management/list',
    name: '报销管理',
    component: '@/pages/reimburse-management/index',
  },
  {
    path: '/reimburse-management/detail/:id',
    name: '报销管理编辑',
    component: '@/pages/reimburse-management/edit',
  },
  {
    path: '/reimburse-management/create',
    name: '报销管理创建',
    component: '@/pages/reimburse-management/edit',
  },
  {
    path: '/personnel-management/list',
    name: '人员管理',
    component: '@/pages/personnel-management/index',
  },
  {
    path: '/personnel-management/edit/:id',
    name: '人员管理编辑',
    component: '@/pages/personnel-management/edit',
  },
  {
    path: '/personnel-management/create',
    name: '人员管理创建',
    component: '@/pages/personnel-management/edit',
  },
  {
    path: '/customer-management/list',
    name: '客户管理',
    component: '@/pages/customer-management/index',
  },
  {
    path: '/customer-management/edit/:id',
    name: '客户管理编辑',
    component: '@/pages/customer-management/edit',
  },
  {
    path: '/customer-management/create',
    name: '客户管理创建',
    component: '@/pages/customer-management/edit',
  },
  {
    path: '/process-management/list',
    name: '流程管理',
    component: '@/pages/process-management/index',
  },
  {
    path: '/process-management/edit/:id',
    name: '流程管理编辑',
    component: '@/pages/process-management/edit',
  },
  {
    path: '/process-management/create',
    name: '流程管理创建',
    component: '@/pages/process-management/edit',
  },
  {
    path: '*',
    component: '@/components/NotFound',
  },
];
