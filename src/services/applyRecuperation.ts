import { http, request } from "@/utils/http";
 import type { UploadFileType } from "@/types/sanYu";
 import type { applyRecuperationDataParams, applyRecuperationDataType, applyRecuperationResDataType } from "@/types/recuperation";
// 获取用户信息，用于填写申请时候回显数据
export const handleActivity = (type:number,id?:string) => {
    return request<applyRecuperationResDataType>({
        method: 'GET',
        url: '/lxygl/api/getInitDataByHd',
        data:{
            type:type,
            id:id
        }
    })
}
 
// 上传表单信息
export const uploadForm = (data: applyRecuperationDataType) => {
    return request({
        method: 'POST',
        url: '/lxygl/api/hdDataAddOrUpdate',
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
export const getImage=(path:string)=>{
    return http({
        method:'GET',
        url:'/dbylAndKnbf/imgsPath.interface',
        data:{path}
    })

}
// 报名
export const registerApi=(id:string)=>{
    return request({
        url:'/lxygl/api/registerEvents',
        method:'GET',
        data:{
            id
        }
    })
}
// 取消报名
export const unRegisterApi=(id:string)=>{
    return request({
        url:'/lxygl/api/noJoin',
        method:'GET',
        data:{
            id
        }
    })
}
// 打卡
export const attendApi=(id:string)=>{
    return request({
        url:'/lxygl/api/attend',
        method:'GET',
        data:{
            id
        }
    })
}