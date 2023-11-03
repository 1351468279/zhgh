import { http, request,requestRows } from "@/utils/http";
import type { applySanYuListType } from "@/types/hotel";
import type { UploadFileType } from "@/types/sanYu";
import type { UniFilePickerTempFile } from "@uni-helper/uni-ui-types";
import type { lawerItem } from "@/types/legalAid";
import type { getTogethorEvaluator, getTogethorEvaluatorRes, myDataResItemsType, myDataResType } from "@/types/quantitativeAssessment";
// 获取个人数据
export const getinviteDataByAdmin=()=>{
    return requestRows<myDataResType>({
        url:'/lhkpMem/api/getMyListData',
        method:'GET',
        data:{
            type:0,
            limit:1000,
            page:1,
            messageTitle:'',
            self:1,
            orgId:''
        }
    })
}
// 获取他人邀请我评价的数据api
export const getinviteDataByOther=()=>{
    return requestRows<myDataResType>({
        url:'/lhkpMem/api/getMyListData',
        method:'GET',
        data:{
            type:1,
            limit:1000,
            page:1,
            messageTitle:'',
            self:0,
            orgId:''
        }
    })
}
// 提交评价
export const submitMyInfoApi=(data:{
    id:string,
    messageId:string,
    messageTitle:string,
    memberUserId:string,
    memberUsername:string,
    evaluate:string,
    describe:string,
    self:number
})=>{
    return request<myDataResItemsType>({
        url:'/lhkpMem/api/joinEvaluation',
        method:'POST',
        data
    })
}
// 获取互评人
export const getTogetherEvaluationApi=(id:string)=>{
    return request<getTogethorEvaluatorRes>({
        url:'/lhkpMem/api/getTogetherEvaluationPage',
        method:'GET',
        data:{
            id
        }
    })
}
// 邀请互评人
export const inviteotherEvaluateApi=(data:{memberId:string,otherId:string})=>{
    return request({
        url:'/lhkpMem/api/invite',
        method:'POST',
        data
    })
}