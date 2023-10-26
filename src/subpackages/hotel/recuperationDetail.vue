<script lang="ts" setup>
import {
  attendApi,
  handleActivity,
  registerApi,
  unRegisterApi,
} from "@/services/applyRecuperation";
import type { applyRecuperationResDataType } from "@/types/recuperation";
import { baseURL } from "@/utils/http";
import { onShow } from "@dcloudio/uni-app";
import { ref, computed } from "vue";
const props = defineProps(["id"]);
// 报名状态
const reportStatus = ref();
// 活动状态
const activityStatus = ref();
// 接收活动信息
const activityDetail = ref<applyRecuperationResDataType>();

// 点击报名
const report = async () => {
  if (activityDetail.value?.isJoin == 0 && activityDetail.value.body.state == 0) {
    console.log("false");
    registerApi(props.id)
      .then(async () => {
        uni.showLoading({
          title: "加载中",
          mask: true,
        });
        const res = await handleActivity(type, props.id);
        activityDetail.value = res.body;
      })
      .then(() => {
        uni.hideLoading();
        uni.showToast({
          title: "报名成功",
        });
      });
  } else if (activityDetail.value?.isJoin == 1 && activityDetail.value.body.state == 0) {
    console.log("true");
    unRegisterApi(props.id)
      .then(async () => {
        uni.showLoading({
          title: "加载中",
          mask: true,
        });
        const res = await handleActivity(type, props.id);
        activityDetail.value = res.body;
      })
      .then(() => {
        uni.hideLoading();
        uni.showToast({
          title: "取消成功",
        });
      });
  } else {
    uni.showToast({
      title: "活动已开始,不能再执行报名相关操作",
    });
  }
};
// 点击打卡
const attend = async () => {
  const res = await attendApi(props.id);
  if (res.flag == "success") {
    console.log("success");
    uni.showToast({
      title: "打卡成功",
    });
  } else {
    console.log("false");
    uni.showToast({
      title: "不可以二次打卡",
    });
  }
};
// 定义操作列表项方式
let type = NaN;
onShow(async () => {
  console.log(props.id);
  type = 2;
  const res = await handleActivity(type, props.id);
  activityDetail.value = res.body;
});
</script>

<template>
  <view class="detail">
    <view class="imgBox">
      <image
        v-if="activityDetail?.body.imgList[activityDetail?.body.imgList.length - 1]"
        class="img"
        :src="
          baseURL +
          '/dbylAndKnbf/sltPath.interface?url=' +
          activityDetail?.body.imgList[activityDetail?.body.imgList.length - 1].path
        "
        mode="aspectFit"
      />
    </view>
    <view class="tags">
      <view class="area">活动地址： {{ activityDetail?.body.organization }} </view>
      <view class="time"> 开始时间：{{ activityDetail?.body.startTime }} </view>
    </view>
    <view class="content" v-html="activityDetail?.body.content"> </view>
    <view class="report" @click="report" v-if="activityDetail?.body.state == 0">
      {{
        activityDetail.isJoin == 0 && activityDetail.body.state == 0 ? "报名" : "取消报名"
      }}
    </view>
    <view
      class="attend"
      @click="attend"
      v-if="activityDetail?.isJoin == 1 && activityDetail?.body.state == 1"
      >打卡
    </view>
  </view>
</template>

<style lang="scss" scoped>
.detail {
  position: relative;
  width: calc(100vw);
  height: calc(100vh);
  // background-color: skyblue;
  .imgBox {
    width: 100vw;
    .img {
      width: 100vw;
    }
  }
  .tags {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font: 14px Arial;
  }
  .content {
    padding: 40rpx;
  }
  .report {
    width: calc(90vw);
    height: calc(10vw);
    background-color: #ed4034;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    bottom: 2vw;
    left: 0;
    right: 0;
    margin: auto;
  }
  .attend {
    width: calc(90vw);
    height: calc(10vw);
    background-color: #ed4034;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    bottom: 2vw;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
