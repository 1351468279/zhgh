<script setup lang="ts">
import { ref } from 'vue'

// 轮播图数据


const activeIndex = ref(0)

// 滑动自动改变指示点
const changeIndicatorDots = (a: any) => {
  // console.log(a)
  activeIndex.value = a.detail.current
}
</script>

<template>
  <view class="carousel">
    <swiper class="swiper" indicator-color="white" indicator-active-color="rgba(46, 46, 46)" :circular="true"
      indicator-dots :autoplay="true" :interval="3000" @change="changeIndicatorDots">
      <swiper-item class="swiperItem">
        <navigator url="" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" src="http://cloud.zhgn.cn:808/phone/unionpicture/meeting.jpg"></image>
        </navigator>
      </swiper-item>
      <swiper-item class="swiperItem">
        <navigator url="" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" src="http://cloud.zhgn.cn:808/phone/unionpicture/campusview.jpg"></image>
        </navigator>
      </swiper-item>
      <swiper-item class="swiperItem">
        <navigator url="" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" src="http://cloud.zhgn.cn:808/phone/unionpicture/synodmeetings.png">
          </image>
        </navigator>
      </swiper-item>
      <swiper-item class="swiperItem">
        <navigator url="" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" src="http://cloud.zhgn.cn:808/phone/unionpicture/teachermetting.png">
          </image>
        </navigator>
      </swiper-item>
      <swiper-item class="swiperItem">
        <navigator url="" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" src="http://cloud.zhgn.cn:808/phone/unionpicture/valleyball.jpeg">
          </image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
/* 轮播图 */
.carousel {
  margin: auto;
  width: 100%;
  overflow: hidden;
  background-color: white;

  .swiper {
    width: 100%;
    background-color: white;

    .swiperItem {
      width: 100%;
      height: 100%;

      .navigator {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .image {
          width: 90%;
          height: 90%;
          border-radius: 10rpx;
        }
      }
    }
  }


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
    width: 90%;
    height: 90%;
  }
}
</style>