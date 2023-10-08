<script lang="ts" setup>
import { computed, ref } from "vue";
import { getDifficultyNewsList } from "@/services/applyHelper";
import { onShow } from "@dcloudio/uni-app";
// 触底加载提示
const isLoading = ref(false);
const loadingText = ref("正在加载中...");
const scrollTop = ref(0);
// 滚动事件
const onScrollTop = (e) => {
  console.log(e);
};
// 触底事件
const onScrollTopLower = async (e) => {
  isLoading.value = true;
  if (cardList.value.length < total.value) {
    console.log("页数加1");
    getSanYuListParams.pageVo.offset = cardList.value.length;
    // offset.value++
    const res = await getDifficultyNewsList(getSanYuListParams);
    // const res = await getNewsList(getSanYuListParams);
    console.log("cs", res.body);
    cardList.value.push(...res.body?.rows!);
    isLoading.value = false;
    // await getSanYuList(getSanYuListParams.value)
    console.log("到底了");
  } else {
    loadingText.value = "没有更多了~~~";
  }
};
// 点击填写申请表
const applyHelper = () => {
  console.log(1212);
  uni.navigateTo({
    url: "/subpackages/hotel/applyHelper",
  });
};
// 点击我的申请
const myApply = () => {
  console.log(121);
  uni.navigateTo({
    url: "/subpackages/hotel/difficultyHelperReview",
  });
};
// 定义获取困难帮扶新闻列表请求分页参数
const getSanYuListParams = {
  knbfNews: {},
  pageVo: {
    limit: 5,
    offset: 0,
    sidx: "id",
    sord: "desc",
  },
};
// 接收新闻列表
const cardList = ref([]);
// 接收新闻总条数
const total = ref();
// 封装分页列表函数
const getNewsList = async (data) => {
  const res = await getDifficultyNewsList(data);
  console.log("onShow");
  console.log(res.body);

  console.log(res.body.rows);
  total.value = res.body.total;
  cardList.value = res.body.rows;
  console.log(cardList.value);
  // cardList.value = (res.body as any).rows;
  // total.value = (res.body as any).total;
  // console.log(cardList.value);
  // console.log("页数相除");
  // console.log(total.value / 5);
};

onShow(async () => {
  await getNewsList(getSanYuListParams);
});
</script>

<template>
  <view class="helpBox">
    <!-- 头部 -->
    <view class="head">
      <view class="visualImage"></view>
      <view class="funcCard" @click="myApply">
        <view class="myApply"> 我的申请 </view>
        <!-- <view class="download"> 资料下载</view> -->
      </view>
    </view>
    <view class="body">
      <view class="tittle">
        <view class="tittleText">帮扶新闻</view>
        <!-- <view class="more">查看更多</view> -->
      </view>
      <!-- 新闻列表 -->
      <scroll-view
        class="newsScrollTop"
        scroll-y
        :scroll-top="scrollTop"
        @scroll="onScrollTop"
        lower-threshold="10"
        @scrolltolower="onScrollTopLower"
      >
        <view class="listItem" v-for="(item, index) in cardList" :key="item.id">
          <view class="itemImg"><img class="image" :src="item.image" /></view>
          <view class="itemContent">
            <view class="contentTittle">{{ item.title }}</view>
            <view class="contentTag">
              <view class="area">
                <!-- <view class="iconfont icon" v-if="props.lefticon">{{
                  props.lefticon
                }}</view> -->
                <view class="areaTeam">{{ item.releaseTime }}</view>
              </view>
              <view class="viewNum">
                <!-- <view class="iconfont icon" v-if="props.righticon">{{
                  props.righticon
                }}</view> -->
                <view class="num">{{ item.number }}人看过</view>
              </view>
            </view>
          </view>
        </view>
        <view class="loadTittle" v-if="isLoading">{{ loadingText }}</view>
      </scroll-view>
    </view>
    <view class="bottom" @click="applyHelper">
      <view class="content">填写申请 </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.helpBox {
  width: calc(100vw);
  height: calc(100vh);
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  .head {
    background: no-repeat right bottom url("http://cloud.zhgn.cn:808/phone/hotel/1-2.png"),
      linear-gradient(to right, white, red);
    background-size: 100%;
    height: 30%;
    position: relative;
    .funcCard {
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      bottom: 0rem;
      background-color: #ffeded;
      width: 20rem;
      height: 4rem;
      border-radius: 10px;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
  .body {
    background-color: #f4f8fb;
    margin: 20rpx 40rpx;
    height: 60%;
    display: flex;
    flex-direction: column;
    .tittle {
      display: flex;
      justify-content: space-between;
      .tittleText {
        font-weight: bold;
        margin-bottom: 20rpx;
      }
      .more {
        font-size: 13px;
        color: #cccc;
      }
    }
    .newsScrollTop {
      overflow-y: auto;
      .listItem {
        width: 95%;
        height: 200rpx;
        background-color: white;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid #e5e5e5;
        border-radius: 20rpx;
        margin: 15rpx auto;

        .itemImg {
          height: 90%;
          width: 40%;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10rpx;

          .image {
            border: 1px solid #e5e5e5;
            width: 80%;
            height: 90%;
            border-radius: 20rpx;
          }
        }

        .itemContent {
          width: 60%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-direction: column;

          .contentTittle {
            width: 90%;
            height: 60%;
            font-size: 30rpx;
            padding: 0 20rpx;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }

          .contentTag {
            width: 90%;
            height: 40%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .area {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .icon {
                font-size: 30rpx;
                color: #ff0000;
              }

              .areaTeam {
                font-size: 28rpx;
                color: #666666;
              }
            }

            .viewNum {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .icon {
                font-size: 30rpx;
                color: #ff0000;
              }

              .num {
                font-size: 28rpx;
                color: #666666;
              }
            }
          }
        }
      }
      .loadTittle {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 60rpx;
        width: 100%;
      }
    }
  }
  .bottom {
    height: 10%;
    width: calc(90vw);
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 20rpx;
    .content {
      width: 100%;
      height: 50%;
      border-radius: 30rpx;
      color: #ffeded;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to right, #ffb6b6, red);
    }
  }
}
</style>
