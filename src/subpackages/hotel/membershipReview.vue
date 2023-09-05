<script lang="ts" setup>
import { ref } from 'vue'
import { translateTime } from '@/utils/tool'
const baseFormData = ref({
  unionName: '工会',
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

const onClick = (id: number) => {
  if (id) {
    uni.navigateTo({
      url: '/subpackages/hotel/infomation' + '?id=' + id
    })
  }
  else {
    uni.navigateTo({
      url: '/subpackages/hotel/infomation'
    })
  }

}
</script>

<template>
  <view class="shenhe">
    <view class="alredy" @click="onClick(1)">
      <view class="alredyTittle">
        <view class="tittle">已审核</view>
      </view>
      <view class="info">
        <view class="name">{{ baseFormData.name }}</view>
        <view class="time">入会时间：{{ baseFormData.enterTime }}</view>
      </view>
    </view>
    <view class="wait" @click="onClick(0)">
      <view class="waitTittle">
        <view class="tittle">待审核</view>
      </view>
      <view class="info">
        <view class="name">{{ baseFormDataTwo.name }}</view>
        <view class="time">入会时间：{{ baseFormDataTwo.enterTime }}</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.shenhe {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .alredy {
    width: 90%;
    height: 200rpx;
    background-color: #ccc;
    border-radius: 10rpx;
    margin-top: 20rpx;

    .alredyTittle {
      width: 100%;
      height: 50rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .tittle {
        font-size: 30rpx;
        font-weight: bold;
      }
    }

    .info {
      width: 100%;
      height: 150rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .name {
        font-size: 30rpx;
        font-weight: bold;
      }

      .time {
        font-size: 25rpx;
        color: #999;
      }
    }
  }

  .wait {
    width: 90%;
    height: 200rpx;
    background-color: #ccc;
    border-radius: 10rpx;
    margin-top: 20rpx;

    .waitTittle {
      width: 100%;
      height: 50rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .tittle {
        font-size: 30rpx;
        font-weight: bold;
      }
    }

    .info {
      width: 100%;
      height: 150rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .name {
        font-size: 30rpx;
        font-weight: bold;
      }

      .time {
        font-size: 25rpx;
        color: #999;
      }
    }
  }
}
</style>