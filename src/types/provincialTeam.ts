import type { UniFilePickerTempFileFile } from "@uni-helper/uni-ui-types";

// 上传文件类型
export type UploadFileType = {
  file: UniFilePickerTempFileFile;
  type: string;
  id: string;
};

// 申请省部级集体成员信息类型
export interface applyProvincialTeamType {
  id?: string;
  userId?: string;
  unit?: string;
  awardsTime?: string;
  designation?: string;
  department?: string;
  process?: number;
}
// 获取三育人各类型成员接口参数类型
export interface getProvincialTeamListType {
  stuTeam: { fs: number };
  pageVo: {
    limit: number;
    offset: number;
    sidx: string;
    sord: string;
  };
}
