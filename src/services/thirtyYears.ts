import { http, request } from "@/utils/http";
import type { applySanYuListType } from "@/types/hotel";
import type { UploadFileType } from "@/types/sanYu";
import type { UniFilePickerTempFile } from "@uni-helper/uni-ui-types";
// 获取用户信息，用于填写申请时候回显数据
export const getUserInfo = () => {
    return request<applySanYuListType>({
        method: 'GET',
        url: '/wechat/education/getUserInfo.do'
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
        url: '/selection/insertEducationData.do',
        data
    })
}
// 三育人分页查询
export const getSanYuListApi = (data: {
    stuEducation: { fs: number },
    pageVo: {
        limit: number,
        offset: number,
        sidx: string,
        sord: string
    }
}) => {
    return request<{
        flag: string,
        rows: [],
        total: number
    }>({
        method: 'POST',
        url: '/wechat/education/getEducationData.do',
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
        url: '/wechat/education/changeState.do',
        data: [id]
    })
}
// 根据id获取三育人信息
export const getSanYuInfo = (id: string) => {
    return http({
        method: 'POST',
        url: '/wechat/education/returnStuInfoById.do',
        data: JSON.stringify(id)
    })
}
