<script lang="ts" setup>
import { getReviewStatus } from "@/services/applyUnion";
import { useMemberStore } from "@/store/modules/member";
import type { selectCatagoryType } from "@/types/fundManagement";
import { onShow } from "@dcloudio/uni-app";
import type { SwiperOnChangeEvent } from "@uni-helper/uni-app-types";
import { ref } from "vue";

const memberStore = useMemberStore();
//接收用户状态
const userState = ref();
const isAdmin = ref(false);
const isUser = ref(false);
const catagoryList = ref<selectCatagoryType[]>();
const currentTab = ref(0);
const flag = ref(false);
// 切换tab栏
const switchTab = (e: SwiperOnChangeEvent) => {
  if (flag.value) return (flag.value = false);
  console.log(e.detail.current);
  currentTab.value = e.detail.current;
};
//点击切换tab栏
const changeTab = (id: number) => {
  console.log(id);
  flag.value = true;
  currentTab.value = id;
};
onShow(async () => {
  if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin") == true) {
    console.log("管理员");
    isAdmin.value = true;
    return;
  }
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
    isUser.value = true;
    catagoryList.value = [
      { text: "个人", id: 0 },
      { text: "部门", id: 1 },
    ];
  }
});
</script>

<template>
  <view class="fundBox">
    <view class="wrape">
      <view class="selectCatagory">
        <view
          class="personalEvaluate"
          v-for="item in catagoryList"
          :key="item.id"
          :class="{ active: item.id == currentTab }"
          @click="changeTab(item.id)"
          >{{ item.text }}
        </view>
      </view>
      <swiper
        class="swiperList"
        :disable-touch="false"
        :current="currentTab"
        @change="switchTab"
        circular
      >
        <swiper-item>个人</swiper-item>
        <swiper-item>部门</swiper-item>
      </swiper>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.fundBox {
  width: 100vw;
  height: 98vh;
  position: relative;
  background-color: skyblue;
  .wrape {
    width: 100vw;
    height: 98vh;
    left: 0;
    right: 0;
    top: 0;
    right: 0;
    margin: auto;
    margin-top: 2vh;
    background-color: #fff;
    .selectCatagory {
      right: 0;
      left: 0;
      margin: 0 auto;
      width: 50vw;
      height: 6vh;
      display: flex;
      justify-content: space-around;
      align-items: center;
      // background-color: pink;
      border: 1px solid #ccc;
      border-radius: 2vw;
      margin-bottom: 2vw;
      .active {
        font-size: 5vw;
        font-weight: bold;
      }
    }
    .swiperList {
      height: 89vh;
    }
  }
}
</style>
