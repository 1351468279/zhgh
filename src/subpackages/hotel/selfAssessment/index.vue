<script lang="ts" setup>
import { ref } from "vue";
const customForm = ref();
const baseFormData = ref({
  politics: "",
  content: "",
});
const rulesName = ref({
  politics: "politics",
});
const rules = ref({
  politics: {
    rules: [
      {
        required: true,
        errorMessage: "请输入姓名",
        trigger: "blur",
      },
    ],
  },
});
// 定义自评下拉数据源
const selfAssessData = ref([
  {
    text: "优秀",
    value: "优秀",
  },
  {
    text: "合格",
    value: "合格",
  },
  {
    text: "基本合格",
    value: "基本合格",
  },
  {
    text: "不合格",
    value: "不合格",
  },
  {
    text: "弃权",
    value: "弃权",
  },
]);
// 互评人数据源
const peopleData = ref([
  {
    text: "张三风",
    value: "张三风",
  },
  {
    text: "李星云",
    value: "李星云",
  },
  {
    text: "姬如雪",
    value: "姬如雪",
  },
  {
    text: "王琳",
    value: "王琳",
  },
  {
    text: "韩立",
    value: "韩立",
  },
]);
// 点击提交
const onClick = () => {
  uni.navigateBack({ delta: 1 });
};
</script>

<template>
  <view class="sanYuBox">
    <uni-forms
      :model="baseFormData"
      validateTrigger="blur"
      :rules="rules"
      label-width="80px"
      ref="customForm"
    >
      <uni-forms-item required label="选择互评人" :name="rulesName.politics">
        <uni-data-select v-model="baseFormData.politics" :localdata="peopleData" />
      </uni-forms-item>
      <uni-forms-item required label="自评" :name="rulesName.politics">
        <uni-data-select v-model="baseFormData.politics" :localdata="selfAssessData" />
      </uni-forms-item>
      <uni-forms-item required label="自评" :name="rulesName.politics">
        <textarea
          :maxlength="-1"
          class="content"
          v-model="baseFormData.content"
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
