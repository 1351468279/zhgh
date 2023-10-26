import { http, request,requestRows } from "@/utils/http";
import type { applySanYuListType } from "@/types/hotel";
import type { UploadFileType } from "@/types/sanYu";
import type { UniFilePickerTempFile } from "@uni-helper/uni-ui-types";
import type { lawerItem } from "@/types/legalAid";
export const getLawerListApi=(page:number,name:string)=>{
    return requestRows<lawerItem[]>({
        url:'/flyz/page.bts',
        method:'GET',
        data:{
            limit:1000,
            page,
            name,
            isDelete:1
        }
    })
}