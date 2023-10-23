<script lang="ts" setup>
import { getNewsDetailById, type newsInfo } from "@/services/indexNews";
import type { listData } from "@/types/news";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const props = defineProps(["id"]);
console.log(props.id);
const newsData = ref<newsInfo>();
onShow(() => {
  getNewsDetailById(props.id).then((res)=>{
    newsData.value=res.body
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
