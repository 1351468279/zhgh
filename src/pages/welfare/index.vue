<script lang="ts" setup>
import NewsList from "@/components/NewsList.vue";
import TabBar from "@/components/TabBar.vue";
import { ref, computed } from "vue";
import { welfareData } from "@/utils/index";
import type { listData } from "@/types/news";
import { getUnactivityListApi, type activityItem } from "@/services/unionActivity";
import { onShow } from "@dcloudio/uni-app";

const systemInfo = uni.getSystemInfoSync();
const loadingBox = ref(false);
const lower = () => {
  console.log(111);
  loadingBox.value = true;
};

const scrollTop = ref(0);
const nav = ref();

const activeTag = ref("");
const welfareList = ref<listData[]>([]);
// 定义活动列表页数
const pageNum = ref();
// 定义活动状态
const activityStatus = ref();
// 定义活动列表
const activityList = ref<activityItem[]>();
const onClick = async (id: string) => {
  activeTag.value = id;
  console.log(id);
  pageNum.value = 1;
    activityStatus.value =  activeTag.value;
    // 默认显示第一页未开始活动列表
    const res = await getUnactivityListApi(pageNum.value, activityStatus.value);
    console.log(res.rows);
    activityList.value=res.rows
};
const scroll = () => {
  console.log(1);
};
const loadingStatus = ref(false);
const onScrollLower = () => {
  loadingStatus.value = true;
};
const listX = ref([
  {
    text: "全部",
    id: "",
  },
  {
    text: "可参与",
    id: "1",
  },
]);
onShow(async ()=>{
  pageNum.value = 1;
    activityStatus.value =  activeTag.value;
    // 默认显示第一页未开始活动列表
    const res = await getUnactivityListApi(pageNum.value, activityStatus.value);
    console.log(res.rows);
    activityList.value=res.rows
})
</script>

<template>
  <view class="welfare" :style="{ height: systemInfo?.windowHeight - 50 + 'px' }">
    <view class="activityOption">
      <view
        class="available"
        :class="{ active: activeTag == item.id }"
        @click="onClick(item.id)"
        v-for="(item, index) in listX"
        :key="item.id"
        >{{ item.text }}</view
      >
    </view>
    <scroll-view
      class="newsScrollTop"
      scroll-y
      refresher-enabled
      :scroll-top="scrollTop"
      @scroll="scroll"
      lower-threshold="80"
      @scrolltolower="onScrollLower"
    >
    </scroll-view>
  </view>
  <TabBar :current-page="3" />
</template>

<style lang="scss" scoped>
.welfare {
  display: flex;
  flex-direction: column;

  .welfareList {
    flex: 1;
  }

  .activityBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80rpx;
    background-color: white;
    width: 100%;

    .activityNum {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #949699;

      .text {
        font-size: 25rpx;
        color: #949699;
      }

      .num {
        color: #949699;

        font-size: 40rpx;
      }
    }

    .mineNum {
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        font-size: 25rpx;
        color: #949699;
      }

      .num {
        font-size: 40rpx;
        color: #949699;
      }

      .icon {
        font-size: 60rpx;
      }
    }
  }

  .activityOption {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 10vh;

    .available {
      width: 50%;
      font-size: 30rpx;
      text-align: center;
      line-height: 60rpx;
    }

    .total {
      width: 50%;
      font-size: 30rpx;
      text-align: center;
      line-height: 60rpx;
    }

    .active {
      font-size: large;
      font-weight: bold;
      border-bottom: 1px solid red;
    }
  }

  .newsScrollTop {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    background-color: #eeeeee;

    .newsItem {
      width: 100%;
      height: 200rpx;
      background-color: white;
      margin: 20rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .itemContent {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;

        .contentTittle {
          width: 100%;
          height: 40%;
          font-size: 30rpx;
          padding: 0 20rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
