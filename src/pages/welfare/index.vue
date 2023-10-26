<script lang="ts" setup>
import NewsList from "@/components/NewsList.vue";
import TabBar from "@/components/TabBar.vue";
import { ref, computed } from "vue";
import { welfareData } from "@/utils/index";
import type { listData } from "@/types/news";
import { getUnactivityListApi, type activityItem } from "@/services/unionActivity";
import { onShow } from "@dcloudio/uni-app";
import { baseURL } from "@/utils/http";

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
// 定义活动总项数
const totalNum = ref()
const onClick = async (id: string) => {
  activeTag.value = id;
  console.log(id);
  pageNum.value = 1;
  activityStatus.value = activeTag.value;
  // 默认显示第一页未开始活动列表
  const res = await getUnactivityListApi(pageNum.value, activityStatus.value);
  console.log(res.rows);
  activityList.value = res.rows
  totalNum.value = res.total
  scrollTop.value = 0
  console.log(scrollTop.value)

};
const scroll = () => {
  console.log(1);
};
const loadingText = ref()
const loadingStatus = ref(false);
const onScrollLower = async () => {
  console.log('触底了')
  if (!activityList.value) return uni.showToast({ title: '列表不存在' })
  if (activityList.value?.length >= totalNum.value) {
    loadingStatus.value = true;
    loadingText.value = '没有更多数据了'
    return
  }
  loadingText.value='正在加载'
  loadingStatus.value = true;
  pageNum.value++
  const res = await getUnactivityListApi(pageNum.value, activityStatus.value);
  activityList.value.push(...res.rows as Array<activityItem>)
}
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
// 优化显示
const truncateString =(str:any, maxLength: number )=>{
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}
// 点击查看活动
const viewDetail = (id: string) => {
  uni.navigateTo({
    // url: "/subpackages/hotel/recuperationDetail",
    url: "/subpackages/hotel/recuperationDetail" + "?id=" + id,
  });
};
onShow(async () => {
  console.log(4121)
  pageNum.value = 1;
  activityStatus.value = activeTag.value;
  // 默认显示第一页未开始活动列表
  const res = await getUnactivityListApi(pageNum.value, activityStatus.value);
  console.log(res.rows);
  activityList.value = res.rows
  totalNum.value = res.total

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
      :scroll-top="scrollTop"
      @scroll="scroll"
      lower-threshold="80"
      @scrolltolower="onScrollLower"
    >
      <view
        class="welfareItem"
        v-for="item in activityList"
        :key="item.id"
        @click="viewDetail(item.id)"
      >
        <view class="left">
          <image
            class="img"
            :src="
              baseURL +
              '/dbylAndKnbf/sltPath.interface?url=' +
              item.imgList[item.imgList.length - 1].path
            "
            mode="scaleToFill"
            v-if="item.imgList[item.imgList.length - 1]"
          />
        </view>
        <view class="right">
          <view class="title">{{ truncateString(item.title, 28) }} </view>
          <view class="bottom">
            <view class="address">地址：{{ truncateString(item.address, 6) }} </view>
            <view class="total"
              >总人数：{{ truncateString(item.participantsNumber, 4) }}
            </view>
          </view>
        </view>
      </view>
      <view class="toast" v-if="loadingStatus"> 没有更多了~~~ </view>
    </scroll-view>
  </view>
  <TabBar :current-page="3" />
</template>

<style lang="scss" scoped>
.welfare {
  display: flex;
  flex-direction: column;

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

    .welfareItem {
      left: 0;
      right: 0;
      margin: 2vh auto;
      width: 95vw;
      height: 16vh;
      border-radius: 3vw;
      background-color: white;
      display: flex;
      overflow: hidden;

      &:last-child {
        margin-bottom: 3vw;
      }

      .left {
        width: 25vw;
        height: 25vw;
        display: flex;
        justify-content: center;
        align-items: center;

        .img {
          width: 20vw;
          height: 20vw;
          border-radius: 2vw;
        }
      }

      .right {
        width: 74vw;
        height: 25vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 2vw;
        }

        .bottom {
          width: 67vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2vw;
          font-size: small;
          color: #ccc;
          left: 0;
          right: 0;
          margin: 0 auto;
        }
      }
    }

    .toast {
      height: 12vw;
      display: flex;
      justify-content: center;
      align-items: space-between;
    }
  }
}
</style>
