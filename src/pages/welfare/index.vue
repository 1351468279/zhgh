<script lang="ts" setup>
import CustomNavbar from '@/components/CustomNavBar.vue';
import SearchBar from '@/pages/welfare/components/SearchBar.vue'
import { ref } from 'vue';
const systemInfo = uni.getSystemInfoSync()
const loadingBox = ref(false)
const lower = () => {
    console.log(111)
    loadingBox.value = true
    // shuju.value += 10
}
const shuju = ref(10)
const scroll = () => {
    console.log(222)
    console.log(systemInfo)
    console.log(systemInfo.windowHeight)
}
const scrollTop = ref(0)
const nav = ref()
console.log(nav)
</script>

<template>
    <view class="page" :style="{ height: systemInfo?.windowHeight + 'px' }">
        <!-- <CustomNavbar :title="'活动'"></CustomNavbar> -->
        <SearchBar class="ceshi"></SearchBar>
        <scroll-view class="activityList" refresher-enabled scroll-y show-scrollbar :scroll-top="scrollTop"
            @scrolltolower="lower" @scroll="scroll">
            <view class="listItem" v-for="item in shuju">
                <view class="itemImg"><img class="image"
                        src="http://cloud.zhgn.cn:808/phone/unionpicture/synodmeetings.png">
                </view>
                <view class="itemContent">
                    <view class="contentTittle">文章标题</view>
                    <view class="contentTag">
                        <view class="area">
                            <view class="iconfont icon">&#xe686;</view>
                            <view class="areaTeam">新郑市总工会</view>
                        </view>
                        <view class="viewNum">
                            <view class="iconfont icon">&#xe686;</view>
                            <view class="num">1212</view>
                        </view>
                    </view>
                </view>
            </view>
            <view :class="{ loadingBox }" v-if="loadingBox">
                <view>正在加载...</view>
            </view>
        </scroll-view>
    </view>
</template>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;


    .activityList {
        flex: 1;
        overflow-y: auto;
        /* 允许垂直滚动 */

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #eeeeee;



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
                height: 90%;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                flex-direction: column;
                margin-right: 10rpx;

                .contentTittle {
                    padding: 0 20rpx;
                    font-size: 30rpx;
                    width: 90%;
                }

                .contentTag {
                    width: 90%;
                    height: 30%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-right: 10rpx;
                    font-size: 25rpx;

                    .area {
                        width: 70%;
                        height: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;

                        .areaTeam {
                            color: #949699;
                        }
                    }

                    .viewNum {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        width: 30%;

                        .num {
                            color: #949699;
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
    }
}
</style>