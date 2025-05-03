export enum GENDER_TYPE {
    MALE = 1,
    FEMALE = 2,
}

export const GENDER_TYPE_TEXT: Record<GENDER_TYPE, string> = {
    [GENDER_TYPE.MALE]: '男',
    [GENDER_TYPE.FEMALE]: '女',
}



export enum ROLE_TYPE {
    admin = 1,
    general_manager = 2,
    business_manager = 3,
    market = 4,
    technology = 5,
    finance = 6,
    administration = 7,
    maintenance = 8,
    safety_evaluation = 9,
    process_control = 10,
    other = 11,
}

export const ROLE_TYPE_TEXT: Record<ROLE_TYPE, string> = {
    [ROLE_TYPE.admin]: '管理员',
    [ROLE_TYPE.general_manager]: '总经理',
    [ROLE_TYPE.business_manager]: '业务主管',
    [ROLE_TYPE.market]: '市场',
    [ROLE_TYPE.technology]: '技术',
    [ROLE_TYPE.finance]: '财务',
    [ROLE_TYPE.administration]: '行政',
    [ROLE_TYPE.maintenance]: '维护',
    [ROLE_TYPE.safety_evaluation]: '安评',
    [ROLE_TYPE.process_control]: '过控',
    [ROLE_TYPE.other]: '其他',
}

export enum RIGHT_TYPE {
    admin = 1,
    general_manager = 2,
    business_manager = 3,
}

export const RIGHT_TYPE_TEXT: Record<RIGHT_TYPE, string> = {
    [RIGHT_TYPE.admin]: '管理员权限',
    [RIGHT_TYPE.general_manager]: '总经理权限',
    [RIGHT_TYPE.business_manager]: '业务主管权限',
}

// 可用、离职、禁用

export enum VALID_TYPE {
    support = 1,
    leave = 2,
    disable = 3,
}

export const VALID_TYPE_TEXT: Record<VALID_TYPE, string> = {
    [VALID_TYPE.support]: '可用',
    [VALID_TYPE.leave]: '离职',
    [VALID_TYPE.disable]: '禁用',
}