<script lang="ts" setup>
import NewsList from '@/components/NewsList.vue';
import TabBar from '@/components/TabBar.vue'
import { ref, computed } from 'vue';
import { welfareData } from '@/utils/index'
import type { listData } from '@/types/news'

const systemInfo = uni.getSystemInfoSync()
const loadingBox = ref(false)
const lower = () => {
    console.log(111)
    loadingBox.value = true

}
const newsList = computed(() => {
    return welfareData.value.filter(item => item.articleId === activeTag.value)[0].data
})

const scrollTop = ref(0)
const nav = ref()

const activeTag = ref(1)
const welfareList = ref<listData[]>([])
const onClick = (id: number) => {
    console.log(id)
    activeTag.value = id
}
const scroll = () => {
    console.log(1)
}
const loadingStatus = ref(false)
const onScrollLower = () => {
    loadingStatus.value = true

}
</script>

<template>
    <view class="welfare" :style="{ height: (systemInfo?.windowHeight - 50) + 'px' }">
        <view class="activityBox">
            <view class="activityNum" v-if="activeTag === 2">
                <view class="text">共计</view>
                <view class="num">327</view>
                <view class="text">个普惠活动</view>
            </view>
            <view class="mineNum" v-else>
                <view class="text">您可参与</view>
                <view class="num">22</view>
                <view class="text">个普惠活动</view>
            </view>
        </view>
        <view class="activityOption">
            <view class="available" :class="{ active: activeTag === item.articleId }" @click="onClick(item.articleId)"
                v-for="(item, index) in welfareData">{{ item.name }}</view>
        </view>
        <scroll-view class="newsScrollTop" scroll-y refresher-enabled :scroll-top="scrollTop" @scroll="scroll"
            lower-threshold="80" @scrolltolower="onScrollLower">
            <NewsList :newsList="newsList" :loadingStatus="loadingStatus"></NewsList>
        </scroll-view>
    </view>
    <TabBar :current-page="3" />
</template>

<style lang="scss" scoped>
.welfare {
    display: flex;
    flex-direction: column;

    .welfareList {
        flex: 1;
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
            border-bottom: 1px solid red;
        }
    }

    .newsScrollTop {
        flex: 1;
        width: 100%;
        overflow-y: auto;
        background-color: #eeeeee;

        .newsItem {
            width: 100%;
            height: 200rpx;
            background-color: white;
            margin: 20rpx;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .itemContent {
                width: 60%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                flex-direction: column;

                .contentTittle {
                    width: 100%;
                    height: 40%;
                    font-size: 30rpx;
                    padding: 0 20rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>