<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { applySanYuType } from '@/types/hotel'
import { useApplySanYuStore, useMemberStore } from '@/store';
import { getUserInfo } from "@/services/applySanYu"
import { getReviewStatus } from "@/services/applyUnion"
import { onShow } from '@dcloudio/uni-app';
const memberStore = useMemberStore()
const baseFormData = ref<applySanYuType>({
  name: '',
  age: '',
  idNumber: '',
  sex: 1,
  nation: '',
  record: '',
  politicalStr: '',
  bachelor: '',
  employer: '',
  jobTittle: '',
  position: '',
  workExperience: ''
})
// 定义单选数据源
const sexs = ref([{
  text: '男',
  value: 0
}, {
  text: '女',
  value: 1
}])
const props = defineProps(['index'])
const index = ref(props.index)
const sanYustore = useApplySanYuStore()
// 根据index显示标题和设置回显数据
const tittle = computed(() => {
  if (props.index) {
    baseFormData.value = sanYustore.applier[index.value]
    uni.setNavigationBarTitle({
      title: '入会审核'
    });
    return '详细信息显示'
  }
  return '填写入会信息'
})
onShow(() => {
  // 如果是管理员
  if (memberStore.profile?.userVo?.roleType?.includes('SystemAdmin') == true) {
    console.log('管理员');
    return
  }
  // 如果是普通会员
  else {
    // 获取用户信息,进行数据回显
    getUserInfo().then(res => {
      console.log(res)
    })
  }
})
</script>

<template>
  <view class="sanYuBox">
    <uni-section :title="tittle" type="line" />
    <uni-forms :model="baseFormData" label-width="80px">
      <uni-forms-item required label="姓名">
        <uni-easyinput v-model="baseFormData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item required label="年龄">
        <uni-easyinput v-model="baseFormData.age" type="number" placeholder="请输入年龄" />
      </uni-forms-item>
      <uni-forms-item required label="性别">
        <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" mode="default" />
      </uni-forms-item>
      <uni-forms-item required label="民族">
        <uni-easyinput v-model="baseFormData.nation" type="text" placeholder="请输入民族" />
      </uni-forms-item>
      <uni-forms-item required label="政治面貌">
        <uni-easyinput v-model="baseFormData.politicalStr" type="text" placeholder="请输入政治面貌" />
      </uni-forms-item>
      <uni-forms-item required label="学历">
        <uni-easyinput v-model="baseFormData.record" type="text" placeholder="请输入学历" />
      </uni-forms-item>
      <uni-forms-item required label="学位">
        <uni-easyinput v-model="baseFormData.bachelor" type="text" placeholder="请输入学位" />
      </uni-forms-item>
      <uni-forms-item required label="工作单位">
        <uni-easyinput v-model="baseFormData.employer" type="text" placeholder="请输入工作单位" />
      </uni-forms-item>
      <uni-forms-item required label="职称">
        <uni-easyinput v-model="baseFormData.jobTittle" type="text" placeholder="请输入职称" />
      </uni-forms-item>
      <uni-forms-item required label="职务">
        <uni-easyinput v-model="baseFormData.position" type="text" placeholder="请输入职务" />
      </uni-forms-item>
      <uni-forms-item required label="上传先进事迹">
        <uni-file-picker :limit="9" v-model="baseFormData.workExperience" file-mediatype="image" />
      </uni-forms-item>
      <button @click="">保存</button>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.sanYuBox {
  padding: 15px;
  background-color: #fff;
}
</style>