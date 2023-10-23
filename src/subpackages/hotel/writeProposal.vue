<script lang="ts" setup>
import type { applySanYuListType, applySanYuType } from "@/types/hotel";
import { computed, ref } from "vue";
const baseFormData = ref<applySanYuType>({
  name: "",
  age: "",
  sex: "男",
  nation: "",
  education: "",
  politics: "",
  unit: "",
  title: "",
  duties: "",
  degree: "",
});
// 接收用户基本信息
const userInfo = ref<applySanYuListType>();
// 定义表单校验规则
const rules = ref({
  name: {
    rules: [
      {
        required: true,
        errorMessage: "请输入姓名",
        trigger: "blur",
      },
      {
        pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
        errorMessage: "姓名格式错误",
        trigger: "blur",
      },
    ],
  },
  age: {
    rules: [
      {
        required: true,
        errorMessage: "请输入年龄",
        trigger: "blur",
      },
      {
        pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
        errorMessage: "年龄格式错误",
        trigger: "blur",
      },
    ],
  },
  sex: {
    rules: [
      {
        required: true,
        errorMessage: "请选择性别",
        trigger: "blur",
      },
    ],
  },
  nation: {
    rules: [
      {
        required: true,
        errorMessage: "请选择民族",
        trigger: "blur",
      },
    ],
  },
  degree: {
    rules: [
      {
        required: true,
        errorMessage: "请选择学历",
        trigger: "blur",
      },
    ],
  },
  education: {
    rules: [
      {
        required: true,
        errorMessage: "请选择学位",
        trigger: "blur",
      },
    ],
  },
  politics: {
    rules: [
      {
        required: true,
        errorMessage: "请选择政治面貌",
        trigger: "blur",
      },
    ],
  },
  unit: {
    rules: [
      {
        required: true,
        errorMessage: "请输入工作单位",
        trigger: "blur",
      },
    ],
  },
  title: {
    rules: [
      {
        required: true,
        errorMessage: "请输入职位",
        trigger: "blur",
      },
    ],
  },
  duties: {
    rules: [
      {
        required: true,
        errorMessage: "请输入职务",
        trigger: "blur",
      },
    ],
  },
});
// 定义表单校验规则name字段
const rulesName = ref({
  name: "name",
  age: "age",
  sex: "sex",
  nation: "nation",
  degree: "degree",
  education: "education",
  politics: "politics",
  unit: "unit",
  title: "title",
  duties: "duties",
});
const props = defineProps(["id"]);

// 根据id显示标题和设置回显数据
const tittle = computed(() => {
  if (props.id) {
    uni.setNavigationBarTitle({
      title: "三育人",
    });
    console.log(props.id);
    return "详细信息显示";
  }
  return "填写三育人申请";
});
// 引用form表单
const customForm = ref<any>();
// 提交表单
const submit = async () => {
  //   const validateRes = await customForm.value.validate();
  uni.navigateBack();
};
</script>

<template>
  <view class="proposalBox">
    <uni-section :title="tittle" type="line" />
    <uni-forms
      :model="baseFormData"
      validateTrigger="blur"
      :rules="rules"
      label-width="80px"
      ref="customForm"
    >
      <uni-forms-item required label="姓名" :name="rulesName.name">
        <uni-easyinput v-model="baseFormData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item required label="年龄" :name="rulesName.age">
        <uni-easyinput
          v-model="baseFormData.age"
          type="number"
          placeholder="请输入年龄"
        />
      </uni-forms-item>

      <uni-forms-item required label="工作单位" :name="rulesName.unit">
        <uni-easyinput
          v-model="baseFormData.unit"
          type="text"
          placeholder="请输入工作单位"
        />
      </uni-forms-item>
      <uni-forms-item required label="职位" :name="rulesName.title">
        <uni-easyinput
          v-model="baseFormData.title"
          type="text"
          placeholder="请输入职位"
        />
      </uni-forms-item>
      <uni-forms-item required label="职务" :name="rulesName.duties">
        <uni-easyinput
          v-model="baseFormData.duties"
          type="text"
          placeholder="请输入职务"
        />
      </uni-forms-item>

      <bean> </bean>
      <button @click="submit">保存</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.proposalBox {
  padding: 15px;
  background-color: #fff;
}
</style>
