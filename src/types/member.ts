// src/types/member.d.ts

/** 小程序登录 登录用户信息 */
export type LoginResult = {

    /** 登录凭证 */
    token?: string
}
/** 小程序授权登录 返回手机号信息 */
export type PhoneResult = {
    phoneNumber: string
}
// 组织信息格式
export type OrgDataType = {
    name: string,
    id: string
}
