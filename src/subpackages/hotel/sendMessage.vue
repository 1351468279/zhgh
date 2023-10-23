<script lang="ts" setup>
import { ref } from "vue";
const rules = ref({
  tittle: {
    rules: [
      {
        required: true,
        errorMessage: "请输入标题",
        trigger: "blur",
      },
    ],
  },
});
// 定义表单校验规则name字段
const rulesName = ref({
  tittle: "tittle",
});
const baseFormData = ref({
  tittle: "",
});
const sendMessage = () => {
  uni.navigateBack();
};
</script>

<template>
  <view class="editBox">
    <uni-forms
      :model="baseFormData"
      validateTrigger="blur"
      :rules="rules"
      label-width="80px"
      ref="customForm"
    >
      <uni-forms-item required label="标题" :name="rulesName.tittle">
        <uni-easyinput
          v-model="baseFormData.tittle"
          type="text"
          placeholder="请输入标题"
        />
      </uni-forms-item>
      <uni-forms-item required label="内容">
        <textarea class="content" placeholder="请输入内容..." name="textarer" id="">
        </textarea>
      </uni-forms-item>
    </uni-forms>
    <view class="sendButton" @click="sendMessage"> 发送</view>
  </view>
</template>

<style lang="scss" scoped>
.editBox {
  height: 90vh;
  padding: 8vw;
  position: relative;
  .content {
    border: 1px solid #e5e5e5;
    border-radius: 1vw;
    width: 64vw;
  }
  .sendButton {
    color: white;
    position: absolute;
    bottom: 5vw;
    right: 5vw;
    background-color: #d81e06;
    width: 15vw;
    height: 15vw;
    border-radius: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
