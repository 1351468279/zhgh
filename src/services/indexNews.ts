import { http, request, requestRows } from "@/utils/http";
export type categoryItemType = {
  createDate: string;
  createUser: string;
  draft: number;
  gjz: string;
  id: string;
  inMenu: number;
  lj: string;
  mb: string;
  px: number;
  slt: string;
  updateDate: string;
  updateUser: string;
  xmjsmx: string;
  xmmche: string;
};
export type categoryListType = categoryItemType[];
export const getNewsCategoryList = () => {
  return request<{categoryList:categoryListType}>({
    url: "/tzgs/commMenu.ignore",
    method: "GET",
  });
};
export type newsItem={
  id:string;
  fwl?:string
  bt:string;
  slt:string 
  fbsj:string
}
// 根据新闻分类id查询新闻列表
export const getNewsListById = (data:{
  page:number,
  pageSize:number,
  lMid:string
}) => {
  return requestRows<newsItem[]> ({
    url: "/wechat.bts.ignore",
    method: 'POST',
    data
  });
};
export type newsInfo={
  id:string;
  fwl?:string
  bt:string;
  context:string
  fbsj:string
}
// 根据新闻分类id查询新闻详情
export const getNewsDetailById = (id:string) => {
  return request<newsInfo> ({
    url: "/wechat.content.ignore?id="+id,
    method: 'GET',
 
  });
};
