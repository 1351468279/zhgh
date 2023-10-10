<script lang="ts" setup>
import { ref, computed } from "vue";
// 报名状态
const reportStatus = ref(false);
const reportText = computed(() => {
  if (reportStatus.value) {
    return "取消报名";
  }
  return "报名";
});
// 点击报名
const report = () => {
  console.log(2121);
  reportStatus.value = !reportStatus.value;
};
</script>

<template>
  <view class="detail">
    <view class="imgBox">
      <image
        class="img"
        src="http://cloud.zhgn.cn:808/phone/icon/lawyer.png"
        mode="aspectFit"
      />
    </view>
    <view class="tags">
      <view class="area"> 单位 </view>
      <view class="time"> 时间 </view>
    </view>
    <view class="content"> 内容 </view>
    <view class="report" @click="report"> {{ reportText }} </view>
  </view>
</template>

<style lang="scss" scoped>
.detail {
  position: relative;
  width: calc(100vw);
  height: calc(100vh);
  // background-color: skyblue;
  .imgBox {
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      left: 0;
      right: 0;
      margin: 0 auto;
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
    bottom: 2px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
