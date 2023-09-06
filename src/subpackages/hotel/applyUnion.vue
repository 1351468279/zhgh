<script lang="ts" setup>
import { computed, ref } from 'vue'
import { translateTime } from '@/utils/tool'
import type { applyUnionType } from "@/types/hotel";
import { useApplyUnionStore } from '@/store/index'
const props = defineProps(['index'])
console.log(props.index)
const index = ref(props.index)

// 根据index设置表单回显数据
const formData = computed(() => {
  if (props.index) {
  }
})
console.log(index.value)
const store = useApplyUnionStore()
const { applier } = useApplyUnionStore()
const baseFormData = ref<applyUnionType>({
  unionName: '',
  jobId: '',
  name: '',
  idCard: '',
  sex: '',
  nationality: '',
  educational: '',
  birthday: NaN,
  phone: NaN,
  email: '',
  enterTime: NaN,
  status: false
})
// 根据index显示标题和设置回显数据
const tittle = computed(() => {
  if (props.index) {
    baseFormData.value = applier[index.value]
    uni.setNavigationBarTitle({
      title: '入会审核'
    });
    return '详细信息显示'
  }
  return '填写入会信息'
})

const onClick = (index: number) => {
  if (index) {
    applier[index].status = true
    uni.showToast({
      title: '通过',
      success: function () {
        uni.navigateBack()
      },
    });
    return console.log(index)
  }
  console.log(index)
  console.log(baseFormData.value)
  const date = new Date(baseFormData.value.birthday.toString());
  console.log(translateTime(date));
  store.setApplier(baseFormData.value)
  uni.showToast({
    title: '提交成功',
    duration: 1500,
    success: () => {
      uni.navigateBack();
    }
  });
}
const clear = () => {
  store.clearApplier()
}
</script>
<template>
  <view class="container">
    <uni-section :title="tittle" type="line" @click="clear">
    </uni-section>
    <view class="example">
      <!-- 基础用法，不包含校验规则 -->
      <uni-forms ref="baseForm" :model="baseFormData" labelWidth="80px">
        <uni-forms-item required label="组织名称">
          <uni-easyinput v-model="baseFormData.unionName" placeholder="请输入组织名称" />
        </uni-forms-item>
        <uni-forms-item required label="工号">
          <uni-easyinput v-model="baseFormData.jobId" placeholder="请输入工号" />
        </uni-forms-item>
        <uni-forms-item required label="会员姓名">
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入账号" />
        </uni-forms-item>
        <uni-forms-item required label="身份证号">
          <uni-easyinput v-model="baseFormData.idCard" placeholder="请输入身份证号" />
        </uni-forms-item>
        <uni-forms-item required label="性别">
          <uni-easyinput v-model="baseFormData.sex" placeholder="请输入性别" />
        </uni-forms-item>
        <uni-forms-item required label="民族">
          <uni-easyinput v-model="baseFormData.nationality" placeholder="请输入民族" />
        </uni-forms-item>
        <uni-forms-item required label="学历">
          <uni-easyinput v-model="baseFormData.educational" placeholder="请输入学历" />
        </uni-forms-item>
        <uni-forms-item required label="生日">
          <uni-datetime-picker type="datetime" return-type="timestamp" v-model="baseFormData.birthday" />
        </uni-forms-item>
        <uni-forms-item required label="手机">
          <uni-easyinput v-model="baseFormData.phone" placeholder="请输入手机号" />
        </uni-forms-item>
        <uni-forms-item required label="邮箱">
          <uni-easyinput v-model="baseFormData.email" placeholder="请输入邮箱" />
        </uni-forms-item>
        <uni-forms-item required label="入会时间">
          <uni-datetime-picker type="datetime" return-type="timestamp" v-model="baseFormData.enterTime" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="onClick(index)">{{ props.index ? '审核' : '提交' }}</button>
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