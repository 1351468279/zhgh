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
        <view class="search" hover-class="navigator-hover">
            <view class="iconfont icon">&#xe67d;</view>
            <view class="text">搜索</view>
        </view>
    </view>
    <view class="activityBox">
        <view class="activityNum">
            <view class="text">共计</view>
            <view class="num">327</view>
            <view class="text">个普惠活动</view>
        </view>
        <view class="mineNum">
            <view class="text">您可参与</view>
            <view class="num">22</view>
            <view class="text">个普惠活动</view>
        </view>
    </view>
    <view class="activityOption">
        <view class="available" :class="{ active: activeTag === 'some' }" @click="participate('some')">可参与</view>
        <view class="total" :class="{ active: activeTag === 'all' }" @click="participate('all')">全部</view>
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
            color: white;
        }

        .text {
            margin-left: 20rpx;
            font-size: 30rpx;
            color: white;
        }
    }
}

.activityBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100rpx;
    background-color: #FFBFA9;
    width: 100%;

    .activityNum {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        .text {
            font-size: 30rpx;
        }

        .num {
            font-size: 60rpx;
        }

        border-right: 1px solid white;
    }

    .mineNum {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        .text {
            font-size: 30rpx;
        }

        .num {
            font-size: 60rpx;
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
    height: 80rpx;
    background-color: #fff;

    .available {
        width: 50%;
        font-size: 30rpx;
        text-align: center;
        line-height: 80rpx;
    }

    .total {
        width: 50%;
        font-size: 30rpx;
        text-align: center;
        line-height: 80rpx;
    }

    .active {
        background-color: #FFEBB4;
        font-size: large;
        font-weight: bold;
    }
}
</style>