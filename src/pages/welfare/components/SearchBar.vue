<script lang="ts" setup>
import { ref } from 'vue'
const activeTag = ref('some')
const participate = (val: string) => {
    if (val === 'some') {
        activeTag.value = val
        console.log('some')
    }
    else {
        activeTag.value = val
        console.log('all')
    }
}
</script>

<template>
    <view class="searchBox">
        <!-- <view class="search" hover-class="navigator-hover">
            <view class="iconfont icon">&#xe67d;</view>
            <view class="text">搜索</view>
        </view> -->
    </view>
</template>

<style lang="scss" scoped>
.searchBox {
    background-color: #f0938c;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .search {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80rpx;
        background-color: #f0938c;
        width: 100%;
        border: 1px solid #eccecc;

        .icon {
            margin-left: 20rpx;
            font-size: 60rpx;
            color: black;
        }

        // .text {
        //     margin-left: 20rpx;
        //     font-size: 30rpx;
        //     color: white;
        // }
    }
}

.activityBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80rpx;
    background-color: white;
    width: 100%;

    .activityNum {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #949699;

        .text {
            font-size: 25rpx;
            color: #949699;

        }

        .num {
            color: #949699;

            font-size: 40rpx;
        }

    }

    .mineNum {
        display: flex;
        justify-content: center;
        align-items: center;

        .text {
            font-size: 25rpx;
            color: #949699;

        }

        .num {
            font-size: 40rpx;
            color: #949699;

        }

        .icon {
            font-size: 60rpx;
        }
    }
}

.activityOption {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50rpx;

    .available {
        width: 50%;
        font-size: 30rpx;
        text-align: center;
        line-height: 60rpx;
    }

    .total {
        width: 50%;
        font-size: 30rpx;
        text-align: center;
        line-height: 60rpx;

    }

    .active {
        font-size: large;
        font-weight: bold;
        border-bottom: 10px solid red;
    }
}
</style>