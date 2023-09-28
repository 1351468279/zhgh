export interface hotelApp {
    url: string,
    src: string,
    name: string,
    id: number,
    mine: boolean
}
import { ReviewStr } from '@/enum/applyUnion'
// 成员基本信息类型
export type normalType = {
    name: string,
    idNumber: string,
    sex: Number,
    nation: string,
    record: string,
}
// 申请入会成员信息类型
export interface applyUnionType extends normalType {
    orgId: string,
    account: string,
    birthday: string,
    mobile: string,
    email: string
}
// 审核列表成员信息类型
export interface reviewListType extends normalType {
    account: string,
    birthday: string,
    mobile: string,
    email: string,
    state: ReviewStr,
    id: string,
    orgId: string,
    process: number,
}
// 申请列表回显三育人成员信息
export interface applySanYuListType {
    age: string,        /* 年龄 */
    education: string,  /* 学历 */
    id: string,         /* 主键 */
    name: string,       /* 姓名 */
    nation: string,     /* 民族 */
    process: Number,    /* 审核进度 */
    sex: string,        /* 性别 */
    userId: string,     /* 用户id */
    degree: string,     /* 学位 */
    politics: string,   /* 政治面貌 */
    unit: string,        /* 工作单位 */
    title: string,      /* 职位 */
    duties: string,     /* 职务 */
}
// 申请三育人成员信息类型
export interface applySanYuType {
    age: string,        /* 年龄 */
    education: string,  /* 学历 */
    degree: string,     /* 学位*/
    id?: string,        /* 主键 */
    name: string,       /* 姓名 */
    nation: string,     /* 民族 */
    process?: Number,   /* 审核进度 */
    sex: string,        /* 性别 */
    userId?: string,    /* 用户id */
    unit: string,       /* 工作单位 */
    politics: string,   /* 政治面貌 */
    title: string,      /* 职位 */
    duties: string,     /* 职务 */
}
