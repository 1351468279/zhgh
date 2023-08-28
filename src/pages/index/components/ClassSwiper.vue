<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref(0)

// 滑动自动改变指示点
const changeIndicatorDots = (a: any) => {
  // console.log(a)
  activeIndex.value = a.detail.current
}
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="true" :interval="3000" @change="changeIndicatorDots">
      <swiper-item>
        <navigator url="/pages/index/loopdown" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/slider_1.jpg"></image>
        </navigator>
      </swiper-item>
      <swiper-item>
        <navigator url="/pages/index/loopdown" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/slider_1.jpg"></image>
        </navigator>
      </swiper-item>
      <swiper-item>
        <navigator url="/pages/index/loopdown" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/slider_1.jpg"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text v-for="(item, index) in 3" :key="item" class="dot" :class="{ active: index === activeIndex }"></text>
    </view>
  </view>
</template>

<style lang="scss">
:host {
  display: block;
  height: 280rpx;
}

/* 轮播图 */
.carousel {
  border-radius: 3%;
  margin: auto;
  height: 100%;
  width: 93%;
  position: relative;
  overflow: hidden;
  background-color: white;

  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;

    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }

    .active {
      background-color: #fff;
    }
  }

  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>