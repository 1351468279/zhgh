<script lang="ts" setup>
import { computed, ref } from "vue";
import { translateTime } from "@/composible/data";
import type { applyUnionType, reviewListType } from "@/types/hotel";
import { useApplyUnionStore, useMemberStore } from "@/store/index";
import { onLoad, onReady } from "@dcloudio/uni-app";
import {
  getOrgName,
  getReviewInfoById,
  getReviewStatus,
  submitReview,
  passReview,
  getReviewInfo,
} from "@/services/applyUnion";
import { nationsData, degreesData } from "@/composible/data";
// 引用表单项
const customForm = ref<any>(null);
const props = defineProps(["appId", "cardId"]);
// 接收审核列表id
const cardId = ref(props.cardId);
// 接收大厅列表id

const memberStore = useMemberStore();
const baseFormData = ref<applyUnionType>({
  orgId: "",
  account: "",
  name: "",
  idNumber: "",
  sex: NaN,
  nation: "",
  record: "",
  birthday: "",
  mobile: "",
  email: "",
});
// 根据cardId显示标题和设置回显数据
const tittle = computed(() => {
  if (cardId.value) {
    uni.setNavigationBarTitle({
      title: "入会审核",
    });
    return "详细信息显示";
  }
  return "填写入会信息";
});

// 定义单选数据源
const sexs = ref([
  {
    text: "男",
    value: 0,
  },
  {
    text: "女",
    value: 1,
  },
]);
// 定义接受组织名称
const orgName = ref();
//接收用户状态
const userState = ref();
// 接收用户信息
const userInfo = ref<reviewListType>();
// 判断用户身份
const isAdmin = ref(false);

onLoad(async () => {
  // 判断用户身份
  if (memberStore.profile?.userVo?.roleType?.includes("SystemAdmin")) {
    isAdmin.value = true;
  }
  console.log("进入审核界面");
  // 获取组织名称
  orgName.value = (await getOrgName()).data.map((item) => {
    return {
      value: item.id,
      text: item.name,
    };
  });
  // 获取用户实时审核状态
  userState.value = (await getReviewStatus()).data;
  // 如果是游客
  if (userState.value == 0) {
    // 游客且未绑定手机号
    if (!memberStore.profile?.phoneNum) {
      uni.navigateTo({ url: "/pages/login/index?actions=tapPhone" });
    } else {
      baseFormData.value.mobile = memberStore.profile.phoneNum;
    }
  }
  // 如果是会员，并且已经提交审核了,但是还没通过
  else if (userState.value == 1) {
    // 但是是通过卡片进来的
    if (cardId.value) {
      console.log("通过卡片进来的");
      if (!memberStore.profile?.token)
        return uni.showToast({
          title: "请先登录",
          icon: "none",
          duration: 1000,
          success: () => {
            setTimeout(() => {
              uni.navigateTo({ url: "/pages/login/index" });
            }, 1000);
          },
        });
      // 获取审核信息
      const res = (await getReviewInfo()).data[0];
      // 数据回显
      for (const key in baseFormData.value) {
        if (res.hasOwnProperty(key)) {
          (baseFormData.value as any)[key] = (res as any)[key];
        }
      }
      // baseFormData.value = applier[cardId.value]
      uni.setNavigationBarTitle({
        title: "入会审核",
      });
      return;
    }
    console.log("您已经提交过审核了，请耐心等待");
    uni.showToast({
      title: "您已经提交过审核了，请耐心等待",
      icon: "none",
      duration: 1000,
      success: () => {
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      },
    });
  }
  // 如果是会员，并且已经通过审核了
  else if (userState.value == 2) {
    console.log(baseFormData.value);
    // 但是是通过卡片进来的
    if (cardId.value) {
      console.log("通过卡片进来的");
      const res = await getReviewInfoById(cardId.value);
      console.log(res);
      userInfo.value = res.data[0];
      console.log(userInfo.value);
      // 遍历baseFormData.value的key,如果userInfo.value有这个key，就把userInfo.value的值赋给baseFormData.value
      for (const key in baseFormData.value) {
        if (userInfo.value.hasOwnProperty(key)) {
          (baseFormData.value as any)[key] = (userInfo.value as any)[key];
        }
      }
      console.log(baseFormData.value);
      uni.setNavigationBarTitle({
        title: "入会审核",
      });
      return;
    }
    uni.showToast({
      title: "您已经是会员了，不需要再申请了",
      icon: "none",
      duration: 1000,
      success: () => {
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      },
    });
  }
});
// 定义表单校验规则
const rules = ref({
  orgId: {
    rules: [
      {
        required: true,
        errorMessage: "请选择组织名称",
        trigger: "blur",
      },
    ],
  },
  account: {
    rules: [
      {
        required: true,
        errorMessage: "请输入工号",
        trigger: "blur",
      },
      {
        pattern: /^\d{11}$/,
        errorMessage: "工号格式不正确，工号输入格式为11位数字",
        trigger: "blur",
      },
    ],
  },
  name: {
    rules: [
      {
        required: true,
        errorMessage: "请输入姓名",
        trigger: "blur",
      },
      {
        pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
        errorMessage: "姓名不合法，请输入正确的姓名",
        trigger: "blur",
      },
    ],
  },
  idNumber: {
    rules: [
      {
        required: true,
        errorMessage: "身份证号不能为空",
        trigger: "blur",
      },
      {
        pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
        errorMessage: "身份证号不合法，请输入正确的身份证号",
        trigger: "blur",
      },
    ],
  },
  sex: {
    rules: [
      {
        required: true,
        errorMessage: "性别不能为空",
        trigger: "blur",
      },
    ],
  },
  nation: {
    rules: [
      {
        required: true,
        errorMessage: "民族不能为空",
        trigger: "blur",
      },
    ],
  },
  record: {
    rules: [
      {
        required: true,
        errorMessage: "学历不能为空",
        trigger: "blur",
      },
    ],
  },
  birthday: {
    rules: [
      {
        required: true,
        errorMessage: "出生日期不能为空",
        trigger: "blur",
      },
    ],
  },
  mobile: {
    rules: [
      {
        required: true,
        errorMessage: "手机号不能为空",
        trigger: "blur",
      },
      {
        pattern: /^1[3456789]\d{9}$/,
        errorMessage: "手机号格式不正确，请输入正确的手机号",
        trigger: "blur",
      },
    ],
  },
  email: {
    rules: [
      {
        required: true,
        errorMessage: "邮箱不能为空",
        trigger: "blur",
      },
      {
        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/,
        errorMessage: "邮箱格式不正确，请输入正确的邮箱",
        trigger: "blur",
      },
    ],
  },
});
// 定义校验name字段对象
const rulesName = ref({
  orgName: "orgId",
  workId: "account",
  name: "name",
  idCard: "idNumber",
  sex: "sex",
  nation: "nation",
  degree: "record",
  birthTime: "birthday",
  phoneNumber: "mobile",
  email: "email",
});

onReady(() => {
  console.log(customForm.value);
});

const clear = async () => {
  console.log("清空表单");
  // 校验表单
  const validateRes = await customForm.value.validate();
  console.log("1111");
  console.log(validateRes);
  console.log("2222");

  // const res = await customForm.value.validate().then((res: any) => {
  //   console.log('success', res);
  //   uni.showToast({
  //     title: `校验通过`
  //   })
  // }).catch((err: any) => {
  //   console.log('err', err);
  //   return
  // })
  // console.log(res)
  // console.log('3333')
};
const onClick = async (cardId: string) => {
  if (cardId && isAdmin.value) {
    const res = await passReview(cardId);
    console.log(res);
    console.log("审核通过");
    uni.showToast({
      title: "通过",
      success: function () {
        uni.navigateBack();
      },
    });
    return;
  }
  // baseFormData.value.birthday = translateTime(baseFormData.value.birthday)
  // 校验表单
  const validateRes = await customForm.value.validate();
  // 提交表单
  const res = await submitReview(baseFormData.value);
  console.log(res);
  if (res.code == -1) {
    uni.showToast({
      title: res.msg,
      icon: "none",
    });
    return;
  }
  // 更新用户状态
  if (!memberStore.profile)
    return uni.showToast({
      title: "请先登录",
      icon: "none",
      duration: 1000,
      success: () => {
        setTimeout(() => {
          uni.navigateTo({ url: "/pages/login/index" });
        }, 1000);
      },
    });
  memberStore.profile.userState = (await getReviewStatus()).data;
  uni.showToast({
    title: "提交成功",
    duration: 1500,
    success: () => {
      setTimeout(() => {
        uni.reLaunch({ url: "/pages/index/index" });
      }, 1500);
    },
  });
};
</script>
<template>
  <view class="container" v-if="userState == 0 || cardId">
    <uni-section :title="tittle" type="line" @click="clear"> </uni-section>
    <view class="example">
      <!-- 基础用法，不包含校验规则 -->
      <uni-forms :model="baseFormData" :rules="rules" ref="customForm" labelWidth="80px">
        <uni-forms-item required label="组织名称" :name="rulesName.orgName">
          <uni-data-select
            v-model="baseFormData.orgId"
            placeholder="请输入组织名称"
            :localdata="orgName"
          />
        </uni-forms-item>
        <uni-forms-item required label="工号" :name="rulesName.workId">
          <uni-easyinput v-model="baseFormData.account" placeholder="请输入工号" />
        </uni-forms-item>
        <uni-forms-item required label="会员姓名" :name="rulesName.name">
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item required label="身份证号" :name="rulesName.idCard">
          <uni-easyinput v-model="baseFormData.idNumber" placeholder="请输入身份证号" />
        </uni-forms-item>
        <uni-forms-item required label="性别" :name="rulesName.sex">
          <uni-data-checkbox
            v-model="baseFormData.sex"
            placeholder="请输入性别"
            :localdata="sexs"
          />
        </uni-forms-item>
        <uni-forms-item required label="民族" :name="rulesName.nation">
          <uni-data-select v-model="baseFormData.nation" :localdata="nationsData" />
        </uni-forms-item>
        <uni-forms-item required label="学历" :name="rulesName.degree">
          <uni-data-select v-model="baseFormData.record" :localdata="degreesData" />
        </uni-forms-item>
        <uni-forms-item required label="出生日期" :name="rulesName.birthTime">
          <uni-datetime-picker
            type="date"
            return-type="string"
            v-model="baseFormData.birthday"
          />
        </uni-forms-item>
        <uni-forms-item required label="手机" :name="rulesName.phoneNumber">
          <uni-easyinput v-model="baseFormData.mobile" placeholder="请输入手机号" />
        </uni-forms-item>
        <uni-forms-item required label="邮箱" :name="rulesName.email">
          <uni-easyinput v-model="baseFormData.email" placeholder="请输入邮箱" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="onClick(cardId)">
        {{ isAdmin ? "审核" : "提交" }}
      </button>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.example {
  padding: 15px;
  background-color: #fff;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  line-height: 35px;
  margin-left: 10px;
}
</style>
