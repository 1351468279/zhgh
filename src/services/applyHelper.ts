import { http, request } from "@/utils/http";
import type { applySanYuListType } from "@/types/hotel";
import type { UploadFileType } from "@/types/sanYu";
import type { applyDiseaseHelper } from "@/types/diseaseHelper.d";

import type { UniFilePickerTempFile } from "@uni-helper/uni-ui-types";
import type { cardListItemType, getDifficultyHelperParamsType, getDifficultyNewsListType } from "@/types/difficultyHelper";
// 获取用户信息，用于填写申请时候回显数据
export const getUserInfo = () => {
  return request<applyDiseaseHelper>({
    method: "GET",
    url: "/wechat/knbf/getUserInfo.do",
  });
};
// 上传文件
export const uploadFile = (data: UploadFileType) => {
  const formdata = new FormData();
  formdata.append("file", data.file);
  formdata.append("type", data.type);
  formdata.append("id", data.id);
  return request({
    header: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    url: "/dbylAndKnbf/userFile",
    data,
  });
};
// 上传表单信息
export const uploadForm = (data: any) => {
  return request({
    method: "POST",
    url: "/knbf/api/updataOrAddKnbfData",
    data,
  });
};
// 省部级个人分页查询
export const getPersonProvincialListApi = (data:getDifficultyHelperParamsType) => {
  return request<{
    flag: string;
    rows: [];
    total: number;
  }>({
    method: "POST",
    url: "/wechat/knbf/getKhbfData.do",
    data,
  });
};
// 下载文件
export const downloadFile = (id: string) => {
  return request({
    method: "GET",
    url: "/selection/user/downPdfBASE64",
    data: {
      id: id,
    },
  });
};
// 查看用户是否上传过文件
export const checkFile = (id: string) => {
  return request({
    method: "GET",
    url: "/selection/showFile",
    data: { id },
  });
};
// 用户上报三育人
export const reportSanYu = (id: string) => {
  return request({
    method: "POST",
    url: "/wechat/knbf/changeState.do",
    data: [id],
  });
};
// 根据id获取三育人信息
export const getProvincialPersonInfo = (id: string) => {
  return request({
    method: "POST",
    url: "/wechat/knbf/returnKnbfInfoById.do",
    data: JSON.stringify(id),
  });
};
// 获取困难帮扶新闻列表
export const getDifficultyNewsList = (data: {
  knbfNews: {};
  pageVo: {
    limit: number;
    offset: number;
    sidx: string;
    sord: string;
  };
}) => {
  return request<getDifficultyNewsListType>({
    method: "POST",
    url: "/wechat/knbf/getknbfNews.do",
    data,
  });
};
// 根据新闻id获取新闻详情
export const getNewsDetail = (id: string) => {
  return request({
    method: "POST",
    url: "/wechat/knbf/getknbfNewsById.do",
    data: { id },
  });
};
// 三育人分页查询
export const getSanYuListApi = (data:getDifficultyHelperParamsType) => {
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
