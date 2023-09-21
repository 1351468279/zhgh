import { defineStore } from "pinia";
import type { applySanYuType } from '@/types/hotel'
import { ref } from "vue";

export const useApplySanYuStore = defineStore('applySanYu', () => {
    const applier = ref<applySanYuType[]>([
        {
            name: '2',
            idNumber: '2',
            sex: 1,
            nation: '2',
            record: '2',
            age: '1',
            politicalStr: '2',
            bachelor: '1',
            employer: '1',
            jobTittle: '1',
            position: '1',
            workExperience: '1',
            status: '1',
        }
    ])
    const setApplier = (val: applySanYuType) => {
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