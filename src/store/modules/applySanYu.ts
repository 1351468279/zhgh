import { defineStore } from "pinia";
import { ref } from "vue";
type applySanYuType = {
    name: string,
    title: string,
    unit: string,
    age: string,
    process: string,
}
export const useApplySanYuStore = defineStore('applySanYu', () => {
    const applier = ref<applySanYuType[]>([
        {
            name: '2',
            title: '职位',
            unit: '工作单位',
            age: '1',
            process: '0',
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