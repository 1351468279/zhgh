<script lang="ts" setup>
import { ref } from 'vue'
import type { applyUnionType } from '@/types/hotel';
import { translateTime } from '@/utils/tool'
import { useApplyUnionStore } from "@/store/index";
const store =useApplyUnionStore()
const baseFormData = ref({
  unionName: '',
  jobId: 19160102039,
  name: '李星宇',
  idCard: '412702199601520145',
  sex: '男',
  nationality: '汉',
  educational: '本科',
  birthday: '1999-03-12',
  phone: 17700546369,
  email: '1457453698@qq.com',
  enterTime: '2023-09-05'
})
const baseFormDataTwo = ref({
  unionName: '工会',
  jobId: 19160102056,
  name: '王玉鹏',
  idCard: '412702199905240145',
  sex: '女',
  nationality: '汉',
  educational: '本科',
  birthday: '1999-08-16',
  phone: 177632587369,
  email: '1397756698@qq.com',
  enterTime: '2023-09-05'
})
const data = ref({})

// const onClick = (id: number) => {
//   if (id) {
//     uni.navigateTo({
//       url: '/subpackages/hotel/infomation' + '?id=' + id
//     })
//   }
//   else {
//     uni.navigateTo({
//       url: '/subpackages/hotel/infomation'
//     })
//   }
// }
const onClick = (val:applyUnionType) => {
  uni.navigateTo({
    url: '/subpackages/hotel/applyUnion'+'?val='+val
    })
}
</script>

<template>
  <view class="shenhe">
    <view class="card" v-for="item in store.applier" @click="onClick(item)">
      <view class="tittle" >
        <view class="main" :class="{await:item.status==false}">{{item.status?'已审核':'待审核'}}</view>
        <view class="vice">工号：{{item.jobId}}</view>
      </view>
      <view class="extra">姓名：{{ item.name }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.shenhe {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .card {
    width: 90%;
    height: 200rpx;
    box-shadow: 0rpx 0rpx 5rpx 2rpx darkgrey;
    margin: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20rpx;
    .tittle{
      height: 80%;
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      margin-left: 50rpx;
      .main{
        font-size: larger;
        color: #3a3a3a;
        
      }
      .await{
        color: red;
      }
      .vice{
        color: #909399;
      }
     }
     .extra{
      margin-right: 50rpx;
     }
  }
 
}
</style>