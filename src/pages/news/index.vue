<script lang="ts" setup>
import CustomNavBar from "@/components/CustomNavBar.vue";
import NewsList from "@/components/NewsList.vue";
import TabBar from "@/components/TabBar.vue";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useMemberStore } from "@/store/modules/member";
import { getNewsCategoryList, type categoryItemType, getNewsListById, type newsItem } from "@/services/indexNews";
const scrollLeft = ref(0);
const systemInfo = uni.getSystemInfoSync();
console.log(systemInfo);
const activeValue = ref('');
// 定义页数
const page = ref(1)
// 接受新闻总条数
const total = ref()
const onClick = (id: string, index: number) => {
    activeValue.value = id;
    // 计算需要滚动的距离
    const itemWidth = systemInfo.windowWidth * 0.2; // 假设每个元素宽度为屏幕宽度的 20%
    const scrollDistance = index * itemWidth - systemInfo.windowWidth * 0.4; // 滚动到元素中间位置
    scrollLeft.value = scrollDistance < 0 ? 0 : scrollDistance;
    // 获取新闻列表
    page.value = 1
    getNewsListById({ page: page.value, pageSize: 5, lMid: activeValue.value }).then((res) => {
        newsList.value = res.rows
        total.value = res.total
    })
};

// const newsList = computed(() => {
//   return listTotalData.value.filter((item) => item.articleId === activeValue.value)[0]
//     .data;
// });
const onScrollLeft = (e: any) => {
    console.log(e);
};

const scrollTop = ref(0);
const onScrollTop = (e: any) => {
    console.log(e);
};
let timer: any = null;
const loadingStatus = ref(false);
const onScrollTopLower = () => {
    // if (loadingStatus.value) return;
    console.log('长度', newsList.value?.length)
    console.log(newsList.value)
    if (newsList.value?.length! >= total.value) return;
    loadingStatus.value = true;
    console.log("到底了");
    page.value++
    getNewsListById({ page: page.value, pageSize: 5, lMid: activeValue.value }).then((res) => {
        console.log(8585)
        console.log(res.rows)
        newsList.value?.push(...(res.rows as newsItem[]))
        console.log(newsList.value)
    })
    // listTotalData.value[activeValue.value - 1].data.push({ id: 6, image: 'http://cloud.zhgn.cn:8092/cdgh/phone/unionpicture/synodmeetings.png', area: '新郑市总工会', viewNum: 1212, content: '文章内容', tittle: '文章标题', time: '2023-01-02' })
    loadingStatus.value = false;
};

const memberStore = useMemberStore();

const newsCategory = ref<categoryItemType[]>();
// 接收新闻列表
const newsList = ref<newsItem[]>()
const enabled = ref(false)
// 左右图标及数据
const lefticon = ref(null);
const righticon = ref("\uE60F");
const onPullDownRefresh = () => {
    enabled.value = true
    setTimeout(() => {
        page.value = 1
        getNewsListById({
            page: page.value,
            pageSize: 5,
            lMid: activeValue.value,
        }).then((res) => {
            console.log(activeValue.value);
            console.log(5454);
            newsList.value = res.rows;
            total.value = res.total;
        });
        enabled.value = false
    }, 300)
};
onLoad(() => {
    if (memberStore.profile?.token) {
        console.log("已登录");
        getNewsCategoryList()
            .then((res) => {
                newsCategory.value = res.body?.categoryList;
                activeValue.value = res.body?.categoryList[0].id as string;
            })
            .then(() => {
                getNewsListById({
                    page: page.value,
                    pageSize: 5,
                    lMid: activeValue.value,
                }).then((res) => {
                    console.log(activeValue.value);
                    console.log(5454);
                    newsList.value = res.rows;
                    total.value = res.total;
                });
            });
    } else {
        uni.navigateTo({
            url: "/pages/login/index",
        });
    }
});
</script>

<template>
  <view class="news" :style="{ height: systemInfo.windowHeight - 50 + 'px' }">
    <!-- <CustomNavBar class="nav" :tittle="'新闻'"></CustomNavBar> -->
    <scroll-view
      class="newsScrollLeft"
      scroll-x
      :scroll-left="scrollLeft"
      scroll-with-animation
      @scroll="onScrollLeft"
    >
      <view
        class="newsItem"
        :class="{ active: activeValue === item.id }"
        v-for="(item, index) in newsCategory"
        @click="onClick(item.id, index)"
      >
        {{ item.xmmche }}
      </view>
    </scroll-view>
    <scroll-view
      class="newsScrollTop"
      scroll-y
      refresher-enabled
      :refresherThreshold="45"
      :refresher-triggered="enabled"
      @refresherrefresh="onPullDownRefresh"
      :scroll-top="scrollTop"
      @scroll="onScrollTop"
      lower-threshold="80"
      @scrolltolower="onScrollTopLower"
    >
      <NewsList
        :newsList="newsList"
        :righticon="righticon"
        :loadingStatus="loadingStatus"
      ></NewsList>
    </scroll-view>
  </view>
  <TabBar :current-page="1" />
</template>

<style lang="scss" scoped>
.news {
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  .newsScrollLeft {
    white-space: nowrap;
    width: 90vw;

    .newsItem {
      display: inline-block;
      width: 22vw;
      height: 6vh;
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
