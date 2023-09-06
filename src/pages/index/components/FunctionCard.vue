<script lang="ts" setup>

</script>

<template>
    <view class="functioncard">
        <!-- <navigator class="funcarditem" url="/pages/index/loopdown" open-type="navigate" hover-class="navigator-hover"
            v-for="item in 6">
            <image class="icon" src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/nav_icon_1.png">
            </image>
            <text class="text">爱心驿站 </text>
        </navigator> -->
        <navigator class="advertiser" url="" open-type="navigate" hover-class="navigator-hover">
            <image class="advericon" src="@\static\images\index\xuanchuan.png">
            </image>
        </navigator>
    </view>
</template>

<style lang="scss" scoped>
.functioncard {
    display: flex;
    justify-content: space-around;
    background-color: white;
    width: 100%;
    border-bottom: 20rpx solid #e5e5e5;
    border-top: 20rpx solid #e5e5e5;

    .advertiser {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20rpx 0;

        .advericon {
            transform: scale(1.1);
            border-radius: 10rpx;
            height: 120rpx;
        }
    }

    // height:;

}
</style>