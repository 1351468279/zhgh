<script lang="ts" setup>

</script>

<template>
    <view class="search">
        <view class="head">
            <view class="iconfont icon-peixun icon"></view>
            <view class="model">
                <view class="uni-form-item uni-column">
                    <input class="uni-input" focus placeholder="搜索应用" />
                </view>
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
        justify-content: start;
        align-items: center;
        width: 90%;
        height: 80rpx;
        border: 1px solid #e5e5e5;
        border-radius: 20rpx;

        .icon {
            margin-left: 20rpx;
        }

        .model {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            margin-left: 20rpx;
        }
    }
}
</style>