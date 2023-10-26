<script lang="ts" setup>
import {
  getTogetherEvaluationApi,
  getinviteData,
  submitMyInfoApi,
} from "@/services/quantitativeAssessment";
import type { myDataResType } from "@/types/quantitativeAssessment";
import { onShow } from "@dcloudio/uni-app";
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
const props = defineProps(["id"]);
// 点击提交
const onClick = async () => {
  console.log(baseFormData.value);
  submitParams.value.evaluate = baseFormData.value.evaluate;
  submitParams.value.describe = baseFormData.value.describes;
  console.log(submitParams.value);
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
onShow(async () => {
  const res = await getinviteData();
  if (!res.rows) return uni.showToast({ title: "数据不存在" });
  submitParams.value.id = res.rows[0].id;
  submitParams.value.messageId = res.rows[0].messageId;
  submitParams.value.messageTitle = res.rows[0].messageTitle;
  submitParams.value.memberUsername = res.rows[0].memberUsername;
  submitParams.value.memberUserId = res.rows[0].memberUserId;
  submitParams.value.self = res.rows[0].self;
  if (props.id == 1) {
    isShow.value = true;
    const TogetherEvaluationRes = await getTogetherEvaluationApi(res.rows[0].id);
  }
});
</script>

<template>
  <view class="sanYuBox">
    <uni-forms
      :model="baseFormData"
      validateTrigger="blur"
      label-width="80px"
      ref="customForm"
    >
      <uni-forms-item required label="选择互评人" v-if="isShow">
        <uni-data-select v-model="baseFormData.evaluate" :localdata="peopleData" />
      </uni-forms-item>
      <uni-forms-item required label="评价分级">
        <uni-data-select v-model="baseFormData.evaluate" :localdata="selfAssessData" />
      </uni-forms-item>
      <uni-forms-item required label="评价内容">
        <textarea
          :maxlength="-1"
          class="content"
          v-model="baseFormData.describes"
          placeholder="请输入"
          placeholder-class="textarea-placeholder"
        />
      </uni-forms-item>
    </uni-forms>
    <view class="publish" @click="onClick">提交</view>
  </view>
</template>

<style lang="scss" scoped>
.sanYuBox {
  height: calc(95vh);
  padding: 15px 15px 0;
  background-color: #fff;
  position: relative;

  .content {
    height: calc(30vh);
    width: 100%;
    border: 1px solid #e5e5e5;
  }

  .publish {
    width: 90%;
    height: calc(7vh);
    position: absolute;
    bottom: 20rpx;
    right: 0;
    left: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dd372e;
    border-radius: 20rpx;
    color: white;
  }
}
</style>
