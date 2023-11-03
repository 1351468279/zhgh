<script lang="ts" setup>
import { ref, computed } from "vue";
import { onHide, onShow, onUnload } from "@dcloudio/uni-app";
import { getReviewStatus } from "@/services/applyUnion";
import { useMemberStore } from "@/store/index";
import {
  getTogetherEvaluationApi,
  getinviteDataByAdmin,
  getinviteDataByOther,
  inviteotherEvaluateApi,
} from "@/services/quantitativeAssessment";
import type {
  getTogethorEvaluator,
  myDataResItemsType,
  myDataResType,
} from "@/types/quantitativeAssessment";
import type { SwiperOnChangeEvent } from "@uni-helper/uni-app-types";
import type {
  UniEasyinputOnBlurEvent,
  UniEasyinputOnFocusEvent,
  UniEasyinputOnInput,
} from "@uni-helper/uni-ui-types";
const memberStore = useMemberStore();
const self_state = ref(1);
const peer_state = ref(0);
const organization_state = ref();
// 接收用户审核状态
const userState = ref();
// 接收会员身份标识
const isUser = ref(false);
// 接收会话框实例
const popup = ref();
// 点击自评
const onClick = (val: number) => {
  uni.navigateTo({
    url: "/subpackages/hotel/selfAssessment/index?id=" + val,
  });
};
// 他人邀请我的评价总条数
const inviteDataTotal = ref();
// 接收需要评价的列表
const evauateList = ref<myDataResType>();
// 接收下拉框
const self_assessmentParams = ref();

const activeId = ref(1);

// 接收个人评论信息
const personEvaluate = ref();

// 滚动条位置
const scrollY = ref(0);
// 发生滚动
const onScroll = () => {
  console.log("发生滚动");
};
// 获取评论列表
const personalEvaluateList = ref<myDataResType>();
const togetherEvaluateList = ref<myDataResType>();
const personalEvaluate = (obj: myDataResItemsType) => {
  let item = JSON.stringify(obj);
  console.log("654654165");
  uni.navigateTo({
    url: "/subpackages/hotel/selfAssessment/index?item=" + item,
  });
};
const togetherEvalyate = (obj: myDataResItemsType) => {
  let item = JSON.stringify(obj);
  uni.navigateTo({
    url: "/subpackages/hotel/selfAssessment/index?item=" + item + "&id=1",
  });
};

// 分类栏高亮
const isShowCatagory = ref(0);
//
const catagoryList = ref([
  {
    text: "自评",
    id: 0,
  },
  {
    text: "互评",
    id: 1,
  },
  {
    text: "邀评",
    id: 2,
  },
]);
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
const isShow = ref(false);
const showDialog = () => {
  console.log("ok");
  isShow.value = false;
};
// 定义待邀请人员列表
const invitingList = ref<string[]>([]);
// 点击添加实现多选
const onCheck = (id: string) => {
  if (invitingList.value.includes(id)) {
    invitingList.value = invitingList.value.filter((i) => i != id);
    return console.log(invitingList.value);
  }
  console.log(id);
  invitingList.value.push(id);
  console.log(invitingList.value);
};

// 如果待邀请人员列表里面有这个id，返回true
const filterTrues = (id: string) => {
  return invitingList.value.some((i) => i == id);
};
// 接收互评人员
const togetherEvaluator = ref<getTogethorEvaluator>();
// 全选
const selectAll = () => {
  if (!togetherEvaluator.value) return uni.showToast({ title: "数据不存在" });
  if (togetherEvaluator.value?.every((i) => invitingList.value.includes(i.id))) {
    return (invitingList.value = []);
  }
  invitingList.value = togetherEvaluator.value.map((i) => i.id);
  console.log(invitingList.value);
};
// 如果待邀请人员列表里面有所有互评人员的id,返回true
const filterTruesAll = () => {
  return togetherEvaluator.value?.every((i) => invitingList.value.includes(i.id));
};
// 接收id
const itemId = ref("");
// 接收消息id
const evaluateMessageId = ref("");
// 点击邀评
const inviteEvaluete = async (id: string, messageId: string) => {
  itemId.value = id;
  evaluateMessageId.value = messageId;
  console.log("邀评");
  isShow.value = true;
  // 获取互评人员
  const res = await getTogetherEvaluationApi(itemId.value);
  console.log(res.body?.memberBean);
  togetherEvaluator.value = res.body?.userList;
};

// 定义互评人列表的显示与否
const isShowTogetherList = ref(true);
const onFocus = (e: UniEasyinputOnFocusEvent) => {
  console.log("聚焦");
  isShowTogetherList.value = true;
};
// 输入框失焦
const onBlur = (e: UniEasyinputOnBlurEvent) => {
  console.log("失焦");
  isShowTogetherList.value = false;
};
const scrollCheckY = ref(0);
const onCheckScroll = () => {
  console.log("在滚动");
};
let timer: any;
// 输入事件
const onInput = async (e: any) => {
  if (timer) {
    clearInterval(timer);
  }
  timer = setTimeout(async () => {
    togetherEvaluator.value = (
      await getTogetherEvaluationApi(itemId.value)
    ).body?.userList?.filter((i) => i.name.includes(e));
  }, 500);
};
// 点击取消
const cancel = () => {
  isShow.value = false;
};
// 点击确认
const confirm = async () => {
  const invitingParams = invitingList.value.map(async (i) => {
    return await inviteotherEvaluateApi({
      memberId: evaluateMessageId.value,
      otherId: i,
    });
  });
  // invitingParams
  // for (let item of invitingParams) {
  //   inviteotherEvaluateApi(item);
  // }
  uni.showToast({
    title: "成功",
    icon: "success",
  });
  isShow.value = false;
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
    console.log("huiyuan");
    // 如果是普通会员
    if (memberStore.profile?.userVo?.roleType?.includes("member") == true) {
      isUser.value = true;
      console.log("普通会员 ");
      personalEvaluateList.value = (await getinviteDataByAdmin()).rows;
      togetherEvaluateList.value = (await getinviteDataByOther()).rows;
      personalEvaluateList.value = (await getinviteDataByAdmin()).rows;
    }
    return;
  }
});
</script>

<template>
  <view class="mainBox">
    <view class="dialog" v-if="isShow">
      <view class="dialogBox">
        <view class="title"> 选择互评人 </view>
        <view class="wrap">
          <uni-easyinput
            class="inputBox"
            type="text"
            placeholder="请输入互评人姓名关键字"
            @input="onInput"
          />
          <view class="checkBoxList">
            <scroll-view
              class="scrollCheck"
              scroll-y
              :scroll-top="scrollCheckY"
              @scroll="onCheckScroll"
            >
              <view class="scrollCheckCategory">
                <view class="yuan" @click="selectAll">
                  <view class="round" :class="{ active: filterTruesAll() }"></view>
                  <text>全选</text>
                </view>
                <view class="name">姓名 </view>
                <view class="address"> 所属工会</view>
              </view>
              <view
                class="scrollCheckItem"
                v-for="item in togetherEvaluator"
                :key="item.id"
                @click="onCheck(item.id)"
              >
                <view class="yuan">
                  <view class="round" :class="{ active: filterTrues(item.id) }"> </view>
                </view>
                <view class="name"> {{ item.name }}</view>
                <view class="address">{{ item.orgid }} </view>
              </view>
            </scroll-view>
          </view>
          <view class="functionItem">
            <view class="cancel" @click="cancel">取消 </view>
            <view class="confirm" @click="confirm">确认 </view>
          </view>
        </view>
      </view>
    </view>
    <view class="wrape">
      <view class="evaluateCatagory">
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
        :current="currentTab"
        :disable-touch="false"
        @change="switchTab"
      >
        <swiper-item class="">
          <scroll-view
            class="scrollY"
            scroll-y
            :scroll-top="scrollY"
            scroll-with-animation
            @scroll="onScroll"
          >
            <view class="cardItem" v-for="item in personalEvaluateList" :key="item.id">
              <view class="left">
                <image
                  class="img"
                  src="https://cloud.zhgn.cn:8092/cdgh/static/phone/icon/1-3.png"
                  mode="aspectFit"
                />
              </view>
              <view class="right">
                <view class="assessTheme"> {{ item.messageTitle }} </view>
                <view class="bottom">
                  <view class="personalEvaluate" @click="personalEvaluate(item)">
                    自评
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="">
          <scroll-view
            class="scrollY"
            scroll-y
            :scroll-top="scrollY"
            scroll-with-animation
            @scroll="onScroll"
          >
            <view class="cardItem" v-for="item in togetherEvaluateList" :key="item.id">
              <view class="left">
                <image
                  class="img"
                  src="https://cloud.zhgn.cn:8092/cdgh/static/phone/icon/1-3.png"
                  mode="aspectFit"
                />
              </view>
              <view class="right">
                <view class="assessTheme"> {{ item.messageTitle }} </view>
                <view class="bottom">
                  <view class="togetherEvaluate" @click="togetherEvalyate(item)">
                    互评
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="">
          <scroll-view
            class="scrollY"
            scroll-y
            :scroll-top="scrollY"
            scroll-with-animation
            @scroll="onScroll"
          >
            <view class="cardItem" v-for="item in personalEvaluateList" :key="item.id">
              <view class="left">
                <image
                  class="img"
                  src="https://cloud.zhgn.cn:8092/cdgh/static/phone/icon/1-3.png"
                  mode="aspectFit"
                />
              </view>
              <view class="right">
                <view class="assessTheme"> {{ item.messageTitle }} </view>
                <view class="bottom">
                  <view class="inviteEvaluate" @click="inviteEvaluete(item.id, item.id)">
                    邀评
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* Project id 4301659 */
  /* Color fonts */
  src: url("//at.alicdn.com/t/c/font_4301659_7tsiyo597yh.woff2?t=1698216460151")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_4301659_7tsiyo597yh.woff?t=1698216460151")
      format("woff"),
    url("//at.alicdn.com/t/c/font_4301659_7tsiyo597yh.ttf?t=1698216460151")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-youxiang:before {
  content: "\e6a1";
}

@keyframes scale {
  /*开始状态*/
  0% {
    box-shadow: 0 0 0px 2px #d81e06;
  }
  20% {
    box-shadow: 0 0 4px 2px #d81e06;
  }
  40% {
    box-shadow: 0 0 8px 2px #d81e06;
  }
  60% {
    box-shadow: 0 0 12px 2px #d81e06;
  }
  80% {
    box-shadow: 0 0 16px 2px #d81e06;
  }
  100% {
    box-shadow: 0 0 20px 2px #d81e06;
  }
}
.mainBox {
  width: 100vw;
  height: 97vh;
  background-color: #fff;
  position: relative;
  .wrape {
    width: 100vw;
    height: 90vh;
    left: 0;
    right: 0;
    top: 0;
    right: 0;
    margin: auto;
    margin-top: 2vh;

    .evaluateCatagory {
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
    .scrollY {
      right: 0;
      left: 0;
      margin: 0 auto;
      overflow-y: auto;
      width: 90vw;
      max-height: 88vh;
      // background-color: skyblue;
      border: 1px solid #ccc;
      border-radius: 2vw;
      .cardItem {
        right: 0;
        left: 0;
        margin: 0 auto;
        width: 90vw;
        height: 11vh;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        &:last-child {
          .right {
            border-bottom: none;
          }
        }
        .left {
          width: 11vh;
          height: 11vh;
          display: flex;
          justify-content: center;
          align-items: center;
          .img {
            width: 8vh;
            height: 8vh;
          }
        }
        .right {
          margin-right: 2vw;
          width: 72vw;
          height: 11vh;
          border-bottom: 1px solid #ccc;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .assessTheme {
            font-size: 4vw;
            font-weight: bold;
            color: #d81e06;
          }
          .bottom {
            display: flex;
            width: 72vw;
            justify-content: space-around;
            .personalEvaluate {
              width: 8vw;
              height: 8vw;
              font-size: 4vw;
              border-radius: 50%;
              border: 1px solid;
              color: #2e2e2e;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .togetherEvaluate {
              width: 8vw;
              height: 8vw;
              border: 1px solid #2e2e2e;
              font-size: 4vw;

              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              color: #2e2e2e;
            }
            .inviteEvaluate {
              width: 8vw;
              height: 8vw;
              border: 1px solid #2e2e2e;
              font-size: 4vw;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              color: #2e2e2e;
            }
          }
        }
      }
    }
    .swiperList {
      height: 89vh;
    }
  }
  .dialog {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 98vh;
    background: rgba(102, 102, 102, 0.5);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    .dialogBox {
      width: 70vw;
      height: 70vh;
      background-color: #fff;
      padding: 2vw;
      border-radius: 2vw;
      .title {
        font-size: 4vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
      }
      .wrap {
        width: 60vw;
        height: 60vh;
        left: 0;
        right: 0;
        margin: 0 auto;
        margin-top: 2vh;
        // background-color: skyblue;
        border-radius: 2vw;
        .inputBox {
          width: 60vw;
          height: 1vh;
        }
        .checkBoxList {
          width: 59vw;
          height: 48vh;
          border: 1px solid #ebeef5;
          border-top: none;
          background-color: white;
          // border-radius: 1vw;
          border-radius: 0 1vw 1vw 0;
          .scrollCheck {
            width: 59.5vw;
            max-height: 48vh;
            overflow-y: auto;
            .scrollCheckCategory {
              margin-top: 2vw;
              display: grid;
              grid-template-columns: 1fr 1fr 2fr;
              color: #909399;
              font-size: 3.5vw;
              font-weight: 700;
              .yuan {
                display: flex;
                justify-content: center;
                align-items: center;
                .round {
                  width: 3vw;
                  height: 3vw;
                  border: 1px solid #dcdfe6;
                  border-radius: 50%;
                  &::after {
                    box-sizing: content-box;
                    content: "";
                    border: 1px solid #fff;
                    border-left: 0;
                    border-top: 0;
                    height: 7px;
                    left: 4px;
                    position: absolute;
                    top: 1px;
                    transform: rotate(45deg) scaleY(0);
                    width: 3px;
                    transition: transform 0.15s ease-in 0.05s;
                    transform-origin: center;
                  }
                }
                .active {
                  border: 1px solid #f78989;
                  background-color: #f78989;
                  position: relative;
                  &::after {
                    transform: rotate(45deg) scaleY(1);
                  }
                }
              }
              .name {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .address {
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            .scrollCheckItem {
              left: 0;
              right: 0;
              margin: 0 auto;
              width: 55vw;
              height: 5vh;
              display: grid;
              grid-template-columns: 1fr 1fr 2fr;
              border-bottom: 1px solid #ebeef5;
              color: #606266;
              font-size: 3vw;
              &:last-child {
                border-bottom: none;
              }
              .yuan {
                display: flex;
                justify-content: center;
                align-items: center;
                .round {
                  width: 3vw;
                  height: 3vw;
                  border: 1px solid #dcdfe6;
                  border-radius: 50%;
                  &::after {
                    box-sizing: content-box;
                    content: "";
                    border: 1px solid #fff;
                    border-left: 0;
                    border-top: 0;
                    height: 7px;
                    left: 4px;
                    position: absolute;
                    top: 1px;
                    transform: rotate(45deg) scaleY(0);
                    width: 3px;
                    transition: transform 0.15s ease-in 0.05s;
                    transform-origin: center;
                  }
                }
                .active {
                  border: 1px solid #f78989;
                  background-color: #f78989;
                  position: relative;
                  &::after {
                    transform: rotate(45deg) scaleY(1);
                  }
                }
              }
              .name {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .address {
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
        .functionItem {
          display: flex;
          justify-content: flex-end;
          padding: 5vw;
          font-size: 3vw;
          color: white;
          .cancel {
            background-color: #f78989;
            margin-right: 5vw;
            width: 9vw;
            height: 7vw;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1vw;
          }
          .confirm {
            background-color: #f78989;
            width: 9vw;
            height: 7vw;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1vw;
          }
        }
      }
    }
  }
}

@font-face {
  font-family: "iconfont"; /* Project id 4282388 */
  src: url("//at.alicdn.com/t/c/font_4282388_c7xqenhqfxg.woff2?t=1697014878751")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_4282388_c7xqenhqfxg.woff?t=1697014878751")
      format("woff"),
    url("//at.alicdn.com/t/c/font_4282388_c7xqenhqfxg.ttf?t=1697014878751")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-wancheng:before {
  content: "\e606";
}
</style>
