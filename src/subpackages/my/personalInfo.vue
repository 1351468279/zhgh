<script lang="ts" setup>
import OptionsTavb from "@/components/OptionsTab.vue";
import { getCurrentUserInfo } from "@/services/myInfo";
import type { currentUserInfo } from "@/types/myinfo";
import { baseURL } from "@/utils/http";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const avatar = ref("");
const nickname = ref("未定义");
const showSex = (val: string) => {
  if (val == "0") return "男";
  return "女";
};
const userInfo = ref<currentUserInfo>();

const chooseAvatar = async (e: UniHelper.ButtonOnChooseavatarEvent) => {
  console.log(e);
  await uni.uploadFile({
    url: baseURL + "/zzhygl/uploadImg.do",
    name: "file",
    filePath: e.detail.avatarUrl,
    header: {
      "content-type": "multipart/form-data",
    },
    formData: {
      id: userInfo.value?.sysUserId,
    },
    success: (uploadFileRes) => {
      console.log(uploadFileRes);
      avatar.value =
        baseURL +
        "/zzhygl/getImg/" +
        userInfo.value?.sysUserId +
        ".ignore?t=" +
        Math.random();
      console.log(avatar.value);
    },
    fail: (fail) => {
      console.log(fail);
    },
  });
};

onShow(async () => {
  console.log("onshow");
  console.log(avatar.value);
  const res = await getCurrentUserInfo();
  userInfo.value = res.body;
  avatar.value =
    baseURL +
    "/zzhygl/getImg/" +
    userInfo.value?.sysUserId +
    ".ignore?t=" +
    Math.random();
});
</script>

<template>
  <view class="personInfo">
    <view class="wrape">
      <button class="avatarBox" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
        <view class="left" hover-class="navigator-hover">头像</view>
        <view class="right">
          <image class="img" :src="avatar" mode="aspectFit" />
          <text class="icon iconfont">&#xe637;</text>
        </view>
      </button>
      <OptionsTavb leftText="名字" :rightText="userInfo?.name" rightRow></OptionsTavb>
      <OptionsTavb leftText="工号" :rightText="userInfo?.account" rightRow></OptionsTavb>
      <OptionsTavb leftText="组织" :rightText="userInfo?.orgId" rightRow></OptionsTavb>
      <!-- <OptionsTavb
        leftText="身份证号"
        :rightText="userInfo?.idNumber"
        rightRow
      ></OptionsTavb> -->
      <OptionsTavb leftText="年龄" :rightText="userInfo?.age" rightRow></OptionsTavb>
      <OptionsTavb
        leftText="性别"
        :rightText="showSex(userInfo?.sex as string)"
        rightRow
      ></OptionsTavb>
      <OptionsTavb leftText="种族" :rightText="userInfo?.nation" rightRow></OptionsTavb>
      <OptionsTavb leftText="学历" :rightText="userInfo?.record" rightRow></OptionsTavb>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.personInfo {
  width: 100vw;
  height: 100vh;
  background-color: #ededed;

  .wrape {
    width: 100vw;
    height: 100vh;
    right: 0;
    left: 0;
    margin: 0 auto;
    .avatarBox {
      max-width: 100vw;
      min-height: 7vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      background-color: #fff;
      padding: 0 5vw;

      &::after {
        border: none;
      }
      .left {
        font-size: 4vw;
        color: #2a2a2a;
      }
      .right {
        display: flex;
        align-items: center;
        .img {
          height: 10vh;
          width: 10vh;
          margin: 2vw 0;
          border-radius: 2vw;
          background-color: skyblue;
        }
        &::after {
          display: block;
          content: "";
          position: absolute;
          bottom: 0;
          width: 90vw;
          height: 1px;
          background-color: #ededed;
          right: 0;
          left: 0;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
