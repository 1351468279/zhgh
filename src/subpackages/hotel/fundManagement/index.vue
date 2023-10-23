<script lang="ts" setup>
import { getReviewStatus } from "@/services/applyUnion";
import { useMemberStore } from "@/store/modules/member";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const memberStore = useMemberStore();

const scrollTop = ref(0);
// 触底
const scrollToLower = (e: any) => {
  console.log(e);
};
const time = ref();
// 接收时间段
const timeNodes = ref();
// 时间段改变、
const ChangeTime = (e: any) => {
  console.log(e.detail.value);
  date.value = e.detail.value;
};
const date = ref();
const getDate = () => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  // let day = date.getDate();
  // if (type === "start") {
  //   year = year - 60;
  // } else if (type === "end") {
  //   year = year + 2;
  // }
  // month = month > 9 ? month : "0" + month;
  // day = day > 9 ? day : "0" + day;
  return `${year}-${month} `;
};
// 接收用户审核状态
const userState = ref();
// 接收管理员身份标识
const isAdmin = ref(false);
// 接收工会委员身份标识
const isCommissioner = ref(false);
// 接收工会管理员身份标识
const isGhAdmin = ref(false);
// 接收会员身份标识
const isUser = ref(false);
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
    // 获取当前时间并显示
    date.value = getDate();
    // 如果是管理员
    if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin") == true) {
      isAdmin.value = true;
      console.log("管理员");
    }
    // 如果是工会委员
    else if (memberStore.profile?.userVo?.roleType?.includes("UnionMembers") == true) {
      isCommissioner.value = true;
      console.log("工会委员");
    }
    // 如果是工会管理员
    else if (memberStore.profile?.userVo?.roleType?.includes("ghAdmin") == true) {
      isGhAdmin.value = true;
      console.log("工会管理员");
    }
    // 如果是普通会员
    else if (memberStore.profile?.userVo?.roleType?.includes("member") == true) {
      isUser.value = true;
      console.log("普通会员 ");
    }
  }
});
</script>

<template>
  <view class="body">
    <view class="selectTime">
      <picker class="timePicker" fields="month" mode="date" @change="ChangeTime">
        <view class="uni-input time">{{ date }}</view>
      </picker>
    </view>
    <scroll-view
      class="scrollY"
      scroll-y
      :scroll-top="scrollTop"
      @scrolltolower="scrollToLower"
    >
      <view class="timeNodes" v-for="item in 5">
        <view class="left">
          <view class="yuanquan"> </view>
          <view class="line" v-if="item != 5"> </view>
        </view>
        <view class="right">
          <!-- <view class="line"> </view> -->
          <view class="content"> 内容 </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.body {
  background-color: #f1f1f1;
  width: 100vw;
  height: 100vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
  .selectTime {
    margin: 20rpx 0 0;
    width: 30vw;
    height: 5vh;
    background-color: f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
    .timePicker {
      height: 5vh;
      display: flex;
      align-items: center;
      .time {
        height: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .scrollY {
    width: 100vw;
    height: 92vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .timeNodes {
      width: 80vw;
      height: 13vh;
      // background-color: white;
      left: 0;
      right: 0;
      margin: auto;
      padding: 10vw 0;

      // margin-bottom: 100rpx; /* Add time line using ::after pseudo-element */
      display: flex;
      position: relative;
      .left {
        height: 13vh;
        width: 10vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f1f1f1;

        .yuanquan {
          height: 3vw;
          width: 3vw;
          background-color: red;
          box-shadow: 0 0 11px 1px red;
          border-radius: 50%;
        }
        .line {
          position: absolute;
          width: 2px;
          height: 26vw;
          background-color: #f69292;
          top: 30vw;
          left: 5vw;
        }
      }
      .right {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .line {
          width: 30vw;
          height: 2px;
          background-color: #f69292;
          margin-left: 5vw;
        }
        .content {
          width: 30vw;
          height: 30vw;
          background-color: #fff;
          border-radius: 2vw;
        }
      }
    }
  }
}
</style>
