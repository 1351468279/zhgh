<script setup lang="ts">
import { ref } from "vue";
import { swiperData } from "@/utils/index";
import { onLoad } from "@dcloudio/uni-app";
import { getSwiperImage, type swiperImageList } from "@/services/indexNews";
import { baseURL } from "@/utils/http";
// 轮播图数据

const activeIndex = ref(0);

// 滑动自动改变指示点
const changeIndicatorDots = (a: any) => {
  // console.log(a)
  activeIndex.value = a.detail.current;
};
const onClick = (id: string) => {
  uni.navigateTo({
    url: "/subpackages/index/newsDetail?id=" + id,
  });
};
// 接收轮播图列表
const swiperList = ref<swiperImageList>();
onLoad(async () => {
  swiperList.value = (await getSwiperImage()).body;
});
</script>

<template>
  <view class="carousel">
    <swiper
      class="swiper"
      indicator-color="white"
      indicator-active-color="rgba(46, 46, 46)"
      :circular="true"
      indicator-dots
      :autoplay="true"
      :interval="3000"
      @change="changeIndicatorDots"
    >
      <swiper-item
        class="swiperItem"
        v-for="item in swiperList"
        :key="item.id"
        @click="onClick(item.id)"
      >
        <navigator url="" hover-class="none" class="navigator">
          <image
            mode="aspectFill"
            class="image"
            :src="baseURL + '/dbylAndKnbf/sltPath.interface?url=' + item.slt"
          ></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
/* 轮播图 */
.carousel {
  margin: auto;
  width: 90vw;
  height: 30vh;
  background-color: white;
  border-radius: 4vw;
  overflow: hidden;

  .swiper {
    width: 90vw;
    height: 30vh;
    background-color: white;

    .swiperItem {
      width: 90%;
      height: 90%;

      .navigator {
        width: 90vw;
        height: 30vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .image {
          width: 90vw;
          height: 30vh;
          // border-radius: 4vw;
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
