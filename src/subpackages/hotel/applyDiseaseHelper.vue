<script lang="ts" setup>
import { computed, ref } from "vue";
import type { applyProvincialPersonType, applySanYuListType } from "@/types/hotel";
import { useApplySanYuStore, useMemberStore } from "@/store";
import { getProvincialPersonInfo, uploadFile, uploadForm } from "@/services/applyHelper";
import { getUserInfo } from "@/services/applyHelper";
import { getReviewStatus } from "@/services/applyUnion";
import { onShow } from "@dcloudio/uni-app";
import { translateTimes } from "@/composible/data";
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
  name: "",
  phone: "",
  informationId: "",
  uploadDate: "",
  determine: 1,
  birthday: "",
});
const props = defineProps(["id", "tag"]);
// console.log(props.tag);
// 根据id显示标题和设置回显数据
const tittle = computed(() => {
  if (props.id) {
    uni.setNavigationBarTitle({
      title: "大病医疗申请",
    });
    console.log(props.id);
    return "详细信息显示";
  }
  return "填写大病医疗申请";
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
      console.log("我是点击进来的");
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
    baseFormData.value.name = userInfo.value?.name!;
    baseFormData.value.birthday = userInfo.value?.birthday!;
    baseFormData.value.phone = userInfo.value?.phone!;
    baseFormData.value.userId = userInfo.value?.userId!;
    baseFormData.value.id = userInfo.value?.id!;
    baseFormData.value.unit = userInfo.value?.unit!;
    baseFormData.value.process = userInfo.value?.process!;
  }
  console.log("cs", baseFormData.value);
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
  birthday: {
    rules: [
      {
        required: true,
        errorMessage: "请选择出生年月",
        trigger: "blur",
      },
    ],
  },
  phone: {
    rules: [
      {
        required: true,
        errorMessage: "请输入手机号",
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
  informationId: {
    rules: [
      {
        required: true,
        errorMessage: "请选择文件",
        trigger: "blur",
      },
    ],
  },
});
// 定义表单校验规则name字段
const rulesName = ref({
  name: "name",
  birthday: "birthday",
  phone: "phone",
  unit: "unit",
  informationId: "informationId",
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
  console.log("上传");
  console.log(...e.tempFiles);
  pdfFiles.value = pdfFiles.value.concat(...e.tempFiles);
  console.log(pdfFiles.value);
  //遍历文件列表，上传文件
  for (let item of pdfFiles.value) {
    uni.uploadFile({
      url: baseURL + "/dbylAndKnbf/userFile",
      name: "file",
      filePath: item.path,
      header: {
        "content-type": "multipart/form-data",
      },
      formData: {
        userId: userInfo.value?.userId!,
        id: userInfo.value?.id!,
        type: "pdf",
      },
      success: (uploadFileRes) => {
        baseFormData.value.uploadDate = translateTimes();
        console.log(uploadFileRes);
        console.log(JSON.parse(uploadFileRes.data).body.id);
        baseFormData.value.informationId = JSON.parse(uploadFileRes.data).body.id;
        console.log(baseFormData.value.informationId);
        console.log(2);
      },
      fail: (fail) => {
        console.log(fail);
      },
    });
  }
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
  // 如果点击卡片进来的，就不必上传文件
  if (!props.id) {
    if (!baseFormData.value.informationId)
      return uni.showToast({
        title: "请先上传文件",
        mask: true,
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
      <uni-forms-item required label="出生年月" :name="rulesName.birthday">
        <uni-datetime-picker
          type="date"
          return-type="string"
          v-model="baseFormData.birthday"
        />
      </uni-forms-item>
      <uni-forms-item required label="手机号" :name="rulesName.phone">
        <uni-easyinput
          v-model="baseFormData.phone"
          type="number"
          placeholder="请输入手机号"
        />
      </uni-forms-item>

      <uni-forms-item required label="工作单位" :name="rulesName.unit">
        <uni-easyinput
          v-model="baseFormData.unit"
          type="text"
          placeholder="请输入工作单位"
        />
      </uni-forms-item>
      <uni-forms-item required label="上传申请资料">
        <uni-file-picker
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
