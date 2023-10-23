<script lang="ts" setup>
import { computed, ref } from "vue";
import type { applySanYuType, applySanYuListType } from "@/types/hotel";
import { useApplySanYuStore, useMemberStore } from "@/store";
import { getSanYuInfo, getUserInfo, uploadFile, uploadForm } from "@/services/applySanYu";
import { getReviewStatus } from "@/services/applyUnion";
import { onShow } from "@dcloudio/uni-app";
import {
  nationsData,
  educationsData,
  politicsData,
  degreesData,
} from "@/composible/data";
import type {
  UniFilePicker,
  UniFilePickerOnDeleteEvent,
  UniFilePickerOnSelectEvent,
  UniFilePickerTempFile,
} from "@uni-helper/uni-ui-types";
import type UniformDescriptor from "XrFrame/kanata/lib/frontend/resource/UniformDescriptor";
import { baseURL } from "@/utils/http";
const memberStore = useMemberStore();
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
// 定义单选数据源
const sexs = ref([
  {
    text: "男",
    value: "男",
  },
  {
    text: "女",
    value: "女",
  },
]);
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
// 接收用户基本信息
const userInfo = ref<applySanYuListType>();
// 保存按钮显示标识
const saveBtnShow = ref(false);
onShow(async () => {
  console.log("onshow");
  // 如果是管理员
  if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin") == true) {
    console.log("管理员");
    return;
  }
  // 如果是普通会员
  else if (memberStore.profile?.userVo?.roleType?.includes("member") == true) {
    // 如果是通过点击卡片进来的
    if (props.id) {
      const res = await getSanYuInfo(props.id);
      userInfo.value = (res.data as any)[0];
      console.log(userInfo.value);
      console.log("id用户信息");
    }
    // 如果是点新增进来的
    else {
      const res = await getUserInfo();
      userInfo.value = res.body;
    }
    // 获取用户信息,进行数据回显
    baseFormData.value.name = userInfo.value?.name!;
    baseFormData.value.age = userInfo.value?.age!;
    baseFormData.value.sex = userInfo.value?.sex!;
    baseFormData.value.nation = userInfo.value?.nation!;
    baseFormData.value.education = userInfo.value?.education!;
    baseFormData.value.userId = userInfo.value?.userId!;
    baseFormData.value.id = userInfo.value?.id!;
    baseFormData.value.degree = userInfo.value?.degree!;
    baseFormData.value.politics = userInfo.value?.politics!;
    baseFormData.value.unit = userInfo.value?.unit!;
    baseFormData.value.title = userInfo.value?.title!;
    baseFormData.value.duties = userInfo.value?.duties!;
    baseFormData.value.process = userInfo.value?.process!;
  }
});

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
// 点击测试
const test = async () => {
  console.log(await customForm.value.validate());
};
// 引用form表单
const customForm = ref<any>();
// 接收用户所选择的pdf文件
const pdfFiles = ref<UniFilePickerTempFile[]>([]);
// 接收promise.all返回的结果
// 上传文件事件
const onSelect = (e: UniFilePickerOnSelectEvent) => {
  console.log(e);
  console.log(...e.tempFiles);
  pdfFiles.value = pdfFiles.value.concat(...e.tempFiles);
  console.log(pdfFiles.value);
};
// 删除文件事件
const onDelete = (e: UniFilePickerOnDeleteEvent) => {
  console.log(e);
  pdfFiles.value = pdfFiles.value.filter((item) => item.path !== e.tempFilePath);
  console.log(pdfFiles.value);
};
// 提交表单
const submit = async () => {
  const validateRes = await customForm.value.validate();
  console.log(validateRes);
  console.log("提交表单");
  console.log({
    baseFormData: baseFormData.value,
    pdfFiles: pdfFiles.value,
  });
  //遍历文件列表，上传文件
  for (let item of pdfFiles.value) {
    uni.uploadFile({
      url: baseURL + "/selection/userFile",
      name: "file",
      filePath: item.path,
      header: {
        "content-type": "multipart/form-data",
      },
      formData: {
        id: userInfo.value?.id!,
        type: "pdf",
      },
      success: (uploadFileRes) => {
        console.log(uploadFileRes);
        console.log(2);
      },
      fail: (fail) => {
        console.log(fail);
      },
    });
  }
  // 上传表单
  uploadForm(baseFormData.value).then((res) => {
    console.log(res);
    uni.showToast({
      title: "已保存",
      success: () => {
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      },
    });
  });
};
</script>
<template>
  <view class="sanYuBox">
    <uni-section :title="tittle" type="line" @click="test" />
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
      <uni-forms-item required label="性别" :name="rulesName.sex">
        <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" mode="default" />
      </uni-forms-item>
      <uni-forms-item required label="民族" :name="rulesName.nation">
        <uni-data-select v-model="baseFormData.nation" :localdata="nationsData" />
      </uni-forms-item>
      <uni-forms-item required label="学位" :name="rulesName.education">
        <uni-data-select v-model="baseFormData.education" :localdata="educationsData" />
      </uni-forms-item>
      <uni-forms-item required label="学历" :name="rulesName.degree">
        <uni-data-select v-model="baseFormData.degree" :localdata="degreesData" />
      </uni-forms-item>
      <uni-forms-item required label="政治面貌" :name="rulesName.politics">
        <uni-data-select v-model="baseFormData.politics" :localdata="politicsData" />
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
      <uni-forms-item required label="上传先进事迹">
        <uni-file-picker
          :disabled="userInfo?.process != 0"
          :limit="9"
          file-mediatype="all"
          @select="onSelect"
          @delete="onDelete"
          file-extname="pdf"
        />
      </uni-forms-item>
      <button :disabled="userInfo?.process != 0" @click="submit">保存</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.sanYuBox {
  padding: 15px;
  background-color: #fff;
}
</style>
