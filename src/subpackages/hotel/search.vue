<script lang="ts" setup>
import type { InputOnInputEvent } from '@uni-helper/uni-app-types';
import { hotelData } from '@/composible/hotel'
import type { hotelApp } from '@/types/hotel'

import { ref } from 'vue';
let hotelDataList = ref<hotelApp[]>([])
const onkeyDown = (e: InputOnInputEvent) => {
    if (e.detail.value === '') {
        hotelDataList.value = []
        return
    }
    console.log(e.detail.value)
    hotelDataList.value = hotelData.value.filter(item => item.content.includes(e.detail.value))
    console.log(hotelDataList)
}
const onClick = (id: number) => {
    uni.navigateTo({
        url: '/subpackages/hotel/detail?id=' + id
    })
}
</script>

<template>
    <view class="search">
        <view class="head">
            <view class="iconfont icon">&#xe741;</view>
            <view class="model">
                <view class="uni-form-item uni-column">
                    <input class="uni-input" focus placeholder="请输入关键字" @input="onkeyDown" />
                </view>
            </view>
        </view>
        <view class="searchbox" v-show="hotelDataList.length > 0">
            <view class="searchlist" v-for="item in hotelDataList" hover-class="navigator-hover" @click="onClick(item.id)">
                <img class="image" :src="item.src" alt="">
                <view class="text">{{ item.content }}</view>
            </view>
        </view>

    </view>
</template>

<style lang="scss" scoped>
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .head {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 90%;
        height: 80rpx;
        border: 1px solid #e5e5e5;
        border-radius: 20rpx;

        .icon {
            margin-left: 20rpx;
            font-size: 40rpx;
        }

        .model {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 20rpx;
        }
    }

    .searchbox {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;

        .searchlist {
            width: 87%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 30rpx 15rpx;
            border-radius: 15rpx;

            .image {
                width: 50rpx;
                height: 50rpx;
                border-radius: 10%;
                margin-left: 20rpx;
            }

            .text {
                font-size: 28rpx;
                margin-left: 20rpx;
            }
        }
    }
}
</style>