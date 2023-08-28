<script lang="ts" setup>

</script>

<template>
    <view class="functioncard">
        <navigator class="funcarditem" url="/pages/index/loopdown" open-type="navigate" hover-class="navigator-hover"
            v-for="item in 6">
            <image class="icon" src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/nav_icon_1.png">
            </image>
            <text class="text">爱心驿站 </text>
        </navigator>
        <navigator class="advertiser" url="/pages/index/loopdown" open-type="navigate" hover-class="navigator-hover">
            <image class="advericon" src=" ">
            </image>
        </navigator>
    </view>
</template>

<style lang="scss" scoped>
.functioncard {
    margin: 20rpx 0 0;
    display: flex;
    justify-content: space-around;
    background-color: white;
    flex-wrap: wrap;


    .funcarditem {
        border-radius: 15rpx;
        margin: 20rpx;
        width: 320rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background-color: rgb(168, 224, 219);

        .icon {
            // flex: 1;
            width: 100rpx;
            height: 100rpx;
        }

        .text {
            // flex: 2;
            font-size: 26rpx;
            color: #666;
        }
    }

    .advertiser {
        display: flex;
        justify-content: center;
        align-items: center;

        .advericon {
            border-radius: 15rpx;
            padding: 20rpx;
            width: 650rpx;
            height: 100rpx;
            background-color: rgb(168, 224, 219);
            margin-bottom: 20rpx;
        }
    }

    // height:;

}
</style>