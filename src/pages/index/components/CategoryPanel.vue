<script setup lang="ts">
//category数据
import { hotelData } from "@/composible/hotel";
import { computed } from "vue";
const category = computed(() => {
  return hotelData.value.filter((i) => i.mine === true);
});
</script>

<template>
  <view class="category">
    <navigator
      class="category-item"
      :url="item.url"
      v-for="item in category"
      :key="item.id"
    >
      <image class="icon" :src="item.src"></image>
      <text class="text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<style lang="scss" scoped>
/* 前台类目 */
.category {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20rpx;

  .category-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 150rpx;
    height: 150rpx;
    margin: 15rpx 0;

    .icon {
      width: 40%;
      height: 40%;
      background-color: #ffffff;
      border-radius: 10rpx;
    }

    .text {
      width: 100%;
      text-align: center;
      font-size: 23rpx;
      color: #666666;
    }
  }
}
</style>
