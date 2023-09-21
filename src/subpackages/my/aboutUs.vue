<script lang="ts" setup>

</script>

<template>
  <view class="aboutUs">
    <view class="aboutUsItem">
      <view class="tittle">当前版本</view>
      <view class="content">v1.0.0</view>
    </view>
    <view class="aboutUsItem">
      <view class="tittle">关于我们</view>
      <view class="content">这是一个关于我们</view>
    </view>
    <view class="aboutUsItem">
      <view class="tittle">服务协议</view>
      <view class="content">这是一个服务协议</view>
    </view>
    <view class="aboutUsItem">
      <view class="tittle">隐私政策</view>
      <view class="content">这是一个隐私政策</view>
    </view>

  </view>
</template>

<style lang="scss" scoped>
.aboutUs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;

  .aboutUsItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    border-bottom: 1px solid #f5f5f5;

    .tittle {
      font-size: 30rpx;
      color: #333333;
    }

    .content {
      font-size: 28rpx;
      color: #999999;
    }
  }
}
</style>