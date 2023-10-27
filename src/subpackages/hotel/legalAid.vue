<script lang="ts" setup>
// 接收搜索框字符
import { getLawerListApi } from "@/services/legalAid";
import type { lawerItem } from "@/types/legalAid";
import { baseURL } from "@/utils/http";
import { onShow } from "@dcloudio/uni-app";
import type { UniSearchBarOnInputEvent } from "@uni-helper/uni-ui-types";
import { ref } from "vue";
// 接收律师列表
const lawerList = ref<lawerItem[]>();
const searchValue = ref("");
// 输入框防抖
let timer: any = null;
// 搜索框输入事件
const onInput = (e: any) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(async () => {
    if (e == "") {
      const res = await getLawerListApi(page.value, "");
      console.log(res.rows);
      lawerList.value = res.rows;
      return;
    }
    console.log(e);
    console.log(e);
    lawerList.value = lawerList.value?.filter((item) => item.name.includes(e));
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
// 定义页数
const page = ref(1);

onShow(async () => {
  // 默认请求第一页的信息
  console.log(";45");
  const res = await getLawerListApi(page.value, "");
  console.log(res.rows);
  lawerList.value = res.rows;
});
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
      <view class="personCard" v-for="items in lawerList" :key="items.id">
        <view class="left">
          <image
            class="img"
            src="http://cloud.zhgn.cn:808/phone/hotel/1-8.png"
            mode="aspectFit"
          />
        </view>
        <view class="right">
          <view class="top">
            <view class="name">{{ items.name }}</view>
            <!-- <view class="time">{{items.}}</view> -->
          </view>
          <view class="down">
            <view class="area">擅长 </view>
            <view class="phone">电话: 16666666666 </view>
          </view>
        </view>
      </view>
      <view class="loadingtittle">
        <view v-if="showLoading"> 没有更多数据了~~~ </view>
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
      height: 30vw;
      left: 0;
      right: 0;
      margin: 3vw auto;
      width: calc(90vw);
      // background-color: skyblue;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 20rpx;
      .left {
        .img {
          width: calc(20vw);
          height: calc(20vw);
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
