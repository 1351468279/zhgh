<script lang="ts" setup>
import { getReviewStatus } from "@/services/applyUnion";
import { useMemberStore } from "@/store/modules/member";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";

const dataList = ref([
  {
    id: 1,
    date: "2023-05-27",
    part: "上午",
    content:
      "使用微信小程序简单实现时间轴界面，代码简洁，逻辑清楚，适合刚入手准备学习微信小程序的伙伴们，简单分享下。一共分为以下四大步骤。",
  },
  {
    id: 2,
    date: "2023-05-28",
    part: "下午",
    content:
      '第一步：使用一个标签<view class="box"></view>，设置好内边距，以及在后续调整其他布局的时候，便于编写代码。如果喜欢将两边铺满屏幕的友友们，可以忽略此步骤。',
  },
  {
    id: 3,
    date: "2023-05-29",
    part: "晚上",
    content:
      '第二步：循环读取需要现实的数据内容，并再次使用一个标签<view class="box-line"></view>，此标签主要设置左边的竖线，使用左边框属性设置即可，并设置好内边距。',
  },
  {
    id: 4,
    date: "2023-05-30",
    part: "凌晨",
    content:
      '第三步：在标签<view class="box-line"></view>上方，加入标签<view class="point"></view>，用于编写圆点，并将其左边距(margin-left)属性设为负值，调整好自己喜欢的样式。',
  },
  {
    id: 5,
    date: "2023-05-31",
    part: "天黑",
    content:
      '第四步：在标签<view class="box-line"></view>内部，包入一个新的标签<view class="box-data"></view>，在这个标签里面设置好样式后，便可将循环出的数据，按照需求摆放，随意布局啦，想学习更多微信小程序的友友们，请至我的主页，分享界面示例，共同学习哦！',
  },
]);
const memberStore = useMemberStore();
//接收用户状态
const userState = ref();
const isAdmin = ref(false);

onShow(async () => {
  // 获取用户实时审核状态
  userState.value = (await getReviewStatus()).data;
  // 如果是游客
  if (userState.value == 0) {
    // 游客且未绑定手机号
    if (!memberStore.profile?.phoneNum) {
      uni.navigateTo({ url: "/pages/login/index?actions=tapPhone" });
    }
  }
  // 如果是会员，并且已经提交审核了,但是还没通过
  else if (userState.value == 1) {
    // 但是是通过卡片进来的
    console.log("您已经提交过审核了，请耐心等待");
    uni.showToast({
      title: "您已经提交过审核了，请耐心等待",
      icon: "none",
      duration: 1000,
      success: () => {
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      },
    });
  }
  // 如果是会员，并且已经通过审核了
  else if (userState.value == 2) {
    // 如果是管理员
    // 如果是
  }
});
</script>

<template>
  <view class="box">
    <view v-for="(item, index) in dataList" :key="item.id">
      <!-- 圆点 -->
      <view class="point">
        <view class="dot">{{ index + 1 }}</view>
        <view class="title">{{ item.date + " " + item.part }}</view>
      </view>
      <!-- 容器二 -->
      <view class="box-line">
        <!-- 容器三 -->
        <view class="box-data">
          <view class="row-info">{{ item.content }}</view>
          <!-- <view class="row-button">
            <view>按钮A</view>
            <view>按钮B</view>
            <view>按钮C</view>
          </view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
/* 容器一 */
.box {
  padding: 10rpx 20rpx 10rpx 40rpx;

  .point {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15rpx 0;
    .dot {
      margin-left: -22rpx;
      background-color: #19be6b;
      box-shadow: 0 0 5rpx 5rpx #71d5a1;
      color: white;
      width: 36rpx;
      padding: 5rpx;
      font-size: 28rpx;
      text-align: center;
      border-radius: 50rpx;
    }

    .title {
      font-size: 30rpx;
      margin-left: 15rpx;
      background-color: white;
      padding: 12rpx 25rpx;
      border-radius: 50rpx;
      color: #909399;
    }
  }
  .box-line {
    border-left: 3rpx solid #c8c9cc;
    padding: 15rpx 10rpx 15rpx 35rpx;
    .box-data {
      background-color: white;
      padding: 30rpx 15rpx;
      border-radius: 15rpx;
      .row-info {
        font-size: 28rpx;
        color: gray;
        line-height: 45rpx;
        padding: 0 15rpx;
        text-indent: 2rem;
      }

      .row-button {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-top: 1rpx solid #f1f1f1;
        margin-top: 20rpx;
        padding-top: 20rpx;
      }
      .row-button view {
        padding: 12rpx 30rpx;
        font-size: 30rpx;
        color: white;
        border-radius: 10rpx;
      }

      .row-button view:nth-child(1) {
        background-color: #ff9900;
      }

      .row-button view:nth-child(2) {
        background-color: #19be6b;
      }

      .row-button view:nth-child(3) {
        background-color: #2979ff;
      }
    }
  }
}

/* 容器二 */

/* 圆点 */

/* 容器三 */
</style>
