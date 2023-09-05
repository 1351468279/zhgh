<script lang="ts" setup>
import { ref } from 'vue'
import { translateTime } from '@/utils/tool'
const baseFormData = ref({
  unionName: '',
  jobId: null,
  name: '',
  idCard: '',
  sex: '',
  nationality: '',
  educational: '',
  birthday: '',
  phone: NaN,
  age: NaN,
  email: '',
  enterTime: ''
})


const submit = () => {
  console.log(baseFormData.value)
  const date = new Date(baseFormData.value.birthday);


  console.log(translateTime(date));
}
</script>
<template>
  <view class="container">
    <uni-section title="填写入会信息" type="line">
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
        <button type="primary" @click="submit()">提交</button>
      </view>
    </uni-section>
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