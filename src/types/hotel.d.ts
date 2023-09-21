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
// 申请三育人成员信息类型
export interface applySanYuType extends normalType {
    age: string,
    politicalStr: string,
    bachelor: string,
    employer: string,
    jobTittle: string,
    position: string,
    workExperience: string,
    status?: string,
}