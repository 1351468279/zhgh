import { defineStore } from "pinia";
import type {applyUnionType} from '@/types/hotel'
import { ref } from "vue";
export const useApplyUnionStore=defineStore('applyUnion',()=>{
    const applier =ref<applyUnionType[]>([])
    const setApplier =(val:applyUnionType)=>{
        applier.value.push(val)
    }
    const clearApplier =()=>{
        applier.value=[]
    }
    return {
        applier,
        setApplier,
        clearApplier
    }
},{
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