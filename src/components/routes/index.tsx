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
    path: '/pending-tasks',
    name: '待办工作',
    component: '@/pages/pending-tasks',
  },
  {
    path: '/personnel-management',
    name: '人员信息维护',
    component: '@/pages/personnel-management',
  },
  {
    path: '/market-project-list',
    name: '项目列表',
    component: '@/pages/market-project-list',
  },
  {
    path: '/market-project-list/detail/:id',
    name: '项目详情',
    component: '@/pages/market-project-list/detail',
  },
  {
    path: '/market-project-list/edit/:id',
    name: '项目编辑',
    component: '@/pages/market-project-list/edit',
  },
  {
    path: '/create-project',
    name: '新建项目',
    component: '@/pages/create-project',
  },
  {
    path: '/customer-management',
    name: '客户管理',
    component: '@/pages/customer-management',
  },
  {
    path: '/department-management',
    name: '部门管理',
    component: '@/pages/department-management',
  },
  {
    path: '/personnel-management',
    name: "人员信息维护",
    component: '@/pages/personnel-management',
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
    path: '/contract-management',
    name: '合同管理',
    component: '@/pages/contract-management',
  },
  {
    path: '/project-urge',
    name: '项目催办',
    component: '@/pages/project-urge',
  },
  {
    path: '/work-collaboration',
    name: '工作协同',
    component: '@/pages/work-collaboration',
  },
  {
    path: '/loan-application',
    name: '借款申请',
    component: '@/pages/loan-application',
  },
  {
    path: '/loan-application/edit/:id',
    name: '借款申请编辑',
    component: '@/pages/loan-application/edit',
  },
  {
    path: '/loan-application/create',
    name: '借款申请创建',
    component: '@/pages/loan-application/edit',
  },
  {
    path: '/reimburse-management',
    name: '报销管理',
    component: '@/pages/reimburse-management',
  },
  {
    path: '/project-settlement',
    name: '项目结算',
    component: '@/pages/project-settlement',
  },
  {
    path: '/bidding',
    name: '招投标',
    component: '@/pages/bidding',
  },
  {
    path: '/ongoing-projects',
    name: '进行中项目列表',
    component: '@/pages/ongoing-projects',
  },
  {
    path: '/ongoing-projects/detail/:id',
    name: '进行中项目详情',
    component: '@/pages/ongoing-projects/detail',
  },
  {
    path: '/completed-projects',
    name: '已完成项目',
    component: '@/pages/completed-projects',
  },
  {
    path: '/completed-projects/detail/:id',
    name: '已完成项目详情',
    component: '@/pages/completed-projects/detail',
  },
  {
    path: '/document-library',
    name: '资料库',
    component: '@/pages/document-library',
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
    path: '/project-management/all-list',
    name: '全部项目列表',
    component: '@/pages/project-management/all-list',
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
    path: '/customer-management',
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
    path: '/department-management',
    name: '部门管理',
    component: '@/pages/department-management',
  },
  {
    path: '/department-management/edit/:id',
    name: '部门管理编辑',
    component: '@/pages/department-management/edit',
  },
  {
    path: '/department-management/create',
    name: '部门管理创建',
    component: '@/pages/department-management/edit',
  },
  {
    path: '/personnel-management/edit/:id',
    name: '人员管理编辑',
    component: '@/pages/personnel-management/edit',
  },
  {
    path: '/department-management/personnel-list/:id',
    name: '部门人员列表',
    component: '@/pages/department-management/personList',
  },
  {
    path: '/department-management/personnel-edit/:id',
    name: '部门人员编辑',
    component: '@/pages/department-management/personEdit',
  },
  {
    path: '/department-management/personnel-create',
    name: '部门人员创建',
    component: '@/pages/department-management/personEdit',
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
    path: '/salary-distribution',
    name: '工资发放',
    component: '@/pages/salary-distribution',
  },
  {
    path: '/professional-info-maintenance',
    name: '行业专业信息维护',
    component: '@/pages/professional-info-maintenance',
  },
  {
    path: '/personnel-level-maintenance',
    name: '人员级别维护',
    component: '@/pages/personnel-level-maintenance',
  },
  {
    path: '*',
    component: '@/components/NotFound',
  },
];
