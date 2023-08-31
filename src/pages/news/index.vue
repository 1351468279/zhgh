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
    const itemWidth = systemInfo.windowWidth * 0.15; // 假设每个元素宽度为屏幕宽度的 20%
    const scrollDistance = index * itemWidth - systemInfo.windowWidth * 0.4; // 滚动到元素中间位置
    scrollLeft.value = scrollDistance < 0 ? 0 : scrollDistance;
};

const newsList = computed(() => {
    return listTotalData.value.filter(item => item.id === activeValue.value)[0].data
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
        listTotalData.value[activeValue.value - 1].data.push({ id: 6, image: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_1.jpg', area: '新郑市总工会', viewNum: 1212, content: '文章标题阿，萨大sasadad松大打赏撒大' })
        loadingStatus.value = false
        clearTimeout(timer)
    }, 2000)
}
</script>
    
<template>
    <view class="news" :style="{ height: systemInfo.windowHeight + 'px' }">
        <CustomNavBar :title="'新闻'"></CustomNavBar>
        <scroll-view class="newsScrollLeft" scroll-x :scroll-left="scrollLeft" scroll-with-animation @scroll="onScrollLeft">
            <view class="newsItem" :class="{ active: activeValue === item.id }" v-for="(item, index ) in listTotalData"
                @click="onClick(item.id, index)">
                {{ item.name }}
            </view>
        </scroll-view>
        <scroll-view class="newsScrollTop" scroll-y :scroll-top="scrollTop" @scroll="onScrollTop"
            @scrolltolower="onScrollTopLower">
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


    .newsScrollLeft {
        white-space: nowrap;
        width: 90%;

        .newsItem {
            display: inline-block;
            width: 15%;
            height: 70rpx;
            line-height: 70rpx;
            text-align: center;
            font-size: 28rpx;
        }

        .active {
            border-bottom: 3px solid #ff0000;
        }
    }

    .newsScrollTop {
        width: 100%;
        flex: 1;
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

            .image {
                width: 40%;
                height: 90%;
                display: flex;
                justify-content: center;
                align-items: center;

                .img {
                    width: 100%;
                    height: 100%;
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
                    width: 100%;
                    height: 40%;
                    font-size: 30rpx;
                    padding: 0 20rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .contentTag {
                    width: 100%;
                    height: 60%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 20rpx;

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
    }
}
</style>