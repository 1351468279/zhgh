<script lang="ts" setup>
import { ref } from 'vue';

const systemInfo = ref(uni.getSystemInfoSync());
const props = defineProps([
    'leftTittle',
    'rightTittle',
    'image',
    'rightTag'
])
</script>

<template>
    <view class="box" :style="{ width: (systemInfo.windowWidth - 40) + 'px' }">
        <view class="leftBox">
            <view class="leftContent" v-if="props.leftTittle">{{ props.leftTittle }}</view>
        </view>
        <view class="rightBox">
            <view class="rightContent">
                <view class="content" v-if="props.rightTittle"> {{ props.rightTittle }}</view>
                <image v-if="props.image" class="img" :src="props.image" mode="scaleToFill" />
            </view>
            <view class="icon iconfont " v-if="rightTag">&#xe637;</view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.box {
    height: 100rpx;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 20rpx;

    .leftBox {
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 20rpx;
    }

    .rightBox {
        width: 70%;
        height: 100%;
        display: flex;
        align-items: center;

        .rightContent {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .content {
                margin-right: 20rpx;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .img {
                height: 70rpx;
                width: 70rpx;
                margin-right: 20rpx;
            }

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }


}
</style>