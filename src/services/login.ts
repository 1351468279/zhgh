// src/services/login.ts


import type { LoginResult, PhoneResult, OrgDataType } from '@/types/member'
import type { ProfileType } from '@/store/modules/member'
import { http } from '@/utils/http'

type LoginParams = {
    code: string
    acccount?: any,
    password?: any
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: LoginParams) => {
    return http<ProfileType>({
        method: 'POST',
        url: '/wechat/wxlogin.interface',
        data,
    })
}
export const getPhoneNum = (data: LoginParams) => {  //测试
    return http<PhoneResult>({
        method: 'POST',
        url: '/wechat/getPhoneNum.interface',
        data,
    })
}
/* 账号密码登录 */
export const postLoginAPI = (data: { code: string, username: string, password: string }) => {
    return http<ProfileType>({
        method: 'POST',
        url: '/wechat/accountlogin.interface',
        data,
    })
}