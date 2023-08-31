<script lang="ts" setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import type { listData } from '@/types/news'

const props = defineProps({
    newsList: {
        type: Array as () => listData[],
        default: () => []
    },
    loadingStatus: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <view class="listItem" v-for=" (item, index)  in props.newsList">
        <view class="itemImg"><img class="image" :src="item.image">
        </view>
        <view class="itemContent">
            <view class="contentTittle">{{ item.content }}</view>
            <view class="contentTag">
                <view class="area">
                    <view class="iconfont icon">&#xe686;</view>
                    <view class="areaTeam">{{ item.area }}</view>
                </view>
                <view class="viewNum">
                    <view class="iconfont icon">&#xe686;</view>
                    <view class="num">{{ item.viewNum }}</view>
                </view>
            </view>
        </view>
    </view>
    <view :class="{ loadingBox: loadingStatus }" v-if="loadingStatus">
        <view>正在加载...</view>
    </view>
</template>

<style lang="scss" scoped>
.listItem {
    width: 95%;
    height: 200rpx;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #e5e5e5;
    border-radius: 20rpx;
    margin: 15rpx auto;

    .itemImg {
        height: 90%;
        width: 40%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10rpx;

        .image {
            border: 1px solid #e5e5e5;
            width: 80%;
            height: 90%;
            border-radius: 20rpx;
        }
    }

    .itemContent {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;

        .contentTittle {
            width: 90%;
            height: 60%;
            font-size: 30rpx;
            padding: 0 20rpx;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        }

        .contentTag {
            width: 90%;
            height: 40%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .area {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .icon {
                    font-size: 30rpx;
                    color: #ff0000;
                }

                .areaTeam {
                    font-size: 28rpx;
                    color: #666666;
                }
            }

            .viewNum {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .icon {
                    font-size: 30rpx;
                    color: #ff0000;
                }

                .num {
                    font-size: 28rpx;
                    color: #666666;
                }
            }
        }
    }
}

.loadingBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60rpx;
    width: 100%;
}
</style>