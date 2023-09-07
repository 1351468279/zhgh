<script lang="ts" setup>
import { ref } from 'vue'
import { onMounted } from 'vue';
const tabbarList = ref([
    {
        id: 0,
        path: "/pages/index/index",
        text: "首页",
        icon: "/static/tabs/shouye_default.png",
        centerItem: false,
        selectIcon: "/static/tabs/shouye_selected.png"
    },
    {
        id: 1,
        path: "/pages/news/index",
        text: "新闻",
        icon: "/static/tabs/xinwen_default.png",
        centerItem: false,
        selectIcon: "/static/tabs/xinwen_selected.png"
    },
    {
        id: 2,
        path: "/pages/hotel/index",
        text: "服务大厅",
        icon: "https://www.zzgh.org/uploads/u/cms/www/202104/221221102apg.ico",
        centerItem: true,
        selectIcon: "https://www.zzgh.org/uploads/u/cms/www/202104/221221102apg.ico"
    },
    {
        id: 3,
        path: "/pages/welfare/index",
        text: "活动",
        icon: "/static/tabs/huodong_default.png",
        centerItem: false,
        selectIcon: "/static/tabs/huodong_selected.png"
    },
    {
        id: 4,
        path: "/pages/my/index",
        text: "我的",
        icon: "/static/tabs/wode_default.png",
        centerItem: false,
        selectIcon: "/static/tabs/wode_selected.png"
    }
])
const prpos = defineProps(['currentPage'])
const currentItem = prpos.currentPage;
const changeItem = (item: any) => {
    uni.switchTab({
        url: item.path
    });
    console.log(item.path)
}

</script>

<template>
    <view class="tabbar-container">
        <view v-for="(item, index) in tabbarList" :key="item.id" class="tabbar-item"
            :class="[item.centerItem ? 'center-item' : '']" @click="changeItem(item)">
            <view class="item-top">
                <img :src="currentItem == item.id ? item.selectIcon : item.icon" alt="Tab Icon">
            </view>
            <view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
                <span>{{ item.text }}</span>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
view {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.tabbar-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    box-shadow: 0 0 5px #999;
    display: flex;
    align-items: center;
    padding: 5rpx 0;
    color: #999999;
    background-color: #fff;

    .tabbar-item {
        width: 20%;
        height: 100rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        .item-top {
            width: 70rpx;
            height: 70rpx;
            padding: 10rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .item-bottom {
            font-size: 28rpx;
            width: 100%;
        }
    }

    .item-active {
        color: #f00;
    }

    .center-item {
        display: block;
        position: relative;

        .item-top {
            flex-shrink: 0;
            width: 100rpx;
            height: 100rpx;
            position: absolute;
            top: -50rpx;
            left: calc(50% - 50rpx);
            border-radius: 50%;
            box-shadow: 0 0 5px #ee5959;
            background-color: #ffffff;
        }

        .item-bottom {
            position: absolute;
            font-size: 28rpx;
            bottom: 0rpx;
        }
    }
}
</style> 