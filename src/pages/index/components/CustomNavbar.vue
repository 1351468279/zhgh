<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import PopupDialog from './PopupDialog.vue'
import type { unionType } from '@/types/index'
const { safeAreaInsets } = uni.getSystemInfoSync()
const popup = ref()
const unionname = ref('郑州市总工会')
const onClick = () => {
  console.log('点击了')
  popup.value.open('center')
}
const closeDialog = (item: unionType) => {
  unionname.value = item.name
  console.log(item)
  popup.value.close()
}
</script>

<template>
  <!-- 顶部占位 -->
  <view class="navbar">
    <view class="tittle" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">首页</view>
    <view class="search">
      <view class="areainfo" @click="onClick">{{ unionname }}
      </view>
      <uni-popup ref="popup" type="bottom">
        <PopupDialog @on-close="closeDialog"></PopupDialog>
      </uni-popup>
      <!-- 搜索条 -->
      <view class="searchbar">
        <navigator class="navga" url="/pages/index/loopdown" open-type="navigate" hover-class="navigator-hover">
          <text class="iconfont">&#xe6ac;搜索</text>
        </navigator>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: #d81e06;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 20rpx;

  .tittle {
    color: white;
  }

  .search {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .areainfo {
      color: #fff;
      font-size: 32rpx;
      width: 200rpx;
    }

    .searchbar {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10rpx 0 26rpx;
      height: 64rpx;
      margin: 16rpx 20rpx;
      color: #fff;
      font-size: 28rpx;
      border-radius: 32rpx;
      background-color: rgba(255, 255, 255, 0.5);

      .navga {
        display: inline-block;
        width: 400rpx;
        text-align: center;


      }

      .icon-search {
        &::before {
          margin-right: 10rpx;
        }
      }
    }
  }

}
</style>