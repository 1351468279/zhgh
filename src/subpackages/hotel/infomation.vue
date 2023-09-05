<script lang="ts" setup>
import { ref } from 'vue'
import { translateTime } from '@/utils/tool'
import { onLoad } from '@dcloudio/uni-app'
const baseFormData = ref({
  unionName: '',
  jobId: '',
  name: '',
  idCard: '',
  sex: '',
  nationality: '',
  educational: '',
  birthday: '',
  phone: NaN,
  email: '',
  enterTime: ''
})

const baseFormDataOne = ref({
  unionName: '工会',
  jobId: '19160102039',
  name: '李星宇',
  idCard: '412702199601520145',
  sex: '男',
  nationality: '汉',
  educational: '本科',
  birthday: '1999-03-12',
  phone: 17700546369,
  email: '1457453698@qq.com',
  enterTime: '2023-09-05'
})
const baseFormDataTwo = ref({
  unionName: '工会',
  jobId: '19160102056',
  name: '王玉鹏',
  idCard: '412702199905240145',
  sex: '女',
  nationality: '汉',
  educational: '本科',
  birthday: '1999-08-16',
  phone: 177632587369,
  email: '1397756698@qq.com',
  enterTime: '2023-09-05'
})

// const submit = () => {
//   console.log(baseFormData.value)
//   const date = new Date(baseFormData.value.birthday);


//   console.log(translateTime(date));
// }
let id: any = null
onLoad((val) => {
  if (val) {
    id = val;
    console.log(id)
    baseFormData.value = baseFormDataTwo.value
  }
  else {
    baseFormData.value = baseFormDataOne.value
  }
});
</script>
<template>
  <view class="container">
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
      <button type="primary" v-if="id">审核</button>
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