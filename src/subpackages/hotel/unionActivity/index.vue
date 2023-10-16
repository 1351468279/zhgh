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
// 点击查看活动
const viewDetail = () => {
  uni.navigateTo({
    url: "/subpackages/hotel/recuperationDetail",
    // url: "/subpackages/hotel/recuperationDetail" + "?id=" + id,
  });
};
// 点击发布活动
const publishActivity = () => {
  console.log(5454);
  uni.navigateTo({
    url: "/subpackages/hotel/applyRecuperation",
  });
};
const activeId = ref(0);
const categoryTittle = ref([
  {
    text: "即将开始",
    value: 0,
  },
  {
    text: "我参与的",
    value: 1,
  },
  {
    text: "已结束",
    value: 2,
  },
]);
const onClick = (id: number) => {
  activeId.value = id;
};
</script>

<template>
  <view class="recuperation">
    <view class="category">
      <view
        class="cateforyList"
        :class="{ active: activeId == item.value }"
        v-for="item in categoryTittle"
        @click="onClick(item.value)"
      >
        {{ item.text }}
      </view>
    </view>
    <!-- <uni-search-bar
      class="search"
      v-model="searchValue"
      :onInput="onInput"
      placeholder="请输入活动关键字"
    /> -->
    <scroll-view
      class="scrolly"
      scroll-y
      :scroll-top="scrollTop"
      @scrolltolower="onScrollTopLower"
    >
      <view class="recuperationCard" v-for="items in 10" @click="viewDetail()">
        <view class="state"> 进行中 </view>
        <view class="left">
          <image
            class="img"
            src="http://cloud.zhgn.cn:808/phone/icon/lawyer.png"
            mode="aspectFit"
          />
        </view>
        <view class="right">
          <view class="top">
            <view class="tittle">活动标题</view>
          </view>
          <view class="down">
            <view class="area">活动地点 </view>
            <view class="time">活动人数 </view>
          </view>
        </view>
      </view>
      <view class="loadingtittle">
        <view v-if="showLoading"> 正在加载中... </view>
      </view>
    </scroll-view>
    <view class="publishItem" @click="publishActivity"> + </view>
  </view>
</template>

<style lang="scss" scoped>
.recuperation {
  height: 100vh;
  background-color: #eeeeee;
  position: relative;
  .category {
    width: calc(90vw);
    height: calc(12vw);
    display: flex;
    left: 0;
    right: 0;
    margin: auto;
    align-items: center;
    .cateforyList {
      margin: 20rpx;
    }
    .active {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .search {
    width: calc(90vw);
  }

  .scrolly {
    height: calc(88vh);
    overflow-y: auto;

    .recuperationCard {
      left: 0;
      right: 0;
      margin: auto;
      margin-bottom: 20rpx;
      width: calc(90vw);
      // background-color: skyblue;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 20rpx;
      background-color: white;
      position: relative;

      .state {
        // filter: grayscale(100%);
        position: absolute;
        top: 0;
        left: 0;
        background-color: #d2f2d5;
        border-radius: 8rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #17ab64;
        font: 14px Arial;
      }

      .left {
        .img {
          margin-left: 20rpx;
          width: calc(20vw);
          height: calc(15vh);
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

          .area {
            color: #ccc;
            font: 14px Arial;
          }

          .time {
            color: #ccc;
            font: 14px Arial;
          }
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

  .publishItem {
    position: absolute;
    bottom: 180rpx;
    right: 60rpx;
    width: 100rpx;
    height: 100rpx;
    border-radius: 40%;
    background-color: rgba(237, 64, 52, 0.8);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
