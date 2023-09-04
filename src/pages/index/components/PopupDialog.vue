<script lang="ts" setup>
import { reactive } from 'vue'
import type { unionType } from '@/types/index'
const emits = defineEmits(['onClose'])
const unionlist = reactive([
    { id: 1, name: '1总工会' },
    { id: 2, name: '2总工会' },
    { id: 3, name: '3总工会' }
])
const onClick = (item: unionType) => {
    console.log(item)
    emits('onClose', item)
}
</script>

<template>
    <view class="unionbox">
        <view class="uniontittle">切换工会</view>
        <view class="unionlist">
            <view class="unionitem" v-for="item in unionlist" :key="item.id" @click="onClick(item)">
                <view class="unionname">{{ item.name }}</view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.unionbox {
    padding: 20rpx 100rpx;
    background-color: #fff;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .uniontittle {
        font-weight: bold;
        font-size: 32rpx;
        color: #333;
        margin-bottom: 20rpx;
    }

    .unionlist {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .unionitem {
            width: 300rpx;
            height: 80rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 20rpx;
            background-color: #e4e1e1;
            border-radius: 20rpx;

            .unionname {
                font-size: 28rpx;
                color: #333;
            }
        }
    }
}
</style>