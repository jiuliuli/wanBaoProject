export enum PROJECT_SOURCE_TYPE {
    INTERNAL = 1,
    EXTERNAL = 2,
}

export const PROJECT_SOURCE_TYPE_TEXT: Record<PROJECT_SOURCE_TYPE, string> = {
    [PROJECT_SOURCE_TYPE.INTERNAL]: '自营',
    [PROJECT_SOURCE_TYPE.EXTERNAL]: '合作',
}

export enum INDUSTRY_TYPE {
    INDUSTRY_TYPE_1 = 1,
    INDUSTRY_TYPE_2 = 2,
    INDUSTRY_TYPE_3 = 3,
}

export const INDUSTRY_TYPE_TEXT: Record<INDUSTRY_TYPE, string> = {
    [INDUSTRY_TYPE.INDUSTRY_TYPE_1]: '行业1',
    [INDUSTRY_TYPE.INDUSTRY_TYPE_2]: '行业2',
    [INDUSTRY_TYPE.INDUSTRY_TYPE_3]: '行业3',
}

export enum EVALUATE_TYPE {
    EVALUATE_TYPE_1 = 1,
    EVALUATE_TYPE_2 = 2,
    EVALUATE_TYPE_3 = 3,
}

export const EVALUATE_TYPE_TEXT: Record<EVALUATE_TYPE, string> = {
    [EVALUATE_TYPE.EVALUATE_TYPE_1]: '行业1',
    [EVALUATE_TYPE.EVALUATE_TYPE_2]: '行业2',
    [EVALUATE_TYPE.EVALUATE_TYPE_3]: '行业3',
}

export const PROJECT_STATUS = ['创建', '立项审批', '风险分析', '派单中', '合同签订', '项目启动', '作业中', '报告审核', '专家评审', '出版备案', '结算中', '完成', '挂起', '终结', '删除']

export enum VENTURE_TYPE {
    high = 1,
    middle = 2,
    low = 3,
}

export const VENTURE_TYPE_TEXT: Record<VENTURE_TYPE, string> = {
    [VENTURE_TYPE.high]: '高',
    [VENTURE_TYPE.middle]: '中',
    [VENTURE_TYPE.low]: '低',
}

export enum VENTURE_FACTOR_TYPE {
    VENTURE_FACTOR_TYPE_1 = 1,
    VENTURE_FACTOR_TYPE_2 = 2,
    VENTURE_FACTOR_TYPE_3 = 3,
}

export const VENTURE_FACTOR_TYPE_TEXT: Record<VENTURE_FACTOR_TYPE, string> = {
    [VENTURE_FACTOR_TYPE.VENTURE_FACTOR_TYPE_1]: '行业1',
    [VENTURE_FACTOR_TYPE.VENTURE_FACTOR_TYPE_2]: '行业2',
    [VENTURE_FACTOR_TYPE.VENTURE_FACTOR_TYPE_3]: '行业3',
}

export enum SCALE_TYPE {
    SCALE_TYPE_1 = 1,
    SCALE_TYPE_2 = 2,
    SCALE_TYPE_3 = 3,
}

export const SCALE_TYPE_TEXT: Record<SCALE_TYPE, string> = {
    [SCALE_TYPE.SCALE_TYPE_1]: '行业1',
    [SCALE_TYPE.SCALE_TYPE_2]: '行业2',
    [SCALE_TYPE.SCALE_TYPE_3]: '行业3',
}







