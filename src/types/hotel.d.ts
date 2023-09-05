export interface hotelApp {
    url: string,

    src: string,

    content: string,

    id: number,

    mine: boolean

}
// 申请入会成员信息类型
export type applyUnionType ={
    unionName: string,
    jobId: string,
    name: string,
    idCard: string,
    sex: string,
    nationality: string,
    educational: string,
    birthday: string,
    phone: Number,
    email: string,
    enterTime: string,
    status?:boolean
}