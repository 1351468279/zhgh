<script lang="ts" setup>
const props = defineProps(["leftText", "src", "rightText", "rightRow"]);
</script>

<template>
  <button class="avatarBox">
    <view class="left"> {{ props.leftText }}</view>
    <view class="right">
      <image v-if="props.src" class="img" :src="props.src" mode="aspectFit" />
      <view class="rightText">{{ props.rightText }} </view>
      <text v-if="props.rightRow" class="icon iconfont">&#xe637;</text>
    </view>
  </button>
</template>

<style lang="scss" scoped>
.avatarBox {
  max-width: 100vw;
  min-height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: #fff;
  padding: 0 5vw;

  &::after {
    border: none;
  }
  .left {
    font-size: 4vw;
    color: #2a2a2a;
  }
  .right {
    display: flex;
    align-items: center;
    .img {
      height: 10vh;
      width: 10vh;
      margin: 2vw 0;
      border-radius: 2vw;
      background-color: skyblue;
    }
    .rightText {
      font-size: 4vw;

      color: #757575;
    }
    &::after {
      display: block;
      content: "";
      position: absolute;
      bottom: 0;
      width: 90vw;
      height: 1px;
      background-color: #ededed;
      right: 0;
      left: 0;
      margin: 0 auto;
    }
  }
}
</style>
