<script lang="ts" setup>
import { hotelData } from '@/composible/hotel'
import { computed, ref } from 'vue';
const hotelDataList = computed(() => hotelData.value.filter(item => item.mine))
const editStatus = ref(false)
const edit = () => {
    console.log('编辑')
    editStatus.value = !editStatus.value
    console.log(editStatus.value)
}
const reduce = (id: number) => {
    if (editStatus.value) {
        console.log(`减少${id}`)
        hotelData.value.forEach(item => {
            if (item.id === id) {
                item.mine = false
            }
        })
    }
    else {
        uni.navigateTo({
            url: '/pages/hotel/detail/index?id=' + id
        })
    }

}
const add = (id: number) => {
    if (editStatus.value) {
        console.log(`增加${id}`)
        hotelData.value.forEach(item => {
            if (item.id === id) {
                item.mine = true
            }
        })
    } else {
        uni.navigateTo({
            url: '/pages/hotel/detail/index?id=' + id
        })
    }

}
</script>
 

<template>
    <view class="hotel">
        <navigator class="search" hover-class="none" url="/pages/hotel/components/search">
            <view class="searchbar">
                <view class="text">搜索应用</view>
            </view>
        </navigator>
        <view class="mine">
            <view class="mineTittle">
                <view class="tittle">我的应用 </view>
                <view class="edit" @click="edit">{{ editStatus ? '完成' : '编辑' }}</view>
            </view>
            <view class="appBox">
                <view class="app" :class="{ editicon: editStatus }" v-for=" item  in hotelDataList" :key="item.id"
                    hover-class="navigator-hover" @click="reduce(item.id)">
                    <image class="appimg" :src="item.src" mode="scaleToFill" />
                    <view class="apptext">{{ item.content }}</view>
                    <view class="iconfont icon-jian" v-if="editStatus"></view>
                </view>
            </view>
        </view>
        <view class="all">
            <view class="tittle">全部应用</view>
            <view class="appBox">
                <view class="app" :class="{ editicon: editStatus }" v-for=" item  in hotelData" :key="item.id"
                    hover-class="navigator-hover" @click="add(item.id)">
                    <image class="appimg" :src="item.src" mode="scaleToFill" />
                    <view class="apptext">{{ item.content }}</view>
                    <view class="iconfont icon-add" v-if="editStatus === true && item.mine === false"></view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.hotel {
    display: flex;
    justify-content: space-around;
    flex-direction: column;

    .search {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80rpx;
        border-radius: 10rpx;

        .searchbar {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 90%;
            height: 60rpx;
            color: #808080;
            background-color: white;
            border: 1px solid #e5e5e5;
            border-radius: 30rpx;

            .text {
                margin-left: 20rpx;
            }
        }
    }

    .mine {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        border-bottom: 12px solid #f1f1f1;

        .mineTittle {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .tittle {
                font-size: large;
                font-weight: bold;
                margin: 30rpx 0 0 20rpx;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }

            .edit {
                margin: 30rpx 20rpx 0 0;
                display: flex;
                justify-content: space-around;
                align-items: center;
                color: #007aff;
            }
        }

        .appBox {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-top: 20rpx;

            .editicon {
                position: relative;

                .icon-jian {
                    position: absolute;
                    top: -8rpx;
                    right: 8rpx;
                    width: 30rpx;
                    height: 30rpx;
                    background-color: #f1f1f1;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 28rpx;
                }
            }

            .app {
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-direction: column;
                width: 150rpx;
                height: 150rpx;
                margin: 15rpx 0;

                .appimg {
                    width: 40%;
                    height: 40%;
                    background-color: #ffffff;
                    border-radius: 10rpx;
                }

                .apptext {
                    width: 100%;
                    text-align: center;
                    font-size: 28rpx;
                    color: #666666;
                }
            }
        }
    }

    .all {

        display: flex;
        justify-content: space-around;
        flex-direction: column;

        .tittle {
            font-size: large;
            font-weight: bold;
            margin: 30rpx 0 0 20rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .appBox {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-top: 20rpx;

            .editicon {
                position: relative;

                .iconfont {
                    position: absolute;
                    top: -8rpx;
                    right: 8rpx;
                    width: 30rpx;
                    height: 30rpx;
                    background-color: #f1f1f1;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30rpx;
                }
            }

            .app {
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-direction: column;
                width: 150rpx;
                height: 150rpx;
                margin: 15rpx 0;

                .appimg {
                    width: 40%;
                    height: 40%;
                    border-radius: 10rpx;

                    background-color: #ffffff;
                }

                .apptext {
                    width: 100%;
                    text-align: center;
                    font-size: 28rpx;
                    color: #666666;
                }
            }
        }
    }
}
</style>