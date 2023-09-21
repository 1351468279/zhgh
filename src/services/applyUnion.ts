import type { OrgDataType } from "@/types/member"
import { http, request } from "@/utils/http"
import type { applyUnionType, reviewListType } from '@/types/hotel'
export const getOrgName = () => {
    return http<OrgDataType[]>({
        method: 'GET',
        url: '/wechat/getDepartment.interface',
    })
}
export const submitReview = (data: applyUnionType) => {
    return http({
        method: 'POST',
        url: '/wechat/membership.interface',
        data
    })
}
// 获取用户实时审核状态
export const getReviewStatus = () => {
    return http<Number>({
        method: 'GET',
        url: '/wechat/returnUserState.interface',

    })
}
// 获取用户实时审核信息状态
export const getReviewInfo = () => {
    return http<any[]>({
        method: 'GET',
        url: '/wechat/returnApplyInfo.interface',

    })
}
// 获取管理员审核列表
export const getReviewList = (data: {
    fs: string, pageVo: {
        limit: string, offset: string, sidx: string, sord: string
    }
}) => {
    return http<any>({
        method: 'POST',
        url: '/wechat/adminViewMembership.do',
        data
    })
}
// 通过会员id获取会员信息
export const getReviewInfoById = (id: string) => {
    return http<reviewListType[]>({
        method: 'POST',
        url: '/wechat/returnPersonInfoById.do',
        data: JSON.stringify(id)
    })
}
// 根据会员id审核通过
export const passReview = (id: string) => {
    return http({
        method: 'POST',
        url: '/wechat/passToId.do',
        data: JSON.stringify(id)
    })
}
// 管理员一键审核通过
export const passAllReview = (data: string) => {
    return request({
        method: 'POST',
        url: '/zzhygl/passToId',
        data
    })
}