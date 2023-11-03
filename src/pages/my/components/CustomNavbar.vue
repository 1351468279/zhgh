<script lang="ts" setup>
import { getCurrentUserInfo } from "@/services/myInfo";
import type { currentUserInfo } from "@/types/myinfo";
import { baseURL } from "@/utils/http";
import { onShow, onUnload } from "@dcloudio/uni-app";

import { reactive, ref } from "vue";

const menuMineData = reactive([
  { tittle: "我参与的活动", icon: "\uE61E", url: "/subpackages/my/myActivity" },
]);
const menuFunData = reactive([
  { tittle: "个人资料", icon: "\uE61E", url: "/subpackages/my/personalInfo" },
]);
const menuSuggestData = reactive([
  { tittle: "关于我们", icon: "\uE65E", url: "/subpackages/my/aboutUs" },
  { tittle: "退出登录", icon: "\uE677", url: "/pages/login/index" },
]);

const Jump = () => {
  uni.navigateTo({
    url: "/subpackages/my/personalInfo",
  });
};
const userInfo = ref<currentUserInfo>();
const avatar = ref("");
onShow(async () => {
  console.log("onshow");
  console.log("跟页面onshow");
  avatar.value = "";
  const res = await getCurrentUserInfo();
  userInfo.value = res.body;
  console.log(userInfo.value);
  if (!userInfo.value) uni.showToast({ title: "用户信息错误" });
  avatar.value =
    baseURL +
    "/zzhygl/getImg/" +
    userInfo.value?.sysUserId +
    ".ignore?t=" +
    Math.random();
});
onUnload(() => {
  console.log("onunload");
});
</script>

<template>
  <view class="navbar">
    <!-- <view class="tittle" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">个人中心</view> -->
    <view class="totalinfo">
      <view class="pubinfo">
        <view class="left">
          <button class="imageButton" @click="Jump" hover-class="button-hover">
            <image class="avatar" :src="avatar" mode="aspectFill" />
          </button>
          <view class="userinfo" @click="Jump">
            <view class="userlevel">
              <view class="cardarea">{{ userInfo?.name }}</view>
            </view>
            <view class="username">
              <view class="cardnum">组织：</view>
              <view class="cardstate">{{ userInfo?.orgId }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="menu">
        <view class="menumine">
          <navigator
            class="mineitem"
            v-for="item in menuMineData"
            :url="item.url"
            open-type="navigate"
            hover-class="navigator-hover"
            :key="item.icon"
          >
            <view class="menuheader">
              <view class="itemicon iconfont">{{ item.icon }}</view>
              <view class="itemcontent">{{ item.tittle }}</view>
            </view>
            <view class="nexticon iconfont icon-tiaozhuan"></view>
          </navigator>
        </view>
        <view class="menuuser">
          <navigator
            class="mineitem"
            v-for="item in menuFunData"
            :url="item.url"
            open-type="navigate"
            hover-class="navigator-hover"
            :key="item.icon"
          >
            <view class="menuheader">
              <view class="itemicon iconfont">{{ item.icon }}</view>
              <view class="itemcontent">{{ item.tittle }}</view>
            </view>
            <view class="nexticon iconfont icon-tiaozhuan"></view>
          </navigator>
        </view>
        <view class="menusuggest">
          <navigator
            class="mineitem"
            v-for="item in menuSuggestData"
            :url="item.url"
            open-type="navigate"
            hover-class="navigator-hover"
            :key="item.icon"
          >
            <view class="menuheader">
              <view class="itemicon iconfont">{{ item.icon }}</view>
              <view class="itemcontent">{{ item.tittle }}</view>
            </view>
            <view class="nexticon iconfont icon-tiaozhuan"></view>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 20rpx;
  width: 100%;

  .tittle {
    margin: 20rpx;
  }

  .totalinfo {
    width: 100%;
    // background-color: #e63427;

    .pubinfo {
      display: grid;
      grid-template-columns: 3fr 1fr;
      overflow: hidden;
      //   background: linear-gradient(180deg, #fb5b51 0%, #e53325 100%);
      width: 100vw;
      height: 20vh;
      position: relative;

      &::after {
        position: absolute;
        display: block;
        content: "";
        width: 100vw;
        height: 1.5vh;
        background-color: #ededed;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 0 auto;
      }

      .left {
        display: grid;
        grid-template-columns: 1fr 2fr;

        .imageButton {
          display: block;
          width: 17vw;
          height: 17vw;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          padding: 0;
          box-shadow: 0 0 2px 6px white;

          .avatar {
            width: 17vw;
            height: 17vw;
          }
        }

        .userinfo {
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;

          .username {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 20rpx 0;
            font-size: 3.5vw;
            color: #777777;

            .cardnum {
              margin-right: 10rpx;
            }
          }

          .userlevel {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 6vw;
            font-weight: 700;

            .cardarea {
              margin-right: 10rpx;
            }
          }
        }
      }
    }

    .menu {
      border-radius: 20rpx 20rpx 0 0;
      background-color: #fff;
      overflow: hidden;
      width: 100%;
      display: flex;
      flex-direction: column;

      .menumine,
      .menuuser,
      .menusuggest {
        width: 100%;
        border-bottom: 1.5vh solid #ececec;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;

        .mineitem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 95%;
          height: 90rpx;
          background-color: #fff;
          border-bottom: 1px solid #e5e5e5;
          overflow: hidden;

          .menuheader {
            margin-left: 20rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .itemcontent {
              margin-left: 30rpx;
            }
          }

          .nexticon {
            margin-right: 40rpx;
          }
        }

        .mineitem:last-child {
          border-bottom: none;
        }
      }

      .menusuggest {
        border-bottom: none;
      }
    }
  }
}
</style>
