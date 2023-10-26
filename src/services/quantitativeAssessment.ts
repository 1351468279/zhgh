import { http, request,requestRows } from "@/utils/http";
import type { applySanYuListType } from "@/types/hotel";
import type { UploadFileType } from "@/types/sanYu";
import type { UniFilePickerTempFile } from "@uni-helper/uni-ui-types";
import type { lawerItem } from "@/types/legalAid";
import type { myDataResItemsType, myDataResType } from "@/types/quantitativeAssessment";
// 获取个人数据
export const getinviteData=()=>{
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
export const getMyInfoApi=()=>{
    return requestRows({
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
// 提交互评
export const submitMyInfoApi=(data:{
    id:string,
    messageId:string,
    messageTitle:string,
    memberUserId:string,
    memberUsername:string,
    evaluate:string,
    describe:string,
    self:string
})=>{
    return request<myDataResItemsType>({
        url:'/lhkpMem/api/joinEvaluation',
        method:'POST',
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
// 获取互评人
export const getTogetherEvaluationApi=(id:string)=>{
    return request<any>({
        url:'/lhkpMem/api/getTogetherEvaluationPage',
        method:'GET',
        data:{
            id
        }
    })
}
// 邀请互评人
export const inviteotherEvaluateApi=(memberId:string,otherId:string)=>{
    return request({
        url:'/lhkpMem/api/invite',
        method:'POST',
        data:{
            memberId,
            otherId
        }
    })
}