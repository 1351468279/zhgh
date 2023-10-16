import type { unionFeeListParamsType, unionFeeListResultData, unionPersonFeeListParamsType, unionPersonFeeListResultData } from "@/types/fundManagement";
import { request } from "@/utils/http";
// 获取会费缴纳列表接口
export const getUnionFeeList=(data:unionFeeListParamsType)=>{
    return request<unionFeeListResultData>({
        method:'GET',
        url:'/standard/api/duesPayStandardList.do',
        data
    })
}
// 获取个人会费缴纳列表接口
export const getPersonUnionFeeList=(data:unionPersonFeeListParamsType)=>{
    return request<unionPersonFeeListResultData>({
        method:'GET',
        url:'/duesPay/api/getRecordToPage',
        data
    })
}