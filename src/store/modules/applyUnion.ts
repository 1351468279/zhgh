import { defineStore } from "pinia";
import type { applyUnionType } from '@/types/hotel'
import { ref } from "vue";
export const useApplyUnionStore = defineStore('applyUnion', () => {
  const applier = ref<applyUnionType[]>([{
    unionName: '财大',
    jobId: '19160102038',
    name: '姬如雪',
    idCard: '412702199862156324',
    sex: '女',
    nationality: '汉',
    educational: '本科',
    birthday: 1693537841000,
    phone: 16666666666,
    email: '1666666666@qq.com',
    enterTime: 1696043474000,
    status: false
  }, {
    unionName: '财大',
    jobId: '19160102039',
    name: '李星云',
    idCard: '412702199905340157',
    sex: '男',
    nationality: '汉',
    educational: '本科',
    birthday: 1693537841000,
    phone: 18888888888,
    email: '1666666666@qq.com',
    enterTime: 1696043474000,
    status: false
  }])
  const setApplier = (val: applyUnionType) => {
    applier.value.push(val)
  }
  const clearApplier = () => {
    applier.value = []
  }
  return {
    applier,
    setApplier,
    clearApplier
  }
}, {
  // 配置持久化
  persist: {
    // 调整为兼容多端的API
    storage: {
      setItem(key, value) {
        uni.setStorageSync(key, value)
      },
      getItem(key) {
        return uni.getStorageSync(key)
      },
    },
  },
})