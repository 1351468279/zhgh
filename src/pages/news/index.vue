<script lang="ts" setup>
import CustomNavBar from '@/components/CustomNavBar.vue';
import NewsList from '@/components/NewsList.vue';
import { ref, computed } from 'vue';
import { listTotalData } from '@/utils/index'
const scrollLeft = ref(0)
const systemInfo = uni.getSystemInfoSync()
console.log(systemInfo)
const activeValue = ref(1)
const onClick = (id: number, index: number) => {
    activeValue.value = id;
    // 计算需要滚动的距离
    const itemWidth = systemInfo.windowWidth * 0.2; // 假设每个元素宽度为屏幕宽度的 20%
    const scrollDistance = index * itemWidth - systemInfo.windowWidth * 0.4; // 滚动到元素中间位置
    scrollLeft.value = scrollDistance < 0 ? 0 : scrollDistance;
};

const newsList = computed(() => {
    return listTotalData.value.filter(item => item.articleId === activeValue.value)[0].data
})
const onScrollLeft = (e: any) => {
    console.log(e)
}

const scrollTop = ref(0)
const onScrollTop = (e: any) => {
    console.log(e)
}
let timer: any = null
const loadingStatus = ref(false)
const onScrollTopLower = () => {
    if (loadingStatus.value) return
    loadingStatus.value = true
    console.log('到底了')
    timer = setTimeout(() => {
        listTotalData.value[activeValue.value - 1].data.push({ id: 6, image: 'http://cloud.zhgn.cn:808/phone/unionpicture/synodmeetings.png', tittle: '文章标题', area: '新郑市总工会', viewNum: 1212, content: '文章内容', time: '2023-07-16' })
        loadingStatus.value = false
        clearTimeout(timer)
    }, 200)
}
</script>
    
<template>
    <view class="news" :style="{ height: (systemInfo.windowHeight) + 'px' }">
        <!-- <CustomNavBar class="nav" :tittle="'新闻'"></CustomNavBar> -->
        <scroll-view class="newsScrollLeft" scroll-x :scroll-left="scrollLeft" scroll-with-animation @scroll="onScrollLeft">
            <view class="newsItem" :class="{ active: activeValue === item.articleId }"
                v-for="(item, index ) in listTotalData" @click="onClick(item.articleId, index)">
                {{ item.name }}
            </view>
        </scroll-view>
        <scroll-view class="newsScrollTop" scroll-y refresher-enabled :scroll-top="scrollTop" @scroll="onScrollTop"
            lower-threshold="80" @scrolltolower="onScrollTopLower">
            <NewsList :newsList="newsList" :loadingStatus="loadingStatus"></NewsList>
        </scroll-view>
    </view>
</template>

<style lang="scss" scoped>
.news {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    .nav {
        width: 100%;
    }

    .newsScrollLeft {
        white-space: nowrap;
        width: 100%;

        .newsItem {
            display: inline-block;
            width: 20%;
            height: 70rpx;
            line-height: 70rpx;
            text-align: center;
            font-size: 28rpx;
            color: gray;
        }

        .active {
            color: black;
            font-weight: bold;
            font-size: 35rpx;
            border-bottom: 3px solid #ff0000;
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