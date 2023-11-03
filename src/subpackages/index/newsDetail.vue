<script lang="ts" setup>
import { getNewsDetailById, type newsInfo } from "@/services/indexNews";
import type { listData } from "@/types/news";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const props = defineProps(["id"]);
console.log(props.id);
const newsData = ref<newsInfo>();
// 获取设备屏幕宽度
 onShow(() => {
  const screenWidth = uni.getSystemInfoSync().windowWidth;

  getNewsDetailById(props.id).then((res) => {
    newsData.value = res.body
    if (!newsData.value) return
    newsData.value.context = newsData.value.context.replace(/\<img/gi,
    '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"'
  );
  })
});
</script>

<template>
  <view class="info">
    <view class="infoTittle">{{ newsData?.bt }}</view>
    <view class="infoTag">
      <text class="timeTag">{{ newsData?.fbsj }}</text>
      <text class="viewTag">{{ newsData?.fwl }} 人浏览</text>
    </view>
    <view class="infoContent">
      <view class="infoContentText" v-html="newsData?.context"></view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;

  .infoTittle {
    width: 90vw;
    font-size: 40rpx;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .infoTag {
    width: 90vw;
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
    width: 90vw;
    height: 90vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .infoContentText {
      width: 90vw;
      height: 90vw;
      left: 0;
      right: 0;
      margin: 0 auto;
      font-size: 30rpx;
      line-height: 50rpx;
      text-align: justify;
      text-indent: 2em;
    }
  }
}
</style>
