<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import ClassSwiper from './components/ClassSwiper.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import FunctionCard from './components/FunctionCard.vue'
// import ArticleRead from './components/ArticleRead.vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { listTotalData } from '@/utils/index'

import NewsList from '@/components/NewsList.vue';
const systemInfo = uni.getSystemInfoSync()
// 下拉刷新
onPullDownRefresh(() => {
  console.log('下拉刷新')
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})
// 被激活文章类型
const activeValue = ref(1)
// 进度条位置
const scrollLeft = ref(0)
const scrollTop = ref(0)
// 滚动事件
const onScrollLeft = (e: any) => {
  console.log(e)
}
const onScrollTop = (e: any) => {
  console.log(e)
}

// 点击文章类型
const onClick = (id: number, index: number) => {
  activeValue.value = id;
  // 计算需要滚动的距离
  const itemWidth = systemInfo.windowWidth * 0.15; // 假设每个元素宽度为屏幕宽度的 20%
  const scrollDistance = index * itemWidth - systemInfo.windowWidth * 0.4; // 滚动到元素中间位置
  scrollLeft.value = scrollDistance < 0 ? 0 : scrollDistance;
};
const newsList = computed(() => {
  return listTotalData.value.filter(item => item.id === activeValue.value)[0].data
})
let timer: any = null

const loadingStatus = ref(false)
const onScrollTopLower = () => {
  if (loadingStatus.value) return
  loadingStatus.value = true
  console.log('到底了')
  timer = setTimeout(() => {
    listTotalData.value[activeValue.value - 1].data.push({ id: 6, image: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_1.jpg', area: '新郑市总工会', viewNum: 1212, content: '文章标题阿，萨大sasadad松大打赏撒大' })
    loadingStatus.value = false
    clearTimeout(timer)
  }, 2000)
}
</script>

<template>
  <view class="home" :style="{ height: (systemInfo.windowHeight) + 'px' }">
    <CustomNavbar class="navbar"></CustomNavbar>

    <scroll-view class="indexScrollTop" scroll-y :scroll-top="scrollTop" @scroll="onScrollTop"
      @scrolltolower="onScrollTopLower">
      <ClassSwiper></ClassSwiper>
      <CategoryPanel></CategoryPanel>
      <FunctionCard></FunctionCard>
      <scroll-view class="newsScrollLeft" scroll-x :scroll-left="scrollLeft" scroll-with-animation @scroll="onScrollLeft">
        <view class="newsItem" :class="{ active: activeValue === item.id }" v-for="(item, index ) in listTotalData"
          @click="onClick(item.id, index)">
          {{ item.name }}
        </view>
      </scroll-view>
      <NewsList class="indexList" :newsList="newsList" :loadingStatus="loadingStatus"></NewsList>
    </scroll-view>
  </view>
  <!-- <ArticleRead></ArticleRead> -->
</template>



<style lang="scss">
.home {
  background-color: white;
  display: flex;
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
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;

    .newsScrollLeft {
      white-space: nowrap;
      width: 100%;
      position: sticky;
      top: 0;
      background-color: white;

      .newsItem {
        display: inline-block;
        width: 15%;
        height: 70rpx;
        line-height: 70rpx;
        text-align: center;
        font-size: 28rpx;
      }

      .active {
        border-bottom: 3px solid #ff0000;
      }
    }

    .indexList {
      flex: 1;
    }
  }
}
</style>
