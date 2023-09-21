import { request } from "@/utils/http";
// 获取用户信息，用于填写申请时候回显数据
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/wechat/education/getUserInfo.do'
    })
}