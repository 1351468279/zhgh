<script lang="ts" setup>
// 接收搜索框字符
import { ref } from "vue";
const searchValue = ref("");
// 输入框防抖
let timer: any = null;
// 搜索框输入事件
const onInput = (e: any) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    console.log(e);
    // getSanYuList(getSanYuListParams.value).then((res) => {
    //   cardList.value = cardList.value.filter((item: any) =>
    //     item.name.includes(searchValue.value)
    //   );
    // });
  }, 1000);
};
// 竖向滑动条位置
const scrollTop = ref(0);
// 显示加载文字标记
const showLoading = ref(false);
// 触底事件
const onScrollTopLower = () => {
  console.log("触底了");
  showLoading.value = true;
};
</script>

<template>
  <view class="legalAid">
    <uni-search-bar
      class="search"
      v-model="searchValue"
      :onInput="onInput"
      placeholder="请输入律师姓名"
    />
    <scroll-view
      class="scrolly"
      scroll-y
      :scroll-top="scrollTop"
      @scrolltolower="onScrollTopLower"
    >
      <view class="personCard" v-for="items in 10">
        <view class="left">
          <image
            class="img"
            src="http://cloud.zhgn.cn:808/phone/icon/lawyer.png"
            mode="aspectFit"
          />
        </view>
        <view class="right">
          <view class="top">
            <view class="name">李星云</view>
            <view class="time">14:00-18:00</view>
          </view>
          <view class="down">
            <view class="area">擅长 </view>
            <view class="phone">电话: 16666666666 </view>
          </view>
        </view>
      </view>
      <view class="loadingtittle">
        <view v-if="showLoading"> 正在加载中... </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.legalAid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .search {
    width: calc(100vw);
  }
  .scrolly {
    height: calc(88vh);
    overflow-y: auto;
    .personCard {
      left: 0;
      right: 0;
      margin: 10rpx auto;
      width: calc(90vw);
      // background-color: skyblue;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 20rpx;
      .left {
        .img {
          width: calc(10vw);
          height: calc(10vh);
        }
      }
      .right {
        width: calc(80vw);
        display: flex;
        flex-direction: column;
        .top {
          padding: 20rpx;
          display: flex;
          justify-content: space-between;
        }
        .down {
          padding: 20rpx;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .loadingtittle {
      margin: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
