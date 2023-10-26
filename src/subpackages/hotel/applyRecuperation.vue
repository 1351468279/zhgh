<script lang="ts" setup>
import { computed, ref } from "vue";
import { useMemberStore } from "@/store";
import { getSanYuInfo, handleActivity, uploadForm } from "@/services/applyRecuperation";
import { onShow } from "@dcloudio/uni-app";

import type {
  UniFilePickerOnDeleteEvent,
  UniFilePickerOnSelectEvent,
  UniFilePickerTempFile,
  UniFilePickerValue,
} from "@uni-helper/uni-ui-types";
import { baseURL } from "@/utils/http";
import type { applyRecuperationDataType } from "@/types/recuperation";
import type { EditorOnInputEvent } from "@uni-helper/uni-app-types";
const memberStore = useMemberStore();
const sltFile = ref<UniFilePickerValue[]>();
const baseFormData = ref<applyRecuperationDataType>({
  id: "",
  title: "",
  address: "",
  participantsNumber: NaN,
  content: "",
  organization: NaN,
  hotline: "",
  startTime: "",
  endTime: "",
});
const props = defineProps(["id"]);
// 根据id显示标题和设置回显数据
const tittle = computed(() => {
  return "发布活动";
});
// 接收用户基本信息
const userInfo = ref<applyRecuperationDataType>();
// 保存按钮显示标识
const saveBtnShow = ref(false);
// 定义操作列表项方式
let type = NaN;

// 定义表单校验规则name字段
const rulesName = ref({
  title: "title",
  address: "address",
  participantsNumber: "participantsNumber",
  content: "content",
  organization: "organization",
  hotline: "hotline",
  startTime: "startTime",
  endTime: "endTime",
});
// 定义表单校验规则
const rules = ref({
  title: {
    rules: [
      {
        required: true,
        errorMessage: "请输入标题",
        trigger: "blur",
      },
    ],
  },
  address: {
    rules: [
      {
        required: true,
        errorMessage: "请输入活动地址",
        trigger: "blur",
      },
    ],
  },
  participantsNumber: {
    rules: [
      {
        required: true,
        errorMessage: "请输入活动人数限制",
        trigger: "blur",
      },
      {
        pattern: /^[0-9]*$/,
        errorMessage: "必须是数字",
        trigger: "blur",
      },
    ],
  },
  content: {
    rules: [
      {
        required: true,
        errorMessage: "请输入活动内容",
        trigger: "blur",
      },
    ],
  },
  organization: {
    rules: [
      {
        required: true,
        errorMessage: "请输入活动发布组织",
        trigger: "blur",
      },
    ],
  },
  hotline: {
    rules: [
      {
        required: true,
        errorMessage: "请输入活动电话热线",
        trigger: "blur",
      },
      {
        pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
        errorMessage: "电话格式错误",
        trigger: "blur",
      },
    ],
  },
  startTime: {
    rules: [
      {
        required: true,
        errorMessage: "请选择活动开始时间",
        trigger: "blur",
      },
    ],
  },
  endTime: {
    rules: [
      {
        required: true,
        errorMessage: "请选择活动结束时间",
        trigger: "blur",
      },
    ],
  },
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
  console.log(e.tempFilePaths[0]);
  uni.uploadFile({
    url: baseURL + "/lxygl/api/hdImg",
    name: "file",
    filePath: e.tempFilePaths[0],
    header: {
      "content-type": "multipart/form-data",
    },
    formData: {
      id: baseFormData.value.id,
    },
    success: (uploadFileRes) => {
      const imgPath = baseURL + JSON.parse(uploadFileRes.data).body.path;
      console.log(JSON.parse(uploadFileRes.data).body.path);
      console.log(imgPath);
      // editorCtx.value.insertImage({
      //   src: imgPath,
      //   alt: "图像",
      //   success: function () {
      //     console.log("insert image success");
      //   },
      // });
    },
    fail: (fail) => {
      console.log(fail);
    },
  });
  // pdfFiles.value = pdfFiles.value.concat(...e.tempFiles);
  // console.log(pdfFiles.value);
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
  });
  // 上传表单
  uploadForm(baseFormData.value).then((res) => {
    console.log(res);
    uni.showToast({
      title: props.id ? "已修改" : "已发布",
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
  console.log("我加载了");
  uni
    .createSelectorQuery()
    .select("#editor")
    .context((res: any) => {
      editorCtx.value = res.context;
      console.log(editorCtx.value);
      editorCtx.value.setContents({ html: baseFormData.value.content });
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
      console.log(res.tempFilePaths[0]);
      uni.uploadFile({
        url: baseURL + "/index/ueditor/config.do?action=uploadimage",
        name: "file",
        filePath: res.tempFilePaths[0],
        header: {
          "content-type": "multipart/form-data",
        },
        success: (uploadFileRes) => {
          console.log(JSON.parse(uploadFileRes.data));
          const imgPath =
            baseURL +
            "/dbylAndKnbf/imgsPath.interface?url=" +
            JSON.parse(uploadFileRes.data).url;
          console.log(JSON.parse(uploadFileRes.data));
          console.log(imgPath);
          editorCtx.value.insertImage({
            src: imgPath,
            alt: "图像",
            success: function () {
              console.log("insert image success");
            },
          });
        },
        fail: (fail) => {
          console.log(fail);
        },
      });
    },
  });
};
const input = (e: EditorOnInputEvent) => {
  console.log(e.detail.html);
  baseFormData.value.content = e.detail.html;
};
onShow(async () => {
  console.log("onshow");
  // 如果是管理员
  if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin") != true) return;
  // 如果是通过点击卡片进来的
  if (props.id) {
    type = 2;
    baseFormData.value.id = props.id;
    const res = await handleActivity(type, props.id);
    console.log(res.body?.body);
    if (!res.body)
      return uni.showToast({
        title: "错误",
      });

    baseFormData.value.title = res.body?.body.title;
    baseFormData.value.organization = res.body?.body.organization;
    sltFile.value = [
      {
        name: res.body.body.imgList[res.body.body.imgList.length - 1].originalName,
        extname: res.body.body.imgList[res.body.body.imgList.length - 1].type.slice(1),
        url:
          baseURL +
          "/dbylAndKnbf/sltPath.interface?url=" +
          res.body.body.imgList[res.body.body.imgList.length - 1].path,
      },
    ];

    baseFormData.value.address = res.body?.body.address;
    baseFormData.value.hotline = res.body?.body.hotline;
    baseFormData.value.content = res.body?.body.content;
    baseFormData.value.startTime = res.body?.body.startTime;
    baseFormData.value.endTime = res.body?.body.endTime;
    baseFormData.value.participantsNumber = res.body?.body.participantsNumber;
  }
  // 如果是点新增进来的
  else {
    type = 0;
    const res = await handleActivity(type);
    console.log("测试");
    console.log(res.body?.body.id);
    baseFormData.value.id = res.body?.body.id;
  }
});
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
      <uni-forms-item required label="标题" :name="rulesName.title">
        <uni-easyinput
          v-model="baseFormData.title"
          type="text"
          placeholder="请输入标题"
        />
      </uni-forms-item>
      <uni-forms-item required label="发布组织" :name="rulesName.organization">
        <uni-easyinput
          v-model="baseFormData.organization"
          type="text"
          placeholder="请输入发布组织"
        />
      </uni-forms-item>
      <uni-forms-item label="上传缩略图">
        <uni-file-picker
          v-model="sltFile"
          :limit="1"
          file-mediatype="image"
          @select="onSelect"
          @delete="onDelete"
        />
      </uni-forms-item>
      <uni-forms-item required label="地点" :name="rulesName.address">
        <uni-easyinput
          v-model="baseFormData.address"
          type="text"
          placeholder="请输入地点"
        />
      </uni-forms-item>
      <uni-forms-item required label="热线" :name="rulesName.hotline">
        <uni-easyinput
          v-model="baseFormData.hotline"
          type="number"
          placeholder="请输入电话热线"
        />
      </uni-forms-item>
      <uni-forms-item required label="内容" :name="rulesName.content">
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
            :node="baseFormData.content"
            class="ql-container"
            placeholder="请输入内容"
            @input="input"
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
      <uni-forms-item required label="可参加人数" :name="rulesName.participantsNumber">
        <uni-easyinput
          v-model="baseFormData.participantsNumber"
          type="number"
          placeholder="请输入可参加人数"
        />
      </uni-forms-item>

      <button @click="submit">{{ props.id ? "修改" : "发布" }}</button>
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
