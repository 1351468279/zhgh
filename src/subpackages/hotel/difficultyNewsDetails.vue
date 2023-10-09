<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import { getNewsDetail } from "@/services/applyHelper";
import type { listData } from "@/types/difficultyHelper";

const props = defineProps(["id"]);
const newsDetail = ref<listData>();
onShow(async () => {
  const res = await getNewsDetail(props.id);
  console.log(res);
});
</script>

<template>
  <view class="newsDetail">
    <view class="tittle">新闻标题</view>
    <view class="tags">
      <view class="release_time"> 2023-10-08</view>
      <view class="number"> 35人浏览</view>
    </view>
    <view class="details">新闻内容 </view>
  </view>
</template>

<style lang="scss" scoped>
.newsDetail {
  height: calc(100vh);
  width: calc(100vw);
  margin: 10rpx 20rpx;
  .tittle {
    font-size: 20px;
    font-weight: bold;
  }
  .tags {
    display: flex;
    color: #ccc;
    .release_time {
      font-size: 14px;
      margin-right: 20rpx;
    }
    .number {
      font-size: 14px;
    }
  }
}
</style>
