<script lang="ts" setup>
import CustomNavBar from '@/components/CustomNavBar.vue';
import { ref } from 'vue';
const scrollLeft = ref(0)
const systemInfo = uni.getSystemInfoSync()
console.log(systemInfo)
const tittleData = ref([
    { id: 1, name: '人生' },
    { id: 2, name: '生活' },
    { id: 3, name: '历史' },
    { id: 4, name: '人生' },
    { id: 5, name: '生活' },
    { id: 6, name: '历史' },
    { id: 7, name: '人生' },
    { id: 8, name: '生活' },
    { id: 9, name: '历史' },
])
const activeValue = ref(1)
const onClick = (id: number) => {
    activeValue.value = id
}
const ceshi = (e: any) => {
    console.log(e)
    scrollLeft.value = e.detail.scrollLeft
}
</script>

<template>
    <view class="news">
        <CustomNavBar :title="'新闻'"></CustomNavBar>

        <scroll-view class="newsScroll" :scroll-x="true" :scroll-left="scrollLeft" scroll-with-animation @scroll="ceshi">
            <view class="newsItem" :class="{ active: activeValue === item.id }" v-for="(item, index ) in tittleData"
                @click="onClick(item.id)">
                {{ item.name }}
            </view>
        </scroll-view>
    </view>
</template>

<style lang="scss" scoped>
.news {
    .newsScroll {
        white-space: nowrap;
        width: 100%;

        .newsItem {
            display: inline-block;
            width: 20%;
            height: 100rpx;
            line-height: 100rpx;
            text-align: center;
            font-size: 36rpx;
        }

        .active {
            border-bottom: 2px solid #726e6e;
        }
    }
}
</style>