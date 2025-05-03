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

  // 人员管理
  PERSONNEL_MANAGEMENT: '/personnel-management/list',
  PERSONNEL_CREATE: '/personnel-management/create',
  PERSONNEL_EDIT: '/personnel-management/edit/:id',

  // 客户管理
  CUSTOMER_MANAGEMENT: '/customer-management/list',
  CUSTOMER_CREATE: '/customer-management/create',
  CUSTOMER_EDIT: '/customer-management/edit/:id',

  // 流程管理
  PROCESS_MANAGEMENT: '/process-management/list',
  PROCESS_CREATE: '/process-management/create',
  PROCESS_EDIT: '/process-management/edit/:id',
};

export default PATH_ENUM;
