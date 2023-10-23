import type { unionFeeListParamsType } from "@/types/fundManagement";
import { requestRows } from "@/utils/http";
export type activityItem= {
        id: string;
        title:string
        address: string;
        participantsNumber: number;
        createTime:string
        imgList: {
          id: string;
          path: string;
        }[];
      }
 
// 获取未开始活动列表接口
export const getUnactivityListApi = (page: number, state: number) => {
  return requestRows<activityItem[]>({
    url: "/lxygl/api/getHdData",
    method: "GET",
    data: {
      limit: 10,
      title: "",
      page,
      state,
    },
  });
};
