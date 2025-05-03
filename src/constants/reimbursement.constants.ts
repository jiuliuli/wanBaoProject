export enum REIMBURSEMENT_CATEGORY {
    project = 1,
    nonProject = 2,
}

export const REIMBURSEMENT_CATEGORY_TEXT: Record<REIMBURSEMENT_CATEGORY, string> = {
    [REIMBURSEMENT_CATEGORY.project]: '项目报销',
    [REIMBURSEMENT_CATEGORY.nonProject]: '非项目报销',
}


export enum FEE_TYPE {
    travel = 1,  // 差旅费
    evaluation = 2, // 评审费
    channel = 3, // 渠道费
    assist = 4, // 公司协助发生的费用
    outsource = 5, // 委外成本
    cooperation = 6, // 合作提成
    branch = 7, // 分公司团队成本
    job = 8, // 作业提成
    market = 9, // 市场提成
    signature = 10, // 签字费
    binding = 11, // 装订费
    hospitality = 12, // 招待费
    office = 13, // 办公费
    fuel = 14, // 加油费
    toll = 15, // 过路费
    repair = 16, // 车辆维修费
    maintenance = 17, // 车辆保养费
    cleaning = 18, // 洗车费
    commission = 19, // 绩效提成
    fixedAssets = 20, // 固定资产
    welfare = 21, // 福利费
    laboratory = 22, // 实验室辅助材料
    rent = 23, // 房租费
    property = 24, // 物业费
    electricity = 25, // 水电费
    communication = 26, // 通讯费
    qualification = 27, // 资质维护费
    projectOther = 28, // 项目其他费用
    nonProjectOther = 29, // 非项目其他费用
}

export const PROJECT_FEE_TYPE_TEXT = {
    [FEE_TYPE.travel]: '差旅费',
    [FEE_TYPE.evaluation]: '评审费',
    [FEE_TYPE.channel]: '渠道费',
    [FEE_TYPE.assist]: '公司协助发生的费用',
    [FEE_TYPE.outsource]: '委外成本',
    [FEE_TYPE.cooperation]: '合作提成',
    [FEE_TYPE.branch]: '分公司团队成本',
    [FEE_TYPE.job]: '作业提成',
    [FEE_TYPE.market]: '市场提成',
    [FEE_TYPE.signature]: '签字费',
    [FEE_TYPE.binding]: '装订费',
    [FEE_TYPE.hospitality]: '招待费',
    [FEE_TYPE.projectOther]: '项目其他费用',
}

export const NON_PROJECT_FEE_TYPE_TEXT = {
    [FEE_TYPE.office]: '办公费',
    [FEE_TYPE.travel]: '差旅费',
    [FEE_TYPE.fuel]: '加油费',
    [FEE_TYPE.toll]: '过路费',
    [FEE_TYPE.repair]: '车辆维修费',
    [FEE_TYPE.maintenance]: '车辆保养费',
    [FEE_TYPE.cleaning]: '洗车费',
    [FEE_TYPE.binding]: '装订费',
    [FEE_TYPE.commission]: '绩效提成',
    [FEE_TYPE.fixedAssets]: '固定资产',
    [FEE_TYPE.welfare]: '福利费',
    [FEE_TYPE.laboratory]: '实验室辅助材料',
    [FEE_TYPE.rent]: '房租费',
    [FEE_TYPE.property]: '物业费',
    [FEE_TYPE.electricity]: '水电费',
    [FEE_TYPE.communication]: '通讯费',
    [FEE_TYPE.qualification]: '资质维护费',
    [FEE_TYPE.hospitality]: '招待费',
    [FEE_TYPE.nonProjectOther]: '非项目其他费用',
}

export const FEE_TYPE_TEXT = {
    ...PROJECT_FEE_TYPE_TEXT,
    ...NON_PROJECT_FEE_TYPE_TEXT,
}
