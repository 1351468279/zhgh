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
// 富文本编辑器格式器
const formats = ref({});
// 接收文本编辑器
const editorCtx = ref();
// 编辑器加载
const onEditorReady = () => {
  uni
    .createSelectorQuery()
    .select("#editor")
    .context((res) => {
      editorCtx.value = res.context;
    })
    .exec();
};
// 点击撤销
const undo = () => {
  editorCtx.value.undo();
};
// 格式化富文本编辑器
const format = (e) => {
  let { name, value } = e.target.dataset;
  if (!name) return;
  editorCtx.value.format(name, value);
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
      <uni-forms-item required label="标题" :name="rulesName.name">
        <uni-easyinput v-model="baseFormData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item required label="地点" :name="rulesName.name">
        <uni-easyinput v-model="baseFormData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item required label="热线" :name="rulesName.name">
        <uni-easyinput v-model="baseFormData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item required label="内容" :name="rulesName.name">
        <view class="container">
          <view class="toolBar" @click="format">
            <view
              :class="formats.bold ? 'ql-active' : ''"
              class="iconfont icon-zitijiacu"
              data-name="bold"
              >加粗
            </view>
            <view
              :class="formats.italic ? 'ql-active' : ''"
              class="iconfont icon-zitixieti"
              data-name="italic"
              >斜体
            </view>
            <view
              :class="formats.underline ? 'ql-active' : ''"
              class="iconfont icon-zitixiahuaxian"
              data-name="underline"
              >下划线</view
            >
            <view
              :class="formats.strike ? 'ql-active' : ''"
              class="iconfont icon-zitishanchuxian"
              data-name="strike"
              >删除线</view
            >
          </view>
          <editor
            id="editor"
            class="ql-container"
            :placeholder="placeholder"
            @ready="onEditorReady"
            ref="editorCtx"
          ></editor>
          <button type="warn" @tap="undo">撤销</button>
        </view>
      </uni-forms-item>
      <uni-forms-item required label="开始时间" :name="rulesName.name">
        <uni-easyinput v-model="baseFormData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item required label="结束时间" :name="rulesName.name">
        <uni-easyinput v-model="baseFormData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item required label="可参加人数" :name="rulesName.name">
        <uni-easyinput v-model="baseFormData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>

      <button :disabled="userInfo?.process != 0" @click="submit">发布</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.sanYuBox {
  padding: 15px;
  background-color: #fff;
  .container {
    .toolBar {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20rpx;
      white-space: normal;
      .ql-active {
        color: #06c;
      }
    }
    .ql-container {
      border: 1px solid #e5e5e5;
      border-redius: 20rpx;
    }
  }
}
</style>
