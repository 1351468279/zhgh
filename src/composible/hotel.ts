// 定义服务大厅接口数据
import type { hotelApp } from '../types/hotel'
import { ref } from 'vue'
export const hotelData = ref<hotelApp[]>([{
    src: '/static/images/hotel/meeting.png',
    url: '/pages/index/loopdown',
    content: '办公会议',
    id: 1,
    mine: true
}, {
    src: '/static/images/hotel/KPI.png',
    url: '/pages/index/loopdown',
    content: '量化考评',
    id: 2,
    mine: false
}, {
    src: '/static/images/hotel/xuexi.png',
    url: '/pages/index/loopdown',
    content: '我要学习',
    id: 3,
    mine: true
}, {
    src: '/static/images/hotel/exam.png',
    url: '/pages/index/loopdown',
    content: '我要考试',
    id: 4,
    mine: false
}, {
    src: '/static/images/hotel/fuxi.png',
    url: '/pages/index/loopdown',
    content: '我要复习',
    id: 5,
    mine: true
}, {
    src: '/static/images/hotel/meeting.png',
    url: '/pages/index/loopdown',
    content: '测试内容6',
    id: 6,
    mine: false
}, {
    src: '/static/images/hotel/KPI.png',
    url: '/pages/index/loopdown',
    content: '测试内容7',
    id: 7,
    mine: true
}, {
    src: '/static/images/hotel/xuexi.png',
    url: '/pages/index/loopdown',
    content: '测试内容8',
    id: 8,
    mine: false
}, {
    src: '/static/images/hotel/exam.png',
    url: '/pages/index/loopdown',
    content: '测试内容9',
    id: 9,
    mine: true
}, {
    src: '/static/images/hotel/fuxi.png',
    url: '/pages/index/loopdown',
    content: '测试内容0',
    id: 10,
    mine: false
}])