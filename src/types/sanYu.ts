import type { UniFilePickerTempFileFile } from "@uni-helper/uni-ui-types";

// 上传文件类型
export type UploadFileType = {
    file: UniFilePickerTempFileFile,
    type: string,
    id: string,
}

// 申请三育人成员信息类型
export interface applySanYuType {
    id: String;//主键；
    userId: String;//用户id；
    name: String;//姓名；
    nation: String;//民族；
    unit: String;//单位；
    sex: String;//性别；
    age: String;//年龄；
    politics: String;//政治面貌；
    education: String;//学历；
    degree: String;//学位；
    title: String;//职位；
    duties: String;//职务
}
// 获取三育人各类型成员接口参数类型
export interface getSanYuListType {
    stuEducation: { fs: number },
    pageVo: {
        limit: number,
        offset: number,
        sidx: string,
        sord: string
    }
}