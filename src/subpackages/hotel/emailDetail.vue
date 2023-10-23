<script lang="ts" setup>
import { ref } from "vue";

const list = ref([
  {
    text:
      "内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1",
    id: 1,
  },
  {
    text: "内容2",
    id: 2,
  },
  {
    text: "内容3",
    id: 3,
  },
  {
    text: "内容4",
    id: 4,
  },
  {
    text: "内容5",
    id: 5,
  },
  {
    text: "内容6",
    id: 6,
  },
  {
    text: "内容6",
    id: 6,
  },
  {
    text: "内容6",
    id: 6,
  },
  {
    text: "内容6",
    id: 6,
  },
  {
    text: "内容6",
    id: 6,
  },
]);
</script>

<template>
  <view class="detailBox">
    <view class="top">
      <view class="tittle">
        <view class="left">标题 </view>
        <view class="right">标题内容 </view>
      </view>
      <view class="content">
        <view class="left"> 内容</view>
        <view class="right"> 内容盒子</view>
      </view>
    </view>
    <view class="bottom">
      <scroll-view scroll-y class="scrollY">
        <view
          class="messageItem"
          v-for="item in list"
          :key="item.id"
          :class="{ right: item.id === 1 }"
        >
          <view class="left" v-if="item.id !== 1">
            <image class="img" src="" mode="aspectFit"
          /></view>
          <view class="content">{{ item.text }}</view>
          <view class="right" v-if="item.id == 1">
            <image class="img" src="" mode="scaleToFill"
          /></view>
        </view>
      </scroll-view>
    </view>
    <view class="send">
      <view class="input">
        <textarea class="inClass"></textarea>
      </view>
      <view class="media"> ＋ </view>
      <view class="sendButton">发送</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.detailBox {
  width: 100vw;
  height: 100vh;
  background-color: #ededed;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top {
    margin-top: 5vw;
    width: 90vw;
    .tittle {
      height: 10vw;
      display: flex;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .right {
        margin-left: 5vw;
        flex: 1;
        border-bottom: 1px solid #cccccc;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
    .content {
      height: 10vw;
      display: flex;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .right {
        margin-left: 5vw;
        flex: 1;
        border-bottom: 1px solid #cccccc;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
  .bottom {
    .scrollY {
      overflow-y: auto;
      margin: 5vw 0;
      flex: 1;
      width: 90vw;
      height: 70vh;
      .messageItem {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        // background-color: #60df54;
        margin-bottom: 5vw;
        .img {
          border: 1px solid #ccc;
          width: 10vw;
          border-radius: 2vw;
          height: 10vw;
        }
        .content {
          margin: 0 5vw;
        }
      }
      .right {
        justify-content: flex-end;
      }
      .img {
        border: 1px solid #ccc;
        width: 10vw;
        border-radius: 2vw;
        height: 10vw;
      }
    }
  }
  .send {
    display: flex;
    background-color: #f7f7f7;
    height: 20vw;
    width: 100vw;
    border: 1px solid #e7e7e7;
    justify-content: space-around;
    align-items: center;
    .input {
      width: 80vw;
      height: 9vw;
      border-radius: 2vw;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .inClass {
        width: 75vw;
        height: 9vw;
      }
    }
  }
}
</style>
