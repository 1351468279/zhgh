<script lang="ts" setup>
import { computed, ref } from "vue";
import type { applySanYuType, applySanYuListType } from "@/types/hotel";
import { useApplySanYuStore, useMemberStore } from "@/store";
import {
  getSanYuInfo,
  getUserInfo,
  uploadFile,
  uploadForm,
} from "@/services/applyRecuperation";
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
import type { applyRecuperationDataType } from "@/types/recuperation";
const memberStore = useMemberStore();
const baseFormData = ref<applyRecuperationDataType>({
  name: "",
  age: "",
  sex: "男",
  nation: "",
  education: "",
  politics: "",
  unit: "",
  tittle: "",
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
  return "发布活动";
});
// 接收用户基本信息
const userInfo = ref<applyRecuperationDataType>();
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
    baseFormData.value.tittle = userInfo.value?.tittle!;
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
        errorMessage: "请输入标题",
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
const rulesName = ref<applyRecuperationDataType>({
  name: "name",
  age: "age",
  sex: "sex",
  nation: "nation",
  degree: "degree",
  education: "education",
  politics: "politics",
  unit: "unit",
  tittle: " tittle",
  duties: "duties",
  startTime: "startTime",
  endTime: "endTime",
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
const formats = ref<any>({});
// 接收文本编辑器
const editorCtx = ref();
// 编辑器加载
const onEditorReady = () => {
  uni
    .createSelectorQuery()
    .select("#editor")
    .context((res: any) => {
      editorCtx.value = res.context;
    })
    .exec();
};
// 点击撤销
const undo = () => {
  editorCtx.value.undo();
};
// 格式化富文本编辑器
const format = (e: any) => {
  let { name, value } = e.target.dataset;
  if (!name) return;
  editorCtx.value.format(name, value);
};

// 插入图片

const insertImage = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      editorCtx.value.insertImage({
        src: res.tempFilePaths[0],
        alt: "图像",
        success: function () {
          console.log("insert image success");
        },
      });
    },
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
      <uni-forms-item required label="标题" :name="rulesName.tittle">
        <uni-easyinput
          v-model="baseFormData.tittle"
          type="text"
          placeholder="请输入标题"
        />
      </uni-forms-item>
      <uni-forms-item required label="地点" :name="rulesName.area">
        <uni-easyinput v-model="baseFormData.area" type="text" placeholder="请输入地点" />
      </uni-forms-item>
      <uni-forms-item required label="热线" :name="rulesName.name">
        <uni-easyinput
          v-model="baseFormData.name"
          type="text"
          placeholder="请输入电话热线"
        />
      </uni-forms-item>
      <uni-forms-item required label="内容" :name="rulesName.name">
        <view class="container">
          <view class="toolBar" @click="format">
            <view
              :class="formats.bold ? 'ql-active' : ''"
              class="iconfont icon-zitijiacu"
              data-name="bold"
            >
            </view>
            <view
              :class="formats.italic ? 'ql-active' : ''"
              class="iconfont icon-zitixieti"
              data-name="italic"
            >
            </view>
            <view
              :class="formats.underline ? 'ql-active' : ''"
              class="iconfont icon-zitixiahuaxian"
              data-name="underline"
            ></view>

            <view
              :class="formats.align === 'left' ? 'ql-active' : ''"
              class="iconfont icon-zuoduiqi"
              data-name="align"
              data-value="left"
            ></view>

            <view
              :class="formats.align === 'center' ? 'ql-active' : ''"
              class="iconfont icon-juzhongduiqi"
              data-name="align"
              data-value="center"
            ></view>

            <view
              :class="formats.align === 'right' ? 'ql-active' : ''"
              class="iconfont icon-youduiqi"
              data-name="align"
              data-value="right"
            ></view>

            <view
              :class="formats.align === 'justify' ? 'ql-active' : ''"
              class="iconfont icon-zuoyouduiqi"
              data-name="align"
              data-value="justify"
            ></view>
            <view class="iconfont icon-charutupian" @tap="insertImage"></view>
          </view>
          <editor
            id="editor"
            class="ql-container"
            placeholder="请输入内容"
            @ready="onEditorReady"
            ref="editorCtx"
          ></editor>
        </view>
      </uni-forms-item>
      <uni-forms-item required label="开始时间" :name="rulesName.startTime">
        <uni-datetime-picker
          type="date"
          return-type="string"
          v-model="baseFormData.startTime"
        />
      </uni-forms-item>
      <uni-forms-item required label="结束时间" :name="rulesName.endTime">
        <uni-datetime-picker
          type="date"
          return-type="string"
          v-model="baseFormData.endTime"
        />
      </uni-forms-item>
      <uni-forms-item required label="可参加人数" :name="rulesName.name">
        <uni-easyinput
          v-model="baseFormData.name"
          type="number"
          placeholder="请输入可参加人数"
        />
      </uni-forms-item>

      <button :disabled="userInfo?.process != 0" @click="submit">发布</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* Project id 4281647 */
  src: url("//at.alicdn.com/t/c/font_4281647_gb1ftdspjtn.woff2?t=1697003954970")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_4281647_gb1ftdspjtn.woff?t=1697003954970")
      format("woff"),
    url("//at.alicdn.com/t/c/font_4281647_gb1ftdspjtn.ttf?t=1697003954970")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-charutupian:before {
  content: "\e600";
}

.icon-juzhongduiqi:before {
  content: "\ec80";
}

.icon-youduiqi:before {
  content: "\ec82";
}

.icon-zitijiacu:before {
  content: "\ec83";
}

.icon-zitixiahuaxian:before {
  content: "\ec85";
}

.icon-zitixieti:before {
  content: "\ec86";
}

.icon-zuoduiqi:before {
  content: "\ec87";
}

.icon-zuoyouduiqi:before {
  content: "\ec88";
}

.sanYuBox {
  padding: 15px;
  background-color: #fff;
  .container {
    .toolBar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20rpx;
      white-space: normal;
      .ql-active {
        color: #06c;
      }
    }
    .ql-container {
      border: 1px solid #e5e5e5;
      border-radius: 20rpx;
    }
  }
}
</style>
