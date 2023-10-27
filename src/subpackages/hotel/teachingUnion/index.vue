<script lang="ts" setup>
import { ref } from "vue";
const systemInfo = uni.getSystemInfoSync();
const submitAppList = ref([
  {
    src: "http://cloud.zhgn.cn:8092/cdgh/phone/index/renzheng.png",
    url: "/subpackages/hotel/writeProposal",
    name: "撰写提案",
    id: 1,
  },
  {
    src: "http://cloud.zhgn.cn:8092/cdgh/phone/index/shenling.png",
    url: "/subpackages/hotel/myProposal",
    name: "我的提案",
    id: 2,
  },
  {
    src: "http://cloud.zhgn.cn:8092/cdgh/phone/hotel/1-17.png",
    url: "/subpackages/hotel/sanYuReview",
    name: "邀我附议",
    id: 3,
  },
  {
    src: "http://cloud.zhgn.cn:8092/cdgh/phone/hotel/1-10.png",
    url: "/subpackages/hotel/thirtyYearsReview",
    name: "他人提案",
    id: 4,
  },
  {
    src: "http://cloud.zhgn.cn:8092/cdgh/phone/hotel/1-8.png",
    url: "/subpackages/hotel/provincialPersonReview",
    name: "提案汇总",
    id: 5,
  },
]);
const completeAppList = ref([
  {
    src: "http://cloud.zhgn.cn:8092/cdgh/phone/hotel/1-15.png",
    url: "/subpackages/hotel/provincialTeamReview",
    name: "领导审阅",
    id: 1,
  },
  {
    src: "http://cloud.zhgn.cn:8092/cdgh/phone/hotel/1-2.png",
    url: "/subpackages/hotel/difficultyHelper",
    name: "承办部门办理",
    id: 2,
  },
  {
    src: "http://cloud.zhgn.cn:8092/cdgh/phone/icon/1-10.png",
    url: "/subpackages/hotel/diseaseTreatment",
    name: "发给提案人",
    id: 3,
  },
  {
    src: "http://cloud.zhgn.cn:8092/cdgh/phone/icon/1-3.png",
    url: "/subpackages/hotel/legalAid",
    name: "待转交提案",
    id: 4,
  },
]);
// 测试专用
const ceshi = () => {
  console.log(systemInfo);
};
const onclick = (url: string) => {
  uni.navigateTo({
    url,
  });
};
</script>

<template>
  <view
    class="hotel"
    v-if="systemInfo.safeAreaInsets?.top"
    :style="{ paddingBottom: systemInfo.safeAreaInsets?.top + 50 + 'px' }"
  >
    <view class="mine">
      <view class="mineTittle">
        <view class="tittle">立案办理 </view>
      </view>
      <view class="appBox">
        <view
          class="app"
          v-for="item in submitAppList"
          :key="item.id"
          hover-class="navigator-hover"
          @click="onclick(item.url)"
        >
          <image class="appimg" :src="item.src" mode="scaleToFill" />
          <view class="apptext">{{ item.name }}</view>
        </view>
      </view>
    </view>
    <view class="all">
      <view class="tittle" @click="ceshi">提案管理</view>
      <view class="appBox">
        <view
          class="app"
          v-for="item in completeAppList"
          :key="item.id"
          hover-class="navigator-hover"
          @click="onclick(item.url)"
        >
          <image class="appimg" :src="item.src" mode="scaleToFill" />
          <view class="apptext">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.hotel {
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  .search {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80rpx;
    border-radius: 10rpx;

    .searchbar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 90%;
      height: 60rpx;
      color: #808080;
      background-color: white;
      border: 1px solid #e5e5e5;
      border-radius: 30rpx;

      .text {
        margin-left: 20rpx;
      }
    }
  }

  .mine {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    border-bottom: 12px solid #f1f1f1;

    .mineTittle {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tittle {
        font-size: large;
        font-weight: bold;
        margin: 30rpx 0 0 20rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .edit {
        margin: 30rpx 20rpx 0 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: medium;
        font-weight: 590;
      }
    }

    .appBox {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-top: 20rpx;

      .app {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 150rpx;
        height: 150rpx;
        margin: 15rpx 0;

        .appimg {
          width: 40%;
          height: 40%;
          background-color: #ffffff;
          border-radius: 10rpx;
        }

        .apptext {
          width: 100%;
          text-align: center;
          font-size: 23rpx;
          color: #666666;
        }
      }
    }
  }

  .all {
    display: flex;
    justify-content: space-around;
    flex-direction: column;

    .tittle {
      font-size: large;
      font-weight: bold;
      margin: 30rpx 0 0 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .appBox {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-top: 20rpx;

      .app {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 150rpx;
        height: 150rpx;
        margin: 15rpx 0;

        .appimg {
          width: 40%;
          height: 40%;
          border-radius: 10rpx;

          background-color: #ffffff;
        }

        .apptext {
          width: 100%;
          text-align: center;
          font-size: 23rpx;
          color: #666666;
        }
      }
    }
  }
}
</style>
