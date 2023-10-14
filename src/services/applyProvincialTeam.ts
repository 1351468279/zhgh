import {   request } from "@/utils/http";
 import type { UploadFileType } from "@/types/sanYu";
 import type { applyProvincialTeamType, getProvincialTeamListType } from "@/types/provincialTeam";
// 获取用户信息，用于填写申请时候回显数据
export const getUserInfo = () => {
    return request<applyProvincialTeamType>({
        method: 'GET',
        url: '/wechat/team/getUserInfo.do'
    })
}
// 上传文件
export const uploadFile = (data: UploadFileType) => {
    const formdata = new FormData()
    formdata.append('file', data.file)
    formdata.append('type', data.type)
    formdata.append('id', data.id)
    return request({
        header: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        url: '/selection/userFile',
        data
    })
}
// 上传表单信息
export const uploadForm = (data: any) => {
    return request({
        method: 'POST',
        url: '/selection/insertTeamData.do',
        data
    })
}
// 省部级个人分页查询
export const getTeamProvincialListApi = (data:getProvincialTeamListType) => {
    return request<{
        flag: string,
        rows: [],
        total: number
    }>({
        method: 'POST',
        url: '/wechat/person/getPersonData.do',
        data
    })
}
// 下载文件
export const downloadFile = (id: string) => {
    return request({
        method: 'GET',
        url: '/selection/user/downPdfBASE64',
        data: {
            id: id
        }
    })
}
// 查看用户是否上传过文件
export const checkFile = (id: string) => {
    return request({
        method: 'GET',
        url: '/selection/showFile',
        data: { id }
    })
}
// 用户上报三育人
export const reportSanYu = (id: string) => {
    return request({
        method: 'POST',
        url: '/wechat/team/changeState.do',
        data: [id]
    })
}
// 根据id获取三育人信息
export const getProvincialPersonInfo = (id: string) => {
    return request({
        method: 'POST',
        url: '/wechat/team/returnTeamInfoById.do',
        data: JSON.stringify(id)
    })
}
