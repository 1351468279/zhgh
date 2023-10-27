<script lang="ts" setup>
import {
  getTogetherEvaluationApi,
  getinviteData,
  submitMyInfoApi,
} from "@/services/quantitativeAssessment";
import type { myDataResItemsType } from "@/types/quantitativeAssessment";
import { onShow } from "@dcloudio/uni-app";
import type {
  UniEasyinputOnBlurDetail,
  UniEasyinputOnBlurEvent,
  UniEasyinputOnFocusEvent,
} from "@uni-helper/uni-ui-types";
import { ref } from "vue";

const customForm = ref();
const baseFormData = ref({
  evaluate: "",
  describes: "",
});

// 定义自评下拉数据源
const selfAssessData = ref([
  {
    text: "优秀",
    value: "0",
  },
  {
    text: "合格",
    value: "1",
  },
  {
    text: "基本合格",
    value: "2",
  },
  {
    text: "不合格",
    value: "3",
  },
  {
    text: "弃权",
    value: "4",
  },
  {
    text: "未评价",
    value: "5",
  },
]);
// 互评人数据源
const peopleData = ref();
const props = defineProps(["item", "id"]);
// 点击提交
const onClick = async () => {
  submitParams.value.evaluate = baseFormData.value.evaluate;
  submitParams.value.describe = baseFormData.value.describes;
  console.log("待提交表单信息", submitParams.value);
  await submitMyInfoApi(submitParams.value);

  uni.navigateBack({ delta: 1 });
};
const isShow = ref(false);
const submitParams = ref({
  id: "",
  messageId: "",
  messageTitle: "",
  memberUsername: "",
  memberUserId: "",
  evaluate: "",
  describe: "",
  self: "",
});
// 接收互评人信息
const togetherPeople = ref();
// 接收本条被邀请评价信息
const evaluatedInfo = ref<myDataResItemsType>();
// 定义互评人列表的显示与否
const isShowTogetherList = ref(true);
// 输入框聚焦
const onFocus = (e: UniEasyinputOnFocusEvent) => {
  console.log("聚焦");
  isShowTogetherList.value = true;
};
// 输入框失焦
const onBlur = (e: UniEasyinputOnBlurEvent) => {
  console.log("失焦");
  isShowTogetherList.value = false;
};
onShow(async () => {
  console.log("onshow");
  uni.setNavigationBarTitle({ title: "自评" });

  if (props.id) {
    console.log("互评id标识存在");
    isShow.value = true;
    uni.setNavigationBarTitle({ title: "互评" });
  }
  console.log(JSON.parse(props.item));
  evaluatedInfo.value = JSON.parse(props.item);
  if (!evaluatedInfo.value) return uni.showToast({ title: "这条评论数据已经不存在了" });
  console.log(evaluatedInfo.value);
  // const res = await getinviteData();
  // if (!res.rows) return uni.showToast({ title: "数据不存在" });
  submitParams.value.id = evaluatedInfo.value.id;
  submitParams.value.messageId = evaluatedInfo.value.messageId;
  submitParams.value.messageTitle = evaluatedInfo.value.messageTitle;
  submitParams.value.memberUsername = evaluatedInfo.value.memberUsername;
  submitParams.value.memberUserId = evaluatedInfo.value.memberUserId;
  submitParams.value.self = evaluatedInfo.value.self;
  console.log("拼接成功", submitParams.value);
  // if (props.id == 1) {
  //   isShow.value = true;
  //   const TogetherEvaluationRes = await getTogetherEvaluationApi(evaluatedInfo.value.id);
  // }
});
</script>

<template>
  <view class="sanYuBox">
    <view class="wrap">
      <!-- <view class="selectTogether">
        <view class="label"> 选择互评人 </view>
        <input class="inputBox" type="text" placeholder="请输入互评人姓名关键字" />
      </view> -->
      <view class="TogetherList" v-show="isShowTogetherList">
        <scroll-view scroll-y>
          <view class="scroll_selector">
            <text>姓名</text>
            <text></text>
          </view>
        </scroll-view>
      </view>
      <uni-forms
        class="formBox"
        :model="baseFormData"
        validateTrigger="blur"
        label-width="80px"
        ref="customForm"
      >
        <uni-forms-item class="togetherBox" required label="选择互评人">
          <uni-easyinput
            v-model="togetherPeople"
            type="text"
            placeholder="请输入互评人姓名关键字"
            @focus="onFocus"
            @blur="onBlur"
          />
          <!-- <uni-data-select>121</uni-data-select> -->
        </uni-forms-item>
        <uni-forms-item required label="评价分级">
          <uni-data-select v-model="baseFormData.evaluate" :localdata="selfAssessData" />
        </uni-forms-item>
        <uni-forms-item required label="评价内容">
          <textarea
            :maxlength="-1"
            class="content"
            v-model="baseFormData.describes"
            placeholder="请输入内容"
            placeholder-class="textarea-placeholder"
          />
        </uni-forms-item>
      </uni-forms>
      <view class="publish" @click="onClick">提交</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.sanYuBox {
  height: calc(95vh);
  width: 100vw;
  background-color: #fff;
  position: relative;
  padding-top: 4vh;

  .wrap {
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 90vw;
    height: 95vh;
    position: relative;
    .TogetherList {
      position: absolute;
      left: 19.5vw;
      top: 12vw;
      width: 70vw;
      height: 50vw;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 1vw;
      z-index: 3;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .formBox {
      .togetherBox {
        margin-top: 2vw;
      }
    }
    .content {
      height: calc(30vh);
      width: 100%;
      border: 1px solid #e5e5e5;
    }
    .publish {
      position: absolute;
      width: 80vw;
      height: 7vh;
      bottom: 1vw;
      right: 0;
      left: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #dd372e;
      border-radius: 2vw;
      color: white;
    }
  }
}
</style>
