const PATH_ENUM = {
  HOME: '/',

  // 报销管理
  REIMBURSE_MANAGEMENT: '/reimburse-management/list',
  REIMBURSE_CREATE: '/reimburse-management/create',
  REIMBURSE_DETAIL: '/reimburse-management/detail/:id',

  // 项目管理
  PROJECT_MANAGEMENT: '/project-management/list',
  PROJECT_CREATE: '/project-management/create',
  PROJECT_DETAIL: '/project-management/detail/:id',
  PROJECT_EDIT: '/project-management/edit/:id',
  ALL_PROJECT_LIST: '/project-management/all-list',

  // 客户管理
  CUSTOMER_MANAGEMENT: '/customer-management',
  CUSTOMER_CREATE: '/customer-management/create',
  CUSTOMER_EDIT: '/customer-management/edit/:id',

  // 合同管理
  CONTRACT_MANAGEMENT: '/contract-management',
  CONTRACT_CREATE: '/contract-management/create',
  CONTRACT_EDIT: '/contract-management/edit/:id',

  // 流程管理
  PROCESS_MANAGEMENT: '/process-management/list',
  PROCESS_CREATE: '/process-management/create',
  PROCESS_EDIT: '/process-management/edit/:id',

  // 进行中项目
  ONGOING_PROJECTS_DETAIL: '/ongoing-projects/detail/:id',
  ONGOING_PROJECTS_LIST: '/ongoing-projects',

  // 项目列表(市场)
  MARKET_PROJECTS_DETAIL: '/market-project-list/detail/:id',
  MARKET_PROJECTS_LIST: '/market-project-list',
  MARKET_PROJECTS_EDIT: '/market-project-list/edit/:id',

  // 项目列表(技术)
  TECHNICAL_PROJECTS_DETAIL: '/technical-project-list/detail/:id',
  TECHNICAL_PROJECTS_LIST: '/technical-project-list',
  TECHNICAL_PROJECTS_EDIT: '/technical-project-list/edit/:id',

  // 已完成项目
  COMPLETED_PROJECTS_DETAIL: '/completed-projects/detail/:id',
  COMPLETED_PROJECTS_LIST: '/completed-projects',

  // 部门管理
  DEPARTMENT_MANAGEMENT: '/department-management',
  DEPARTMENT_EDIT: '/department-management/edit/:id',
  DEPARTMENT_CREATE: '/department-management/create',
  DEPARTMENT_PERSONNEL_LIST: '/department-management/personnel-list/:id',
  DEPARTMENT_PERSONNEL_EDIT: '/department-management/personnel-edit/:id',
  DEPARTMENT_PERSONNEL_CREATE: '/department-management/personnel-create',

  // 人员信息维护
  PERSONNEL_MANAGEMENT: '/personnel-management',
  PERSONNEL_CREATE: '/personnel-management/create',
  PERSONNEL_EDIT: '/personnel-management/edit/:id',

  // 借款申请
  LOAN_APPLICATION: '/loan-application',
  LOAN_APPLICATION_CREATE: '/loan-application/create',
  LOAN_APPLICATION_EDIT: '/loan-application/edit/:id',

  // 工资发放
  SALARY_DISTRIBUTION: '/salary-distribution',
  SALARY_DISTRIBUTION_EDIT: '/salary-distribution/edit/:id',
};

export default PATH_ENUM;
