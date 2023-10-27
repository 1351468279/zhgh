<script lang="ts" setup>
import { ref, computed } from "vue";
import { onHide, onShow, onUnload } from "@dcloudio/uni-app";
import { getReviewStatus } from "@/services/applyUnion";
import { useMemberStore } from "@/store/index";
import {
  getTogetherEvaluationApi,
  getinviteData,
} from "@/services/quantitativeAssessment";
import type { myDataResItemsType, myDataResType } from "@/types/quantitativeAssessment";
const memberStore = useMemberStore();
const self_state = ref(1);
const peer_state = ref(0);
const organization_state = ref();
// 接收用户审核状态
const userState = ref();
// 接收会员身份标识
const isUser = ref(false);
// 接收会话框实例
const popup = ref();
// 点击自评
const onClick = (val: number) => {
  uni.navigateTo({
    url: "/subpackages/hotel/selfAssessment/index?id=" + val,
  });
};
// 他人邀请我的评价总条数
const inviteDataTotal = ref();
// 接收需要评价的列表
const evauateList = ref<myDataResType>();
// 接收下拉框
const self_assessmentParams = ref();
// 定义定时器模拟心跳包
let timer: any;
const activeId = ref(1);
const evaluateCatagoryList = ref([
  {
    text: "自评",
    id: 1,
  },
  {
    text: "互评",
    id: 2,
  },
]);
// 接收个人评论信息
const personEvaluate = ref();
// 切换评论分类
const transfrom = async (id: number) => {
  activeId.value = id;
  if (id == 2) {
    // await getTogetherEvaluationApi();
  }
};
// 滚动条位置
const scrollY = ref(0);
// 发生滚动
const onScroll = () => {
  console.log("发生滚动");
};
// 获取评论列表
const evaluateList = ref<myDataResType>();
const personalEvaluate = (obj: myDataResItemsType) => {
  let item = JSON.stringify(obj);
  console.log("654654165");
  uni.navigateTo({
    url: "/subpackages/hotel/selfAssessment/index?item=" + item,
  });
};
const togetherEvalyate = (obj: myDataResItemsType) => {
  let item = JSON.stringify(obj);
  uni.navigateTo({
    url: "/subpackages/hotel/selfAssessment/index?item=" + item + "&id=1",
  });
};
onShow(async () => {
  //  获取用户状态，判断用户身份
  userState.value = (await getReviewStatus()).data;
  // 如果用户是游客，显示一些提示并跳转到申请入会页面
  if (userState.value == "0") {
    uni.showModal({
      title: "提示",
      content: "您还未入会，请先申请入会",
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: "/subpackages/hotel/applyUnion",
          });
        }
      },
    });
  }
  // 如果是审核中，显示提示
  else if (userState.value == "1") {
    uni.showModal({
      title: "提示",
      content: "您的入会申请正在审核中，请耐心等待审核成功后再来操作",
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          uni.switchTab({
            url: "/pages/index/index",
          });
        }
      },
    });
  }
  // 如果用户是会员
  else if (userState.value == "2") {
    console.log("huiyuan");
    // 如果是普通会员
    if (memberStore.profile?.userVo?.roleType?.includes("member") == true) {
      isUser.value = true;
      console.log("普通会员 ");
      const res = await getinviteData();
      evaluateList.value = res.rows;
      // timer = setInterval(async () => {
      //   const res = await getinviteData();
      //   inviteDataTotal.value = res.total;
      //   console.log(res.rows);
      // }, 3000);
    }
    return;
  }
});
onHide(() => {
  console.log("5456465465");
  clearInterval(timer);
});
onUnload(() => {
  console.log("unload");
  clearInterval(timer);
});
</script>

<template>
  <view class="wrape">
    <view class="evaluateCatagoryList">
      <!-- <view
        class="listItem"
        :class="{ active: activeId == item.id }"
        v-for="item in evaluateCatagoryList"
        :key="item.id"
        @click="transfrom(item.id)"
        >{{ item.text }}
      </view> -->
      {{ evaluateList?.length }}
    </view>
    <view class="evaluateCatagory"> 231 </view>
    <scroll-view
      class="scrollY"
      scroll-y
      :scroll-top="scrollY"
      scroll-with-animation
      @scroll="onScroll"
    >
      <view class="cardItem" v-for="item in evaluateList" :key="item.id">
        <view class="left">
          <image
            class="img"
            src="https://cloud.zhgn.cn:8092/cdgh/static/phone/icon/1-3.png"
            mode="aspectFit"
          />
        </view>
        <view class="right">
          <view class="assessTheme"> {{ item.messageTitle }} </view>
          <view class="bottom">
            <view class="personalEvaluate" @click="personalEvaluate(item)"> 自评 </view>
            <view class="togetherEvaluate" @click="togetherEvalyate(item)"> 互评 </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* Project id 4301659 */
  /* Color fonts */
  src: url("//at.alicdn.com/t/c/font_4301659_7tsiyo597yh.woff2?t=1698216460151")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_4301659_7tsiyo597yh.woff?t=1698216460151")
      format("woff"),
    url("//at.alicdn.com/t/c/font_4301659_7tsiyo597yh.ttf?t=1698216460151")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-youxiang:before {
  content: "\e6a1";
}

@keyframes scale {
  /*开始状态*/
  0% {
    box-shadow: 0 0 0px 2px #d81e06;
  }
  20% {
    box-shadow: 0 0 4px 2px #d81e06;
  }
  40% {
    box-shadow: 0 0 8px 2px #d81e06;
  }
  60% {
    box-shadow: 0 0 12px 2px #d81e06;
  }
  80% {
    box-shadow: 0 0 16px 2px #d81e06;
  }
  100% {
    box-shadow: 0 0 20px 2px #d81e06;
  }
}
.wrape {
  width: 100vw;
  height: 100vh;
  .evaluateCatagoryList {
    right: 0;
    left: 0;
    margin: 0 auto;
    width: 90vw;
    height: 7vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: pink;
    border: 1px solid #ccc;
    border-radius: 2vw;
    .listItem {
      font-size: 5vw;
    }
    .active {
      font-weight: bold;
    }
    margin-bottom: 1vh;
  }
  .evaluateCatagory {
    right: 0;
    left: 0;
    margin: 0 auto;
    width: 90vw;
    height: 7vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: pink;
    border: 1px solid #ccc;
    border-radius: 2vw;
  }
  .scrollY {
    right: 0;
    left: 0;
    margin: 0 auto;
    overflow-y: auto;
    width: 90vw;
    max-height: 82vh;
    // background-color: skyblue;
    border: 1px solid #ccc;
    border-radius: 2vw;
    .cardItem {
      right: 0;
      left: 0;
      margin: 0 auto;
      width: 90vw;
      height: 11vh;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &:last-child {
        .right {
          border-bottom: none;
        }
      }
      .left {
        width: 11vh;
        height: 11vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 8vh;
          height: 8vh;
        }
      }
      .right {
        margin-right: 2vw;
        width: 72vw;
        height: 11vh;
        border-bottom: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .assessTheme {
          font-size: 4vw;
          font-weight: bold;
          color: #d81e06;
        }
        .bottom {
          display: flex;
          width: 72vw;
          justify-content: space-around;
          .personalEvaluate {
            width: 8vw;
            height: 8vw;
            border: 1px solid #2e2e2e;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            color: #2e2e2e;
          }
          .togetherEvaluate {
            width: 8vw;
            height: 8vw;
            border: 1px solid #2e2e2e;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            color: #2e2e2e;
          }
        }
      }
    }
  }
  .notice {
    font-size: 10vw;
    position: absolute;
    top: 5vw;
    left: 5vw;
    width: 15vw;
    height: 15vw;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: red;
    color: white;
    border-radius: 50%;
  }
  .noticeNum {
    position: absolute;
    top: 5vw;
    left: 18vw;
    width: 5vw;
    height: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: red;
    color: #0f8cdc;
    border-radius: 50%;
  }
  .noticeText {
    font-size: 13px;
    position: absolute;
    top: 12vw;
    left: 6vw;
    width: 60vw;
    height: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: red;
    color: #0f8cdc;
    border-radius: 50%;
  }
  .assessBox {
    width: calc(100vw);
    height: calc(60vh);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .item {
      width: 112px;
      height: 112px;
      // background-color: #72dca2;
      background-color: gray;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    .pending {
      background-color: #d81e06;
      animation: scale 1s infinite alternate;
    }
    .complete {
      background-color: #0f8cdc;
    }
    .line {
      width: calc(2vw);
      height: calc(10vh);
      background-color: #ccc;
      border-radius: 20rpx;
    }
  }
}

@font-face {
  font-family: "iconfont"; /* Project id 4282388 */
  src: url("//at.alicdn.com/t/c/font_4282388_c7xqenhqfxg.woff2?t=1697014878751")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_4282388_c7xqenhqfxg.woff?t=1697014878751")
      format("woff"),
    url("//at.alicdn.com/t/c/font_4282388_c7xqenhqfxg.ttf?t=1697014878751")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-wancheng:before {
  content: "\e606";
}
</style>
