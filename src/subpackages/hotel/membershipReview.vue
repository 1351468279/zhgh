<script lang="ts" setup>
import { useApplyUnionStore } from "@/store/index";
const systemInfo = uni.getSystemInfoSync()
console.log(systemInfo)
const store = useApplyUnionStore()
const onClick = (val: Number) => {
  uni.navigateTo({
    url: '/subpackages/hotel/applyUnion' + '?index=' + val
  })
}
const reviewAll = () => {
  for (let index = 0; index < store.applier.length; index++) {
    store.applier[index].status = true
  }
  uni.showToast({
    title: '审核完毕'
  })
}
const scroll = () => {
  console.log(1212)
}
</script>

<template>
  <view class="box">
    <view class="shenhe">
      <view class="card" v-for="(item, index) in store.applier" @click="onClick(index)">
        <view class="tittle">
          <view class="main" :class="{ await: item.status == false }">{{ item.status ? '已审核' : '待审核' }}</view>
          <view class="vice">工号：{{ item.jobId }}</view>
          <view class="vice">组织：{{ item.unionName }}</view>
        </view>
        <view class="extra">申请人：{{ item.name }}</view>
      </view>
    </view>
    <view class="reviewAll">
      <button type="primary" @click="reviewAll">一键审核</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-around;

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

      .tittle {
        height: 80%;
        width: 55%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 50rpx;

        .main {
          font-size: larger;
          color: #3a3a3a;

        }

        .await {
          color: red;
        }

        .vice {
          color: #909399;
          font-size: small;
        }
      }

      .extra {
        margin-right: 50rpx;
        white-space: nowrap;
      }
    }

  }

  .reviewAll {
    margin-bottom: 20rpx;
    width: 90%;
  }
}
</style>