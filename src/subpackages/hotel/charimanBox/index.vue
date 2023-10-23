<script lang="ts" setup>
const sendMessage = () => {
  uni.navigateTo({
    url: "/subpackages/hotel/sendMessage",
  });
};

const viewDetail = () => {
  uni.navigateTo({
    url: "/subpackages/hotel/emailDetail",
  });
};
</script>

<template>
  <view class="charimanBox">
    <scroll-view scroll-y class="scrollY">
      <view class="messageBox" v-for="item in 10" :key="item" @click="viewDetail">
        <view class="left">
          <image class="img" src="" mode="scaleToFill" />
        </view>
        <view class="right">
          <view class="top">用户名</view>
          <view class="middle">标题</view>
          <view class="bottom"> 内容</view>
        </view>
        <view class="tag"> 时间 </view>
      </view>
    </scroll-view>
    <view class="sendMessage" @click="sendMessage"> 写信</view>
  </view>
</template>

<style lang="scss" scoped>
.charimanBox {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .scrollY {
    overflow-y: auto;
    height: 98vh;
  }
  .messageBox {
    width: 90vw;
    height: 20vw;
    margin: 2vw 0;
    border-radius: 2vw;
    display: flex;
    position: relative;
    .left {
      width: 20vw;
      height: 20vw;
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        width: 15vw;
        height: 15vw;
        border-radius: 2vw;
        background-color: #d81e06;
      }
    }
    .right {
      flex: 1;
      margin-left: 5vw;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      border-bottom: 1px solid #ccc;
      .top {
        font-size: 4vw;
        font-weight: 500;
      }
      .middle {
        font-size: 4vw;
      }
      .bottom {
        font-size: 3vw;
      }
    }
    .tag {
      position: absolute;
      right: 0;
    }
  }
  .sendMessage {
    color: white;
    position: absolute;
    width: 17vw;
    height: 17vw;
    background-color: #d81e06;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 5vw;
    bottom: 5vw;
  }
}
</style>
