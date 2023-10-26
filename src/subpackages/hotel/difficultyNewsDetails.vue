<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getNewsDetail } from "@/services/applyHelper";
import type { listData, newsItem } from "@/types/difficultyHelper";
import { baseURL } from "@/utils/http";

const props = defineProps(["id"]);
const newsDetail = ref<newsItem>();
onShow(async () => {
  const res = await getNewsDetail(props.id);
  newsDetail.value = res.body;
});
</script>

<template>
  <view class="newsDetail">
    <view class="tittle">{{ newsDetail?.title }}</view>
    <image
      :src="
        baseURL +
        '/dbylAndKnbf/sltPath.interface?url=' +
        newsDetail?.knbfNewsImgList[0].path
      "
      mode="scaleToFill"
      v-if="newsDetail?.knbfNewsImgList[0].path"
    />
    <view class="tags">
      <view class="release_time"> 2023-10-08</view>
      <!-- <view class="number"> {{newsDetail.}}人浏览</view> -->
    </view>
    <view class="details" v-html="newsDetail?.details"> </view>
  </view>
</template>

<style lang="scss" scoped>
.newsDetail {
  height: calc(100vh);
  width: calc(95vw);
  left: 0;
  right: 0;
  margin: 0 auto;
  .details {
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 90vw;
  }
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
