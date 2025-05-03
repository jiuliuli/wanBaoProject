export enum INVOICE_TYPE {
    special = 1,
    normal = 2,
}

export const INVOICE_TYPE_TEXT: Record<INVOICE_TYPE, string> = {
    [INVOICE_TYPE.special]: '增值税专用发票',
    [INVOICE_TYPE.normal]: '增值税普通发票',
}

