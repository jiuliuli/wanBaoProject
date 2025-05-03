export const reimburseListData = [
  {
    id: 1,
    projectNumber: 'PRJ-2024-001',
    projectName: '项目1',
    reimbursePersonName: '张三',
    maker: '李四',
    category: 1,
    timeStamp: '1716441600000',
    department: '财务部',
    amount: '1000',
    feeType: 1,
    reason: '报销事由',
    receivingName: '王五',
    receivingBankName: '中国银行',
    receivingBankAccount: '12345678901234567890',
    status: 'PENDING',
  },
  {
    id: 2,
    projectNumber: 'PRJ-2024-002',
    projectName: '项目2',
    reimbursePersonName: '翠花',
    maker: '李四',
    category: 2,
    feeType: 1,
    reason: '报销事由',
    timeStamp: '1716355200000',
    department: '研发部',
    amount: '1000',
    receivingName: '王五',
    receivingBankName: '招商银行',
    receivingBankAccount: '12345678901234567890',
    status: 'APPROVED',
  },
  {
    id: 3,
    projectNumber: 'PRJ-2024-003',
    reimbursePersonName: '翠花',
    maker: '李四',
    projectName: "项目3",
    category: 2,
    timeStamp: '1716268800000',
    department: '市场部',
    amount: '3000',
    feeType: 1,
    reason: '报销事由',
    receivingName: '王五',
    receivingBankName: '招商银行',
    receivingBankAccount: '12345678901234567890',
    status: 'DRAFT',
  },
]

export const reimburseData = {
  id: 1,
  projectNumber: 'PRJ-2024-001',
  reimbursePersonName: '张三',
  maker: '李四',
  category: 1,
  timeStamp: '1716441600000',
  department: '财务部',
  amount: '1000',
  receivingName: '王五',
  receivingBankName: '中国银行',
  feeType: 1,
  reason: '报销事由',
  receivingBankAccount: '12345678901234567890',
};


export const projectListData = {
  total: 3,
  pageSize: 10,
  currentPage: 1,
  data: [
    {
      id: 1,
      project_number: 'PRJ-2024-001',
      project_name: '项目1',
      short_name: '项目1',
      customer_name: '客户A',
      status: 1,
      director: '张三',
      amount: 10000,
      start_time: '1716441600000',
      end_time: '1726441600000',
      source: 1,
    },
    {
      id: 2,
      project_number: 'PRJ-2024-002',
      project_name: '项目2',
      short_name: '项目2',
      customer_name: '客户B',
      status: 2,
      director: '李四',
      amount: 20000,
      start_time: '1716441600000',
      end_time: '1726441600000',
      source: 2,
    },
    {
      id: 3,
      project_number: 'PRJ-2024-003',
      project_name: '项目3',
      short_name: '项目3',
      customer_name: '客户C',
      status: 3,
      director: '王五',
      amount: 30000,
      start_time: '1716441600000',
      end_time: '1726441600000',
      source: 1,
    }
  ],
};

export const projectData = {
  "basic": {
    id: 1,
    project_number: 'PRJ-2024-001',
    project_name: '环保技术改造项目',
    short_name: '环保改造',
    customer_name: '北京XX科技有限公司',
    status: 1,
    director: '张三',
    amount: 650000,
    bid_bond: 10000,
    start_time: '1716441600000',
    end_time: '1726441600000',
    finished_time: '1728441600000',
    source: 1,
    industry_type: 2,
    project_type: 1,
    bureau: ['环保局', '安监局'],
    report: 1,
    audit_quantity: 5,
    backup_quantity: 3,
    address: '北京市海淀区中关村科技园区',
    describe: '本项目为环保技术改造项目，主要包括以下工作内容：\n1. 废气排放系统升级改造\n2. 废水处理设施更新\n3. 噪声控制系统安装\n4. 环保监测设备安装调试\n5. 环保技术人员培训',
    establisher: '李四',
  },
  "contract": {
    id: 1,
    project_number: 'PRJ-2024-001',
    project_name: '环保技术改造项目',
    contract_number: 'CT-2024-001',
    contract_name: '环保技术改造项目合同',
    sign_date: '1716451600000',
    contract_type: 1,
    contract_amount: 650000,
    payment_method: 2,
    payment_terms: '首付30%，验收后40%，质保期后30%',
    tax_rate: 6,
    warranty_period: 12,
    contract_period: 180,
    customer_info: {
      name: '北京XX科技有限公司',
      contact: '王经理',
      phone: '13800138000',
      address: '北京市海淀区中关村科技园区',
    },
    attachments: [
      { name: '合同正文.pdf', url: '/uploads/contract.pdf' },
      { name: '技术方案.docx', url: '/uploads/tech_plan.docx' }
    ]
  },
  "process": {
    id: 1,
    project_number: 'PRJ-2024-001',
    project_name: '环保技术改造项目',
    processes: [
      {
        stage: 1,
        name: '立项阶段',
        status: 'completed',
        start_date: '1716441600000',
        end_date: '1716541600000',
        responsible: '李四',
        description: '项目立项已完成，各项资料齐全'
      },
      {
        stage: 2,
        name: '规划阶段',
        status: 'completed',
        start_date: '1716551600000',
        end_date: '1716651600000',
        responsible: '张三',
        description: '项目规划已完成，技术方案已确定'
      },
      {
        stage: 3,
        name: '实施阶段',
        status: 'in_progress',
        start_date: '1716661600000',
        end_date: '1718661600000',
        responsible: '张三',
        description: '正在进行废气排放系统升级改造'
      },
      {
        stage: 4,
        name: '验收阶段',
        status: 'pending',
        start_date: '1718671600000',
        end_date: '1719671600000',
        responsible: '王五',
        description: '等待项目实施完成后进行验收'
      }
    ]
  },
  "member": {
    id: 1,
    project_number: 'PRJ-2024-001',
    project_name: '环保技术改造项目',
    members: [
      {
        id: 1,
        name: '张三',
        role: '项目负责人',
        department: '技术部',
        phone: '13900139000',
        email: 'zhangsan@example.com',
        join_date: '1716441600000'
      },
      {
        id: 2,
        name: '李四',
        role: '技术经理',
        department: '技术部',
        phone: '13900139001',
        email: 'lisi@example.com',
        join_date: '1716441600000'
      },
      {
        id: 3,
        name: '王五',
        role: '质量控制',
        department: '质量部',
        phone: '13900139002',
        email: 'wangwu@example.com',
        join_date: '1716451600000'
      },
      {
        id: 4,
        name: '赵六',
        role: '技术工程师',
        department: '技术部',
        phone: '13900139003',
        email: 'zhaoliu@example.com',
        join_date: '1716461600000'
      }
    ]
  },
  "material": {
    id: 1,
    project_number: 'PRJ-2024-001',
    project_name: '环保技术改造项目',
    materials: [
      {
        id: 1,
        name: '废气处理设备',
        type: '设备',
        quantity: 2,
        unit: '套',
        price: 80000,
        total: 160000,
        supplier: '天津环保设备有限公司',
        delivery_date: '1717441600000',
        status: '已到货'
      },
      {
        id: 2,
        name: '废水处理系统',
        type: '设备',
        quantity: 1,
        unit: '套',
        price: 120000,
        total: 120000,
        supplier: '上海水处理技术有限公司',
        delivery_date: '1717541600000',
        status: '已到货'
      },
      {
        id: 3,
        name: '环保监测仪器',
        type: '仪器',
        quantity: 5,
        unit: '台',
        price: 20000,
        total: 100000,
        supplier: '北京精密仪器有限公司',
        delivery_date: '1717641600000',
        status: '运输中'
      }
    ]
  },
  "archive": {
    id: 1,
    project_number: 'PRJ-2024-001',
    project_name: '环保技术改造项目',
    documents: [
      {
        id: 1,
        name: '项目立项报告',
        type: '立项文档',
        upload_date: '1716541600000',
        uploader: '李四',
        file_url: '/uploads/project_proposal.pdf',
        status: '已审核'
      },
      {
        id: 2,
        name: '技术方案',
        type: '技术文档',
        upload_date: '1716641600000',
        uploader: '张三',
        file_url: '/uploads/technical_solution.docx',
        status: '已审核'
      },
      {
        id: 3,
        name: '项目进度报告',
        type: '进度文档',
        upload_date: '1716941600000',
        uploader: '张三',
        file_url: '/uploads/progress_report.xlsx',
        status: '已审核'
      }
    ]
  },
  "risk": {
    id: 1,
    project_number: 'PRJ-2024-001',
    project_name: '环保技术改造项目',
    risks: [
      {
        id: 1,
        name: '设备交付延迟',
        level: '中',
        probability: '中',
        impact: '高',
        status: '已解决',
        response_plan: '与供应商签订严格的交付协议，设置延迟罚款条款',
        responsible: '李四',
        create_date: '1716541600000'
      },
      {
        id: 2,
        name: '技术实施难度大',
        level: '高',
        probability: '中',
        impact: '高',
        status: '监控中',
        response_plan: '提前进行技术评估，配备经验丰富的技术人员',
        responsible: '张三',
        create_date: '1716641600000'
      },
      {
        id: 3,
        name: '客户需求变更',
        level: '中',
        probability: '低',
        impact: '高',
        status: '监控中',
        response_plan: '与客户保持密切沟通，制定变更管理流程',
        responsible: '王五',
        create_date: '1716741600000'
      }
    ]
  },
};

export const totalData = {
  flowTaskData: {   // 流程任务统计
    waiting: { percent: 17.61, color: '#F2BD45' },  // 待审
    inProgress: { percent: 20.47, color: '#7BCB77' }, // 待阅
    completed: { percent: 62.1, color: '#39A0FF' } // 已审
  },
  projectData: {   // 项目情况统计
    waiting: { percent: 10, color: '#F2BD45' },  // 待审
    inProgress: { percent: 20, color: '#7BCB77' }, // 进行中
    completed: { percent: 60, color: '#39A0FF' }, // 完成,
    terminated: { percent: 10, color: '#E57979' } // 终止
  },
  financeData: {   // 财务状况统计
    expense: { value: 50, color: '#FF6B6B' }, // 费用额
    income: { value: 40, color: '#39A0FF' },
    pending: { value: 10, color: '#7BCB77' }
  },
  newsData: [], // 资讯列表
  policyData: [] // 政策法规列表
}


export const personnelList = {
  total: 3,
  pageSize: 10,
  currentPage: 1,
  data: [
    {
      id: 1,
      show_name: '张三2',
      real_name: '张三',
      gender: 1,
      role: 1,
      contact: '13800138000',
      region: '北京',
    },
    {
      id: 2,
      show_name: '李四1',
      real_name: '李四',
      gender: 2,
      role: 2,
      contact: '13800138001',
      region: '上海',
    }
  ]
}

export const customerList = {
  total: 3,
  pageSize: 10,
  currentPage: 1,
  data: [
    {
      id: 1,
      customer_name: '客户A',
      industry_type: 1,
      company_tel: '13800138000',
      register_address: '北京市海淀区',
      legal_person: '张三',
    },
    {
      id: 2,
      customer_name: '客户B',
      industry_type: 2,
      company_tel: '13800138001',
      register_address: '上海市浦东新区',
    }
  ]
}

export const processList = {
  total: 3,
  pageSize: 10,
  currentPage: 1,
  data: [
    {
      id: 1,
      project_number: 'PRJ-2024-001',
      operator: '张三',
      rank: '紧急',
      result: '同意',
      start_time: '1716441600000',
      finish_time: '1716441600000',
      status: 'pending',
    },
    {
      id: 2,
      project_number: 'PRJ-2024-002',
      operator: '李四',
      rank: '重要',
      result: '不同意',
      start_time: '1716441600000',
      finish_time: '1716441600000',
      status: 'pending',
    },
  ],
}
