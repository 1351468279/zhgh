// 定义服务大厅接口数据
import type { hotelApp } from '../types/hotel'
import { ref } from 'vue'
export const hotelData = ref<hotelApp[]>([{
    src: 'http://cloud.zhgn.cn:808/phone/index/renzheng.png',
    url: '/subpackages/hotel/applyUnion',
    name: '申请入会',
    id: 1,
    mine: true
}, {
    src: 'http://cloud.zhgn.cn:808/phone/index/shenling.png',
    url: '/subpackages/hotel/membershipReview',
    name: '入会审核',
    id: 2,
    mine: true
}, {
    src: 'http://cloud.zhgn.cn:808/phone/hotel/1-17.png',
    url: '/subpackages/hotel/sanYuReview',
    name: '三育人',
    id: 3,
    mine: true
}, {
    src: 'http://cloud.zhgn.cn:808/phone/hotel/1-10.png',
    url: '/subpackages/hotel/thirtyYearsReview',
    name: '教龄30年',
    id: 4,
    mine: false
}, {
    src: 'http://cloud.zhgn.cn:808/phone/hotel/1-8.png',
    url: '/subpackages/hotel/provincialPersonReview',
    name: '省部级个人',
    id: 5,
    mine: true
}, {
    src: 'http://cloud.zhgn.cn:808/phone/hotel/1-15.png',
    url: '/subpackages/hotel/provincialTeamReview',
    name: '省部级集体',
    id: 6,
    mine: true
}, {
    src: 'http://cloud.zhgn.cn:808/phone/hotel/1-2.png',
    url: '/subpackages/hotel/difficultyHelper',
    name: '困难帮扶',
    id: 7,
    mine: false
}, {
    src: 'http://cloud.zhgn.cn:808/phone/icon/1-10.png',
    url: '/subpackages/hotel/diseaseTreatment',
    name: '大病医疗互助',
    id: 8,
    mine: false
}, {
    src: 'http://cloud.zhgn.cn:808/phone/icon/1-3.png',
    url: '/subpackages/hotel/legalAid',
    name: '法律援助',
    id: 9,
    mine: false
}, {
    src: 'http://cloud.zhgn.cn:808/phone/hotel/1-9.png',
    url: '/subpackages/hotel/recuperationPage',
    name: '疗休养',
    id: 10,
    mine: false
}, 
{
    src: 'http://cloud.zhgn.cn:808/phone/hotel/1-14.png',
    url: '/subpackages/hotel/quantitativeAssessment',
    name: '量化考评',
    id: 11,
    mine: false
},
//  {
//     src: 'http://cloud.zhgn.cn:808/phone/hotel/1-12.png',
//     url: '/subpackages/hotel/publicBuilding/index',
//     name: '党建工作',
//     id: 12,
//     mine: false
// },
// {
//     src: 'http://cloud.zhgn.cn:808/phone/hotel/1-14.png',
//     url: '/subpackages/hotel/teachingUnion/index',
//     name: '教代会',
//     id: 13,
//     mine: false
// }, 
    {
    src: 'http://cloud.zhgn.cn:808/phone/icon/activity.png',
    url: '/subpackages/hotel/unionActivity/index',
    name: '工会活动',
    id: 13,
    mine: false
},
// {
//     src: 'http://cloud.zhgn.cn:808/phone/icon/fees.png',
//     url: '/subpackages/hotel/fundManagement/index',
//     name: '经费管理',
//     id: 13,
//     mine: false
// }
// ,
// {
//     src: 'http://cloud.zhgn.cn:808/phone/icon/message.png',
//     url: '/subpackages/hotel/charimanBox/index',
//     name: '主席信箱',
//     id: 13,
//     mine: false
// }
])