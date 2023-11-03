<script lang="ts" setup></script>

<template>
  <view class="functioncard">
    <swiper class="advertiser">
      <swiper-item class="advertiserItem">
        <view class="advericon"> </view>
        <view class="adverImg"> </view>
        <image
          class="img"
          src="https://cloud.zhgn.cn:8092/phone/index/Waistline.jpg"
          mode="aspectFit"
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss" scoped>
.functioncard {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100vw;
  height: 12vh;
  border-bottom: 1.6vh solid white;
  border-top: 1.4vh solid white;
  position: relative;
  .advertiser {
    height: 12vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .advertiserItem {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 12vh;
      .img {
        width: 100vw;
      }

      // .advericon {
      //   // transform: scale(1.2);
      //   width: 95vw;
      //   height: 16vh;
      //   border-radius: 1vw;
      //   background: center url(https://cloud.zhgn.cn:8092/phone/index/Waistline.jpg)
      //     no-repeat;
      //   background-size: contain;
      // }

      // .adverImg {
      //   width: 16vh;
      //   height: 3vh;
      //   transform: scale(1.5);
      //   position: absolute;
      //   background: center
      //     url(https://cloud.zhgn.cn:8092/phone/indexImage/tetx.png) no-repeat;
      //   background-size: contain;
      //   bottom: 0;
      // }
    }
  }
}
</style>
