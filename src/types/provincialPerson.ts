import type { UniFilePickerTempFileFile } from "@uni-helper/uni-ui-types";

// 上传文件类型
export type UploadFileType = {
    file: UniFilePickerTempFileFile,
    type: string,
    id: string,
}

// 申请省部级个人成员信息类型
export interface applyProvincialPersonType {
    id?: String;//主键；
    name?: String;//姓名；
    userId?: String;//用户id；
    sex?: String;//性别；
    unit?: String;//单位；
    title?: String;//职位；
    awardsTime?: String;//获奖时间；
    department?: String;//获奖时间；
    designation?:string;
    process?:number;
}
// 获取三育人各类型成员接口参数类型
export interface getSanYuListType {
    stuPerson: { fs: number },
    pageVo: {
        limit: number,
        offset: number,
        sidx: string,
        sord: string
    }
}