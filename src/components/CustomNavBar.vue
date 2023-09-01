<script lang="ts" setup>
import { ref } from 'vue'
import type { unionType } from '@/types/index'
import { defineProps } from 'vue'
const { safeAreaInsets } = uni.getSystemInfoSync()
const props = defineProps({
    title: {
        type: String
    }
})
const popup = ref()
const unionname = ref('郑州市总工会')
const onClick = () => {
    console.log('点击了')
    popup.value.open('center')
}
const closeDialog = (item: unionType) => {
    unionname.value = item.name
    console.log(item)
    popup.value.close()
}
</script>
<template>
    <!-- 顶部占位 -->
    <view class="navbar">
        <view class="tittle" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">{{ props.title }}</view>
    </view>
</template>

<style lang="scss" scoped>
.navbar {
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;

    .tittle {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        margin: 20rpx;
    }
}
</style>