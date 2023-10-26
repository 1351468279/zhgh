<script lang="ts" setup>
// 接收搜索框字符
import { getImage } from "@/services/applyRecuperation";
import { getReviewStatus } from "@/services/applyUnion";
import { getUnactivityListApi, type activityItem } from "@/services/unionActivity";
import { useMemberStore } from "@/store/modules/member";
import { baseURL } from "@/utils/http";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { getCurrentInstance, ref } from "vue";
const searchValue = ref("");
// 输入框防抖
let timer: any = null;
// 搜索框输入事件
const onInput = (e: any) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    console.log(e);
    // getSanYuList(getSanYuListParams.value).then((res) => {
    //   cardList.value = cardList.value.filter((item: any) =>
    //     item.name.includes(searchValue.value)
    //   );
    // });
  }, 1000);
};
// 竖向滑动条位置
const scrollTop = ref(0);
// 显示加载文字标记
const showLoading = ref(false);
// 触底事件
const onScrollTopLower = () => {
  console.log("触底了");
  showLoading.value = true;
};
// 点击查看活动
const viewDetail = (id: string) => {
  if (isAdmin.value) {
    console.log('管理员')
    return uni.navigateTo({
      animationType: 'pop-in',
      url: '/subpackages/hotel/applyRecuperation?id=' + id
    })
  }
  console.log('跳转')
  uni.navigateTo({
    // url: "/subpackages/hotel/recuperationDetail",
    url: "/subpackages/hotel/recuperationDetail" + "?id=" + id,
  });
};
// 点击发布活动
const publishActivity = () => {
  uni.navigateTo({
    url: "/subpackages/hotel/applyRecuperation",
  });
};
const activeId = ref(0);


const onClick = async (id: number) => {
  showLoading.value = false
  activeId.value = id;
  pageNum.value = 1;
  scrollTop.value = 0
  if(id==0){
    activityStatus.value = activeId.value;
    // 显示第一页所点击活动列表
    const res = await getUnactivityListApi(pageNum.value, 0);
    activityList.value=  res.rows
    console.log(activityList.value);
    return
  }else if(id==1){
    activityStatus.value = activeId.value;
    if(isAdmin.value){
      activityStatus.value = activeId.value;
    // 显示第一页所点击活动列表
    const res = await getUnactivityListApi(pageNum.value, activityStatus.value);
    activityList.value=  res.rows
    }
    else if(isUser.value){
      console.log('普通会员我参与的')
      activityStatus.value = activeId.value;
    // 显示第一页所点击活动列表
    const res = await getUnactivityListApi(pageNum.value, '');
    activityList.value=  res.rows?.filter( item =>  item.isJoin==0&&item.state==1 )
    console.log(activityList.value)
      return
    }
  }else{
    activityStatus.value = activeId.value;
    // 显示第一页所点击活动列表
    const res = await getUnactivityListApi(pageNum.value, activityStatus.value);
    activityList.value=  res.rows
    return
  }
};
// 接收管理员身份标识
const isAdmin = ref(false);
// 接收工会委员身份标识
const isCommissioner = ref(false);
// 接收工会管理员身份标识
const isGhAdmin = ref(false);
// 接收会员身份标识
const isUser = ref(false);
// 接收用户审核状态
const userState = ref();
const memberStore = useMemberStore();
// 列表数据源
const listTotalData = ref();
// 定义活动列表
const activityList = ref<activityItem[]>();
// 定义活动列表项总条数
const activityTotalNum = ref()
// 定义活动列表页数
const pageNum = ref();
// 定义活动状态
const activityStatus = ref();
// 获取图片
const getImageDetail = (path: string) => {
  getImage(path).then((res) => {
    return res
  })
}
var query = uni.createSelectorQuery();
// 获取left实例
const leftValue = ref()
// 优化显示
const truncateString = (str: any, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}
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
    activeId.value=0
    // 如果是管理员
    if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin") == true) {
      isAdmin.value = true;
      console.log("管理员");

      // 获取审核总列表,并默认显示待审核列表
      // 设置管理员横向选择表
      listTotalData.value = [
        { id: 0, name: "未开始" },
        { id: 1, name: "进行中" },
        { id: 2, name: "已结束" },
      ];
    }
    // 如果是工会委员
    else if (memberStore.profile?.userVo?.roleType?.includes("UnionMembers") == true) {
      isCommissioner.value = true;
      console.log("工会委员");
      // 获取审核总列表,并默认显示待审核列表
      // 设置工会委员横向选择表
      listTotalData.value = [
        { id: 0, name: "未开始" },
        { id: 1, name: "进行中" },
        { id: 2, name: "已结束" },
      ];
    }
    // 如果是工会管理员
    else if (memberStore.profile?.userVo?.roleType?.includes("ghAdmin") == true) {
      isGhAdmin.value = true;
      console.log("工会管理员");
      // 获取审核总列表,并默认显示待审核列表
      // 设置工会管理员横向选择表
      listTotalData.value = [
        { id: 0, name: "未开始" },
        { id: 1, name: "进行中" },
        { id: 2, name: "已结束" },
      ];
    }
    // 如果是普通会员
    else if (memberStore.profile?.userVo?.roleType?.includes("member") == true) {
      isUser.value = true;
      console.log("普通会员 ");
      // 获取审核总列表,并默认显示待审核列表
      // 设置普通会员横向选择表
      listTotalData.value = [
        { id: 0, name: "即将开始" },
        { id: 1, name: "我参与的" },
        { id: 2, name: "已结束" },
      ];
    }
    pageNum.value = 1;
    activityStatus.value = 0;
    // 默认显示第一页未开始活动列表
    const res = await getUnactivityListApi(pageNum.value, activityStatus.value);
    console.log(res.rows);
    activityList.value = res.rows
    // if(activityList.value){
    //   console.log(2121)
    // console.log(getImageDetail(activityList.value[1].imgList[0].path))
    //  const res=await getImage(activityList.value[1].imgList[0].path)
    //  console.log(res)
  }
  // getSanYuListParams.value.pageVo.offset = 0;
  // 默认显示待上报列表和显示第一页数据
  // await getSanYuList(getSanYuListParams.value);
  return;
}
);
</script>

<template>
  <view class="recuperation">
    <view class="category">
      <view
        class="cateforyList"
        :class="{ active: activeId == item.id }"
        v-for="item in listTotalData"
        @click="onClick(item.id)"
      >
        {{ item.name }}
      </view>
    </view>
    <scroll-view
      class="scrolly"
      scroll-y
      :scroll-top="scrollTop"
      @scrolltolower="onScrollTopLower"
    >
      <view
        class="recuperationCard"
        v-for="items in activityList"
        :key="items.id"
        @click="viewDetail(items.id)"
      >
        <!-- <view class="state"> 进行中 </view> -->
        <view class="left" id="ceshi" :ref="leftValue">
          <image
            class="img"
            :src="
              baseURL +
              '/dbylAndKnbf/sltPath.interface?url=' +
              items.imgList[items.imgList.length - 1].path
            "
            mode="aspectFill"
            v-if="items.imgList[items.imgList.length - 1]"
          />
        </view>
        <view class="right">
          <view class="top">
            <view class="tittle">{{ truncateString(items.title, 28) }}</view>
          </view>
          <view class="down">
            <view class="area">地址：{{ truncateString(items.address, 6) }} </view>
            <view class="time"
              >总人数：{{ truncateString(items.participantsNumber, 4) }}
            </view>
          </view>
        </view>
      </view>
      <view class="loadingtittle">
        <view v-if="showLoading"> 没有更多数据了~~~</view>
      </view>
    </scroll-view>
    <view class="publishItem" @click="publishActivity" v-if="isAdmin"> + </view>
  </view>
</template>

<style lang="scss" scoped>
.recuperation {
  height: 100vh;
  background-color: #eeeeee;
  position: relative;

  .category {
    width: calc(90vw);
    height: calc(12vw);
    display: flex;
    left: 0;
    right: 0;
    margin: auto;
    align-items: center;

    .cateforyList {
      margin: 20rpx;
    }

    .active {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .search {
    width: calc(90vw);
  }

  .scrolly {
    height: calc(88vh);
    overflow-y: auto;

    .recuperationCard {
      left: 0;
      right: 0;
      margin: auto;
      margin-bottom: 20rpx;
      width: calc(90vw);
      // background-color: skyblue;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 20rpx;
      background-color: white;
      position: relative;

      .state {
        // filter: grayscale(100%);
        position: absolute;
        top: 0;
        left: 0;
        background-color: #d2f2d5;
        border-radius: 8rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #17ab64;
        font: 14px Arial;
      }

      .left {
        width: 25vw;
        height: 25vw;
        display: flex;
        justify-content: center;
        align-items: center;

        .img {
          margin-left: 20rpx;
          width: calc(20vw);
          height: calc(20vw);
          border-radius: 2vw;
        }
      }

      .right {
        width: calc(80vw);
        display: flex;
        flex-direction: column;

        .top {
          padding: 20rpx;
          display: flex;
          justify-content: space-between;
        }

        .down {
          padding: 20rpx;
          display: flex;
          justify-content: space-between;

          .area {
            color: #ccc;
            font: 14px Arial;
          }

          .time {
            color: #ccc;
            font: 14px Arial;
          }
        }
      }
    }

    .loadingtittle {
      margin: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .publishItem {
    position: absolute;
    bottom: 180rpx;
    right: 60rpx;
    width: 100rpx;
    height: 100rpx;
    border-radius: 40%;
    background-color: rgba(237, 64, 52, 0.8);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
