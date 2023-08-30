<template>
  <view class="home">
    <CustomNavbar></CustomNavbar>
    <ClassSwiper></ClassSwiper>
    <CategoryPanel></CategoryPanel>
    <FunctionCard></FunctionCard>
    <ArticleRead></ArticleRead>
  </view>
</template>

<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import ClassSwiper from './components/ClassSwiper.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import FunctionCard from './components/FunctionCard.vue'
import ArticleRead from './components/ArticleRead.vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
// 下拉刷新
onPullDownRefresh(() => {
  console.log('下拉刷新')
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})
</script>

<style lang="scss">
.home {
  background-color: rgb(245, 241, 241);
}
</style>
