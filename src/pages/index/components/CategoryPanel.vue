<script setup lang="ts">
//category数据
</script>

<template>
  <view class="category">
    <navigator class="category-item" url="/pages/index/loopdown" v-for="item in 5" :key="item">
      <image class="icon" src="@\static\images\unionpicture\campusview.jpg"></image>
      <text class="text">{{ item }}</text>
    </navigator>
  </view>
</template>

<style lang="scss">
/* 前台类目 */
.category {
  margin: 20rpx 0 0;
  padding: 10rpx 0;
  display: flex;
  justify-content: space-around;
  background-color: white;

  .category-item {
    margin: 20rpx 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .icon {
      width: 70rpx;
      height: 70rpx;
      border-radius: 20%;
      margin-bottom: 10rpx;
    }

    .text {
      font-size: 26rpx;
      color: #666;
    }
  }
}
</style>