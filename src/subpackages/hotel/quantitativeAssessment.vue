<script lang="ts" setup>
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { getReviewStatus } from "@/services/applyUnion";
import { useMemberStore } from "@/store/index";
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

// 接收下拉框
const self_assessmentParams = ref();
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
    }
    return;
  }
});
</script>

<template>
  <view class="wrape">
    <view class="assessBox">
      <view
        class="item self_assessment"
        :class="[{ pending: self_state == 0 }, { complete: self_state == 1 }]"
        @click="onClick(0)"
      >
        <view class=""> 自评 </view>
        <view class="iconfont">&#xe606; </view>
      </view>
      <view class="line"> </view>
      <view
        class="item peer_assessment"
        :class="[{ pending: peer_state == 0 }, { complete: peer_state == 1 }]"
        @click="onClick(1)"
      >
        <view class=""> 互评 </view>
        <view class="iconfont">&#xe606; </view>
      </view>
      <view class="line"> </view>
      <view
        class="item organization_assessment"
        :class="[
          { pending: organization_state == 0 },
          { complete: organization_state == 1 },
        ]"
        @click="onClick(2)"
      >
        <view class=""> 组织评价 </view>
        <view class="iconfont">&#xe606; </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
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
  display: flex;
  justify-content: center;
  align-items: center;
  .assessBox {
    width: calc(100vw);
    height: calc(90vh);
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
    .popup {
      .selfBox {
        background-color: #fff;
        width: calc(80vw);
        height: calc(60vh);
        border-radius: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
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
