<script lang="ts" setup>
import { useApplyUnionStore } from "@/store/index";
import {
  getOrgName,
  getReviewInfo,
  getReviewList,
  getReviewStatus,
  passAllReview,
} from "@/services/applyUnion";
import type { OrgDataType } from "@/types/member";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useMemberStore } from "@/store/index";
// 获取用户审核状态
const userState = ref();
// 设置审核列表接受数据
const reviewAllList = ref<any[]>([]);
// 接受审核列表显示
const reviewList = ref<any[]>([]);
// 定义管理员审核列表参数
// 默认是待审核
const fs = ref("0");
const limit = ref("10");
//第一页
const offset = ref("1");
const sidx = ref("id");
const sord = ref("desc");
// 设置一件审核字段隐藏标识
const isShow = ref(true);
// 设置管理员标识
const isAdmin = ref(false);
// 待审核和已审核标记
const reviewTag = ref(1);
const systemInfo = uni.getSystemInfoSync();
console.log(systemInfo);
const applyUnionStore = useApplyUnionStore();
const onClick = (val: Number) => {
  uni.navigateTo({
    url: "/subpackages/hotel/applyUnion" + "?cardId=" + val,
  });
};
// 接收待审核成员id数组
const reviewAllId = ref<string>();
// 一键审核
const reviewAll = async () => {
  await passAllReview(JSON.stringify(reviewAllId.value));
  // 刷新一下列表
  const res = await getReviewList({
    fs: fs.value,
    pageVo: {
      limit: limit.value,
      offset: offset.value,
      sidx: sidx.value,
      sord: sord.value,
    },
  });
  reviewList.value = res.data.content;
  console.log(reviewAllId.value);
  console.log(JSON.stringify(reviewAllId.value));
  uni.showToast({
    title: "审核完毕",
  });
};
// 接收成员状态仓库
const memberStore = useMemberStore();
// 接收组织信息
const orgInfo = ref<OrgDataType[]>();
// 根据组织id返回名称
const orgName = ref();
const outOrgName = (id: String) => {
  if (orgInfo.value) {
    // 根据id返回组织名称
    return orgInfo.value?.find((item) => {
      return item.id == id;
    })?.name;
  } else {
    return "00";
  }
};

onShow(async () => {
  // 获取组织信息
  console.log(memberStore.profile?.userVo?.roleType?.includes("SystemAdmin"));
  orgInfo.value = (await getOrgName()).data;
  console.log(orgInfo.value);

  // 判断用户权限是否是管理员
  // 根据审核状态判断用户是否入会
  userState.value = (await getReviewStatus()).data;
  if (userState.value == 0) {
    uni.showModal({
      title: "提示",
      content: "您还未提交入会申请，请前往入会申请界面提交申请",
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: "/subpackages/hotel/applyUnion",
          });
        }
      },
    });
    return;
  }
  // 如果是已审核并且roleType数组里面包含SystemAdmin标识就是管理员
  else if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin") == true) {
    console.log("管理员");
    isAdmin.value = true;
    const res = await getReviewList({
      fs: fs.value,
      pageVo: {
        limit: limit.value,
        offset: offset.value,
        sidx: sidx.value,
        sord: sord.value,
      },
    });
    // 设置待审核列表
    reviewList.value = res.data.content;
    reviewAllId.value = res.data.content.map((item: { id: string }) => item.id);
    return;
  }
  // 默认展示的是待审核列表
  reviewAllList.value = (await getReviewInfo()).data;
  // 设置待审核列表
  reviewList.value = reviewAllList.value.filter((item) => {
    return item.state == reviewTag.value;
  });
});
// 设置审核状态激活样式
const setReviewActive = ref(1);
// 设置待审核样式
const setAwaitActive = ref(1);
// 点击切换待审核和已审核
const changeReviewState = async (val: number) => {
  reviewTag.value = val;
  // console.log(e.target.innerText)
  // 点击待审核
  if (val == 1) {
    fs.value = "0";
    isShow.value = true;
    setAwaitActive.value = val;
    if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin")) {
      // 设置高亮
      setReviewActive.value = val;
      // 执行获取审核列表函数
      const res = await getReviewList({
        fs: fs.value,
        pageVo: {
          limit: limit.value,
          offset: offset.value,
          sidx: sidx.value,
          sord: sord.value,
        },
      });
      reviewList.value = res.data.content;
      //把content里面的id取出来
      reviewAllId.value = res.data.content.map((item: { id: string }) => item.id);
      console.log(reviewAllId.value);
      return;
    }
    setReviewActive.value = val;
    // 设置待审核列表
    reviewList.value = reviewAllList.value.filter((item) => {
      return item.state == "1";
    });
    console.log(userState.value);
  }
  // 点击已审核
  else if (val == 2) {
    fs.value = "1";
    isShow.value = false;
    setAwaitActive.value = val;
    // 如果是管理员身份
    if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin")) {
      // 设置高亮
      setReviewActive.value = val;
      // 执行获取审核列表函数
      const res = await getReviewList({
        fs: fs.value,
        pageVo: {
          limit: limit.value,
          offset: offset.value,
          sidx: sidx.value,
          sord: sord.value,
        },
      });
      reviewList.value = res.data.content;
      return;
    }
    // 设置已审核列表
    reviewList.value = reviewAllList.value.filter((item) => {
      return item.state == "2";
    });
    setReviewActive.value = val;
  }
};
</script>

<template>
  <view class="box">
    <view class="reviewOption">
      <view
        class="reviewing"
        :class="{ active: setReviewActive == 1 }"
        @click="changeReviewState(1)"
        >待审核</view
      >
      <view
        class="reviewed"
        :class="{ active: setReviewActive == 2 }"
        @click="changeReviewState(2)"
        >已审核</view
      >
    </view>
    <scroll-view scroll-y class="scrollY" :class="{ translate: setReviewActive == 2 }">
      <view class="shenhe">
        <view class="card" v-for="item in reviewList" @click="onClick(item.id)">
          <view class="tittle">
            <view class="main" :class="{ await: setAwaitActive == 1 }">{{
              setAwaitActive == 1 ? "待审核" : "已审核"
            }}</view>
            <view class="vice">工号：{{ item.account }}</view>
            <view class="vice">组织：{{ outOrgName(item.orgId) }}</view>
          </view>
          <view class="extra">申请人：{{ item.name }}</view>
        </view>
      </view>
    </scroll-view>
    <view class="reviewAll">
      <button type="primary" @click="reviewAll" v-if="isAdmin === true && isShow == true">
        一键审核121
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  .reviewOption {
    height: 8vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 90vw;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .reviewing {
      width: 50%;
      height: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: larger;
      color: #3a3a3a;
    }

    .reviewed {
      width: 50%;
      height: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: larger;
      color: #3a3a3a;
    }

    .active {
      border-bottom: 2rpx solid #3a3a3a;
    }
  }

  .scrollY {
    overflow-y: auto;
    height: 82vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .shenhe {
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      .card {
        left: 0;
        right: 0;
        width: 90vw;
        height: 30vw;
        box-shadow: 0rpx 0rpx 5rpx 2rpx darkgrey;
        margin: 3vw auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 20rpx;

        .tittle {
          height: 80%;
          width: 55%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-direction: column;
          margin-left: 50rpx;

          .main {
            font-size: larger;
            color: #3a3a3a;
          }

          .await {
            color: red;
          }

          .vice {
            color: #909399;
            font-size: small;
          }
        }

        .extra {
          margin-right: 50rpx;
          white-space: nowrap;
        }
      }
    }
  }
  .translate {
    height: 90vh;
  }

  .reviewAll {
    position: absolute;
    width: 90vw;
    height: 15vw;
    bottom: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
  }
}
</style>
