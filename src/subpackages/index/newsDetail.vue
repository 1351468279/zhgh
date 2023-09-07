<script lang="ts" setup>
import type { listData } from '@/types/news';
import { ref } from 'vue';
const props = defineProps(['item'])
console.log(props.item)
const info = ref<listData>(JSON.parse(props.item))
console.log(info.value)
</script>

<template>
  <view class="info">
    <view class="infoTittle">{{ info.tittle }}</view>
    <view class="infoTag">
      <text class="timeTag">{{ info.time }}</text>
      <text class="viewTag">{{ info.viewNum }} 人浏览</text>
    </view>
    <view class="infoContent">
      <view class="infoContentImg"><img class="image" :src="info.image"></view>
      <view class="infoContentText" v-html="info.content"></view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20rpx;

  .infoTittle {
    width: 100%;
    font-size: 40rpx;
    font-weight: bold;
  }

  .infoTag {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20rpx 0 0 0;

    .timeTag {
      font-size: 26rpx;
      color: gray;

    }

    .viewTag {
      font-size: 26rpx;
      color: gray;
      margin-left: 20rpx;

    }
  }

  .infoContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .infoContentText {
      width: 95%;
      height: 100%;
      font-size: 30rpx;
      line-height: 50rpx;
      text-align: justify;
      text-indent: 2em;

    }

    .infoContentImg {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .image {
        width: 100%;
      }
    }
  }
}
</style>