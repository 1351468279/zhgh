<script setup lang="ts">
import CustomNavBar from "@/components/CustomNavBar.vue";
import ClassSwiper from "./components/ClassSwiper.vue";
import CategoryPanel from "./components/CategoryPanel.vue";
import FunctionCard from "./components/FunctionCard.vue";
import TabBar from "@/components/TabBar.vue";
// import ArticleRead from './components/ArticleRead.vue'
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import { listTotalData } from "@/utils/index";

import NewsList from "@/components/NewsList.vue";
const systemInfo = uni.getSystemInfoSync();
// 下拉刷新
onPullDownRefresh(() => {
  console.log("下拉刷新");
  setTimeout(() => {
    uni.stopPullDownRefresh();
  }, 1000);
});
// 被激活文章类型
const activeValue = ref(1);
// 进度条位置
const scrollLeft = ref(0);
const scrollTop = ref(0);
// 滚动事件
const onScrollLeft = (e: any) => {
  console.log(e);
};
const onScrollTop = (e: any) => {
  console.log(e);
};

// 点击文章类型
const onClick = (id: number, index: number) => {
  activeValue.value = id;
  // 计算需要滚动的距离
  const itemWidth = systemInfo.windowWidth * 0.2; // 假设每个元素宽度为屏幕宽度的 20%
  const scrollDistance = index * itemWidth - systemInfo.windowWidth * 0.4; // 滚动到元素中间位置
  scrollLeft.value = scrollDistance < 0 ? 0 : scrollDistance;
};
// 左右图标及数据
const lefticon = ref(null);
const righticon = ref("\uE60F");
const newsList = computed(() => {
  return listTotalData.value.filter((item) => item.articleId === activeValue.value)[0]
    .data;
});
let timer: any = null;

const loadingStatus = ref(false);
const onScrollTopLower = () => {
  if (loadingStatus.value) return;
  loadingStatus.value = true;
  console.log("到底了");
  timer = setTimeout(() => {
    // listTotalData.value[activeValue.value - 1].data.push({ id: 6, image: 'http://cloud.zhgn.cn:808/phone/unionpicture/synodmeetings.png', area: '新郑市总工会', viewNum: 1212, content: '文章内容', tittle: '文章标题', time: '2023-01-02' })
    loadingStatus.value = false;
    clearTimeout(timer);
  }, 2000);
};
import { useMemberStore } from "@/store";
const memberStore = useMemberStore();
onLoad(() => {
  if (memberStore.profile?.token) {
    console.log("已登录");
  } else {
    uni.navigateTo({
      url: "/pages/login/index",
    });
  }
});
</script>

<template>
  <view class="home" :style="{ height: systemInfo.windowHeight - 50 + 'px' }">
    <!-- <CustomNavBar class="navbar" :tittle="'首页'"></CustomNavBar> -->

    <scroll-view
      class="indexScrollTop"
      refresher-enabled
      scroll-y
      :scroll-top="scrollTop"
      @scroll="onScrollTop"
      lower-threshold="100"
      @scrolltolower="onScrollTopLower"
    >
      <ClassSwiper></ClassSwiper>
      <CategoryPanel></CategoryPanel>
      <FunctionCard></FunctionCard>
      <scroll-view
        class="newsScrollLeft"
        scroll-x
        :scroll-left="scrollLeft"
        scroll-with-animation
        @scroll="onScrollLeft"
      >
        <view
          class="newsItem"
          :class="{ active: item.articleId === activeValue }"
          v-for="(item, index) in listTotalData"
          @click="onClick(item.articleId, index)"
        >
          {{ item.name }}
        </view>
      </scroll-view>
      <NewsList
        class="indexList"
        :newsList="newsList"
        :righticon="righticon"
        :loadingStatus="loadingStatus"
      ></NewsList>
    </scroll-view>
  </view>
  <TabBar :current-page="0" />

  <!-- <ArticleRead></ArticleRead> -->
</template>

<style lang="scss">
.home {
  background-color: white;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .navbar {
    width: 100%;
    background-color: red;
  }

  .indexScrollTop {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;

    .newsScrollLeft {
      width: 100%;
      // background-color: skyblue;
      white-space: nowrap;
      transition: all 1s;

      .newsItem {
        display: inline-block;
        width: 20%;
        height: 70rpx;
        line-height: 70rpx;
        text-align: center;
        font-size: 28rpx;
        color: darkgrey;
      }

      .active {
        border-bottom: 3px solid #ff0000;
        font-weight: bold;
        font-size: 35rpx;
        color: black;
      }
    }

    .indexList {
      flex: 1;
    }
  }
}
</style>
