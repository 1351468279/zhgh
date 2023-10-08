<script lang="ts" setup>
import { computed, ref } from "vue";
import type { applyProvincialPersonType, applySanYuListType } from "@/types/hotel";
import { useApplySanYuStore, useMemberStore } from "@/store";
import {
  getProvincialPersonInfo,
  uploadFile,
  uploadForm,
} from "@/services/applyProvincialTeam";
import { getUserInfo } from "@/services/applyProvincialTeam";
import { getReviewStatus } from "@/services/applyUnion";
import { onShow } from "@dcloudio/uni-app";
import {
  nationsData,
  educationsData,
  politicsData,
  degreesData,
  jobTitleData,
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
const baseFormData = ref<applyProvincialPersonType>({
  id: "",
  userId: "",
  unit: "",
  awardsTime: "",
  designation: "",
  department: "",
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
      title: "省部级集体",
    });
    console.log(props.id);
    return "详细信息显示";
  }
  return "填写省部级集体申请";
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
      const res = await getProvincialPersonInfo(props.id);
      userInfo.value = (res.body as any)[0];
      console.log(userInfo.value);
      console.log("id用户信息");
    }
    // 如果是点新增进来的
    else {
      const res = await getUserInfo();
      userInfo.value = res.body;
    }
    // 获取用户信息,进行数据回显
    baseFormData.value.userId = userInfo.value?.userId!;
    baseFormData.value.id = userInfo.value?.id!;
    baseFormData.value.unit = userInfo.value?.unit!;
    baseFormData.value.awardsTime = userInfo.value?.awardsTime!;
    baseFormData.value.designation = userInfo.value?.designation!;
    baseFormData.value.department = userInfo.value?.department!;
    baseFormData.value.process = userInfo.value?.process!;
  }
  console.log("cs", baseFormData.value);
});

// 定义表单校验规则
const rules = ref({
  unit: {
    rules: [
      {
        required: true,
        errorMessage: "请输入工作单位",
        trigger: "blur",
      },
    ],
  },

  awardsTime: {
    rules: [
      {
        required: true,
        errorMessage: "请填写获奖时间",
        trigger: "blur",
      },
    ],
  },
  designation: {
    rules: [
      {
        required: true,
        errorMessage: "请输入荣誉称号",
        trigger: "blur",
      },
    ],
  },
  department: {
    rules: [
      {
        required: true,
        errorMessage: "请输入颁奖部门",
        trigger: "blur",
      },
    ],
  },
});
// 定义表单校验规则name字段
const rulesName = ref({
  unit: "unit",
  awardsTime: "awardsTime",
  designation: "designation",
  department: "department",
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
      <!-- <uni-forms-item required label="姓名" :name="rulesName.name">
        <uni-easyinput v-model="baseFormData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item required label="性别" :name="rulesName.sex">
        <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" mode="default" />
      </uni-forms-item>
      <uni-forms-item required label="职称" :name="rulesName.title">
        <uni-data-select v-model="baseFormData.title" :localdata="jobTitleData" />
      </uni-forms-item> -->
      <uni-forms-item required label="工作单位" :name="rulesName.unit">
        <uni-easyinput
          v-model="baseFormData.unit"
          type="text"
          placeholder="请输入工作单位"
        />
      </uni-forms-item>
      <uni-forms-item required label="荣誉称号" :name="rulesName.designation">
        <uni-easyinput
          v-model="baseFormData.designation"
          type="text"
          placeholder="请输入工作单位"
        />
      </uni-forms-item>
      <uni-forms-item required label="授奖部门" :name="rulesName.department">
        <uni-easyinput
          v-model="baseFormData.department"
          type="text"
          placeholder="请输入职位"
        />
      </uni-forms-item>
      <uni-forms-item required label="获奖时间" :name="rulesName.awardsTime">
        <uni-datetime-picker
          type="date"
          return-type="string"
          v-model="baseFormData.awardsTime"
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
      <bean> </bean>
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
