export enum PROCESS_STATUS {
    PENDING = "pending",
    PROCESSED = "processed",
    TRANSFER = "transfer",
}

export const PROCESS_STATUS_TEXT = {
    [PROCESS_STATUS.PENDING]: "待处理",
    [PROCESS_STATUS.PROCESSED]: "已处理",
    [PROCESS_STATUS.TRANSFER]: "已转交",
}