<script lang="ts" setup>
import ReviewCard from "@/components/ReviewCard.vue";
import { getReviewStatus } from "@/services/applyUnion";
import { useApplySanYuStore } from "@/store/index";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useMemberStore } from "@/store/index";
import type { UniCardOnClick } from "@uni-helper/uni-ui-types";
import {
  checkFile,
  downloadFile,
  getSanYuListApi,
  getUserInfo,
  reportSanYu,
} from "@/services/applySanYu";
import type { applySanYuListType } from "@/types/hotel";
import type { getSanYuListType } from "@/types/sanYu";
const memberStore = useMemberStore();
const sanYuStore = useApplySanYuStore();

// const reviewAll = () => {
//   // 确认是否全部上报
//   uni.showModal({
//     title: '提示',
//     content: '是否全部上报,上报后不可修改',
//     success: function (res) {
//       if (res.confirm) {
//         // 确认全部上报
//         sanYuStore.applier.forEach(async (item) => {
//           // if (item.status == '0') {
//           //   await uni.showToast({
//           //     title: '上报成功'
//           //   });
//           //   item.status = '2'
//           // }
//         })
//       } else if (res.cancel) {
//         console.log('用户点击取消');
//       }
//     }
//   })
//   // for (let index = 0; index < sanYuStore.applier.length; index++) {
//   //   sanYuStore.applier[index].status = '2'
//   // }
// }

const onClick = (id: string) => {
  uni.navigateTo({
    url: "/subpackages/hotel/applySanYu" + "?id=" + id,
  });
};
// 点击填写申请
const applySanYu = () => {
  uni.navigateTo({
    url: "/subpackages/hotel/applySanYu",
  });
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
// 点击下载
const downLoad = async (id: string) => {
  // 查看用户是否有上传文件
  const checkFileRes = await checkFile(id);
  if (checkFileRes.flag == "error") {
    uni.showToast({
      title: "该用户未上传文件",
      icon: "none",
    });
    return;
  }
  console.log("--------");
  await downloadFile(id).then((data) => {
    const fs = uni.getFileSystemManager();
    const filePath = wx.env.USER_DATA_PATH + "/" + Date.now() + ".pdf"; // wx.env.USER_DATA_PATH 为微信提供的保存文件路径
    fs.writeFile({
      filePath,
      data: uni.base64ToArrayBuffer((data.body as any).replace(/[\r\n]/g, "")), // 将 base64 转为 arrayuffer
      success(res) {
        uni.openDocument({
          showMenu: true,
          fileType: "pdf",
          filePath,
          success: function (res) {
            console.log("打开文档成功");
          },
        });
      },
      fail(err) {
        console.log("错误", err);
      },
    });
  });
};
// 点击上报或者审核
const report = async (id: string) => {
  console.log(id);
  const reportRes = await reportSanYu(id);
  if (reportRes.body == 1) {
    cardList.value = cardList.value.filter((item: any) => item.id != id);
    uni.showToast({
      title: "成功",
      icon: "none",
    });
  } else {
    uni.showToast({
      title: "失败",
      icon: "none",
    });
  }
  console.log(reportRes);
};
/* 以下是横向滑动栏信息 */
// 横向滑动条位置
const scrollLeft = ref(0);
// 滚动事件
const onScrollLeft = (e: any) => {
  console.log(e);
};
// active栏高亮
const activeValue = ref(0);
// 列表数据源
const listTotalData = ref();
// 获取系统信息
const systemInfo = uni.getSystemInfoSync();
// 适当时候隐藏report
const reportShow = ref(true);
// 适当隐藏填写申请按钮
const applyShow = ref(true);
// 点击栏
const handoff = (id: number, index: number) => {
  if (id == 0) {
    getSanYuListParams.value.pageVo.offset = 0;
    reportShow.value = true;
    isUser.value = true;
  } else {
    getSanYuListParams.value.pageVo.offset = 0;
    reportShow.value = false;
    // applyShow.value = false
    isUser.value = false;
  }
  activeValue.value = id;
  // 计算需要滚动的距离
  const itemWidth = systemInfo.windowWidth * 0.2; // 假设每个元素宽度为屏幕宽度的 20%
  const scrollDistance = index * itemWidth - systemInfo.windowWidth * 0.4; // 滚动到元素中间位置
  scrollLeft.value = scrollDistance < 0 ? 0 : scrollDistance;
  getSanYuListParams.value.stuEducation.fs = id;
  cardList.value = [];
  getSanYuList(getSanYuListParams.value);
};
/* 以下是竖向滑动栏信息 */
// 竖向滑动条位置
const scrollTop = ref(0);
// 滚动事件
const onScrollTop = (e: any) => {
  console.log(e);
};
// 滚动到底部事件
const onScrollTopLower = async () => {
  console.log("滚动到底部 了");
  isLoading.value = true;
  if (cardList.value.length < total.value) {
    isLoading.value = false;
    console.log("页数加1");
    getSanYuListParams.value.pageVo.offset = cardList.value.length;
    // offset.value++
    const res = await getSanYuListApi(getSanYuListParams.value);
    console.log("cs", res.body);
    cardList.value.push(...res.body?.rows!);
    // await getSanYuList(getSanYuListParams.value)
    console.log("到底了");
  } else {
    loadingText.value = "没有更多了~~~";
  }
};

/* 接收纵向列表项 */
const cardList = ref<any>([]);
// 获取三育人列表总条数
const total = ref(0);
// 定义获取三育人列表请求分页参数
const getSanYuListParams = ref<getSanYuListType>({
  stuEducation: {
    fs: 0,
  },
  pageVo: {
    limit: 5,
    offset: 0,
    sidx: "id",
    sord: "desc",
  },
});
// 封装分页列表函数
const getSanYuList = async (data: getSanYuListType) => {
  const res = await getSanYuListApi(data);
  console.log("onShow");
  console.log(res.body);
  cardList.value = (res.body as any).rows;
  total.value = (res.body as any).total;
  console.log(cardList.value);
  console.log("页数相除");
  console.log(total.value / 5);
};
// 定义触底加载状态
const isLoading = ref(false);
//  触底加载显示文字
const loadingText = ref("正在加载中...");
// 接收搜索框字符
const searchValue = ref("");
// 输入框防抖
let timer: any = null;
// 搜索框输入事件
const onInput = (e: any) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(e);
    cardList.value = [];
    getSanYuList(getSanYuListParams.value).then((res) => {
      cardList.value = cardList.value.filter((item: any) =>
        item.name.includes(searchValue.value)
      );
    });
  }, 1000);
};
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
    // 如果是管理员
    if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin") == true) {
      isAdmin.value = true;
      console.log("管理员");

      // 获取审核总列表,并默认显示待审核列表
      // 设置管理员横向选择表
      listTotalData.value = [
        { id: 0, name: "待审核" },
        { id: 1, name: "已审核" },
      ];
    }
    // 如果是工会委员
    else if (memberStore.profile?.userVo?.roleType?.includes("UnionMembers") == true) {
      isCommissioner.value = true;
      console.log("工会委员");
      // 获取审核总列表,并默认显示待审核列表
      // 设置工会委员横向选择表
      listTotalData.value = [
        { id: 0, name: "待审核" },
        { id: 1, name: "已审核" },
      ];
    }
    // 如果是工会管理员
    else if (memberStore.profile?.userVo?.roleType?.includes("ghAdmin") == true) {
      isGhAdmin.value = true;
      console.log("工会管理员");
      // 获取审核总列表,并默认显示待审核列表
      // 设置工会管理员横向选择表
      listTotalData.value = [
        { id: 0, name: "待审核" },
        { id: 1, name: "已审核" },
      ];
    }
    // 如果是普通会员
    else if (memberStore.profile?.userVo?.roleType?.includes("member") == true) {
      isUser.value = true;
      console.log("普通会员 ");
      // 获取审核总列表,并默认显示待审核列表
      // 设置普通会员横向选择表
      listTotalData.value = [
        { id: 0, name: "待上报" },
        { id: 1, name: "已上报" },
      ];
    }
    getSanYuListParams.value.pageVo.offset = 0;
    // 默认显示待上报列表和显示第一页数据
    await getSanYuList(getSanYuListParams.value);
    return;
  }
});
</script>
<template>
  <view
    class="box"
    :style="{
      height: isUser
        ? systemInfo.windowHeight - 50 + 'px'
        : systemInfo.windowHeight - 10 + 'px',
    }"
  >
    <scroll-view
      class="scrolly"
      scroll-y
      :scroll-top="scrollTop"
      @scroll="onScrollTop"
      lower-threshold="10"
      @scrolltolower="onScrollTopLower"
    >
      <view class="shenhe">
        <!-- 纵向栏 -->
        <view
          class="card"
          v-for="(item, index) in cardList"
          :key="item.id"
          @click.stop="onClick(item.id)"
        >
          <view class="tittle">
            <!-- <view class="main" :class="{ await: item.process == '0' }">{{ item.process == '2' ? '已上报' : '未上报' }}
            </view> -->
            <view class="vice">职称：{{ item.title }}</view>
            <view class="vice">工作单位：{{ item.unit }}</view>
            <view class="applier"> 申请人：{{ item.name }} </view>
          </view>
          <view class="extra">
            <view class="funbtn" v-if="reportShow"
              ><button type="primary" size="mini" @click.stop="report(item.id)">
                {{ isUser ? "上报" : "审核" }}
              </button></view
            >
            <view class="funbtn"
              ><button type="primary" size="mini" @click.stop="downLoad(item.id)">
                预览文件
              </button>
            </view>
          </view>
        </view>
        <view class="tittle" v-if="isLoading">{{ loadingText }}</view>
      </view>
    </scroll-view>
  </view>
  <view class="reviewAll">
    <button type="default" @click.stop="applySanYu" v-if="isUser">填写申请</button>
  </view>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .scrollx {
    white-space: nowrap;
    width: 100%;

    .newsItem {
      display: inline-block;
      width: 20%;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      font-size: 28rpx;
      color: gray;
      position: relative;
    }

    .active {
      color: black;
      font-weight: bold;
      font-size: 35rpx;
      border-bottom: 3px solid #ff0000;
    }
  }

  .scrolly {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    background-color: white;

    .shenhe {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;

      .card {
        width: 90%;
        height: 200rpx;
        box-shadow: 0rpx 0rpx 5rpx 2rpx darkgrey;
        margin: 20rpx;
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
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          flex-direction: column;

          .funbtn {
            display: flex;
            justify-content: right;
            margin-bottom: 5rpx;
          }
        }
      }
    }
  }
}

.reviewAll {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
