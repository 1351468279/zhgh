<script setup lang="ts">
import CustomNavBar from "@/components/CustomNavBar.vue";
import ClassSwiper from "./components/ClassSwiper.vue";
import CategoryPanel from "./components/CategoryPanel.vue";
import FunctionCard from "./components/FunctionCard.vue";
import TabBar from "@/components/TabBar.vue";
// import ArticleRead from './components/ArticleRead.vue'
import { onLoad, onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { computed, onMounted, ref, watch } from "vue";
import { listTotalData } from "@/utils/index";
import { useMemberStore } from "@/store";
import { getNewsCategoryList, type categoryItemType, getNewsListById, getSwiperImage, type newsItem, type swiperImageList } from "@/services/indexNews";
import NewsList from "@/components/NewsList.vue";
import { postLoginWxMinAPI } from "@/services/login";
import type { ScrollViewOnScrollEvent } from "@uni-helper/uni-app-types";
const systemInfo = uni.getSystemInfoSync();
// 下拉刷新
onPullDownRefresh(() => {
  console.log("下拉刷新");
  setTimeout(() => {
    uni.stopPullDownRefresh();
  }, 1000);
});




// 被激活文章类型
const activeValue = ref('');
const ceshi = computed(() => {
  console.log(5151)
  return activeValue.value + 1
})

// 进度条位置
const scrollLeft = ref(0);
const scrollTop = ref(0);
const swiperHeight = ref()
const showColor=ref(false)
// 滚动事件
const onScrollLeft = (e:any) => {
  console.log(e);
};
const onScrollTop = (e: ScrollViewOnScrollEvent) => {
  console.log(e.detail.scrollTop);
  if (swiperHeight.value < e.detail.scrollTop) {
    showColor.value = true
    return console.log(showColor.value)
  }else{
    showColor.value = false
  }
};
// 定义页数
const page = ref(1)
// 接受新闻总条数
const total = ref()
// 点击文章类型
const onClick = (id: string, index: number) => {

  console.log(id)
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
// 左右图标及数据
const lefticon = ref(null);
const righticon = ref("\uE60F");
// const newsList = computed(() => {
//   return listTotalData.value.filter((item) => item.articleId === activeValue.value)[0]
//     .data;
// });
let timer: any = null;
const loadingStatus = ref(false);
const onScrollTopLower = () => {
  // if (loadingStatus.value) return;
  console.log('长度', newsList.value?.length)
  console.log(newsList.value)
  if (!newsList.value) return
  if (newsList.value.length >= total.value) return
  loadingStatus.value = true;
  console.log("到底了");
  page.value++
  getNewsListById({ page: page.value, pageSize: 5, lMid: activeValue.value }).then((res) => {
    console.log(8585)
    console.log(res.rows)
    newsList.value?.push(...(res.rows as newsItem[]))
    console.log(newsList.value)
  })
  // listTotalData.value[activeValue.value - 1].data.push({ id: 6, image: 'http://cloud.zhgn.cn:808/phone/unionpicture/synodmeetings.png', area: '新郑市总工会', viewNum: 1212, content: '文章内容', tittle: '文章标题', time: '2023-01-02' })
  loadingStatus.value = false;
};
const newsCategory = ref<categoryItemType[]>();
// 接收新闻列表
const newsList = ref<newsItem[]>()
const memberStore = useMemberStore();
//定义code
const code = ref("");
// 快捷登录
const quickLog = async () => {
  const userInfo = await postLoginWxMinAPI({ code: code.value });
  console.log(userInfo);
  memberStore.profile = userInfo.data;
};
// 接收轮播图列表
const swiperList = ref<swiperImageList>()
onLoad(async () => {
  swiperList.value = (await getSwiperImage()).body
})
onMounted(() => {
  const query = uni.createSelectorQuery();
  query.select('#swiper').boundingClientRect(data => {
    console.log(data);
    console.log("节点离页面顶部的距离为" + data.top);
    swiperHeight.value=data.top
    console.log(swiperHeight.value)
  }).exec();
})
onShow(async () => {
  console.log('onshow')

  if (memberStore.profile?.token) {
    code.value = (await wx.login()).code
    console.log(code.value)
    const userInfo = await postLoginWxMinAPI({ code: code.value });
    console.log('获取到token了')
    // await memberStore.clearProfile()
    if (memberStore.profile.token != userInfo.data.token) {
      await memberStore.clearProfile()
      memberStore.profile = userInfo.data
    }
    console.log("已登录");
    page.value = 1
    getNewsCategoryList().then((res) => {
      newsCategory.value = res.body?.categoryList;
      activeValue.value = res.body?.categoryList[0].id as string
    }).then(() => {
      getNewsListById({
        page: page.value,
        pageSize: 5,
        lMid: activeValue.value
      }).then((res) => {
        console.log(activeValue.value)
        console.log(5454)
        newsList.value = res.rows
        total.value = res.total
      })
    })
  } else {
    uni.navigateTo({
      url: "/pages/login/index",
    });
  }
});
</script>

<template>
  <view class="home">
    <CustomNavBar class="navbar" :tittle="'首页'" :showColor="showColor"></CustomNavBar>

    <scroll-view
      class="indexScrollTop"
      scroll-y
      :scroll-top="scrollTop"
      @scroll="onScrollTop"
      lower-threshold="100"
      @scrolltolower="onScrollTopLower"
    >
      <view class="backgroundtop"> </view>
      <view class="backgroundbottom"> </view>
      <!-- <view>2121</view> -->
      <ClassSwiper class="swiperImg" id="swiper"></ClassSwiper>
      <CategoryPanel></CategoryPanel>
      <FunctionCard class="functionCard"></FunctionCard>
      <scroll-view
        class="newsScrollLeft"
        scroll-x
        :scroll-left="scrollLeft"
        scroll-with-animation
        @scroll="onScrollLeft"
        :showScrollbar="false"
      >
        <view
          class="newsItem"
          :class="{ active: item.id === activeValue }"
          v-for="(item, index) in newsCategory"
          :key="item.id"
          @click="onClick(item.id, index)"
        >
          {{ item.xmmche }}
        </view>
      </scroll-view>
      <NewsList
        class="indexList"
        :newsList="newsList"
        :righticon="righticon"
        :loadingStatus="loadingStatus"
      ></NewsList>
    </scroll-view>
  </view>
  <TabBar :current-page="0" />
</template>

<style lang="scss">
.home {
  background-color: white;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 90vh;
  position: relative;

  .navbar {
    width: 100vw;
    z-index: 9999999;
    position: absolute;
    top: 0;
    left: 0;
  }

  .backgroundtop {
    width: 100vw;
    height: 30vh;
    background-color: red;
  }

  .backgroundbottom {
    width: 100vw;
    height: 11vh;
    background-color: white;
  }

  .indexScrollTop {
    width: 100vw;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    max-height: 90vh;
    position: relative;

    .swiperImg {
      width: 100vw;
      position: absolute;
      z-index: 999999;
      top: 11vh;
      border-radius: 4vw;
    }

    .functionCard {
      height: 16vh;
    }

    .newsScrollLeft {
      width: 100vw;
      // background-color: skyblue;
      white-space: nowrap;
      transition: all 1s;

      .newsItem {
        display: inline-block;
        width: 20vw;
        height: 7vh;
        line-height: 70rpx;
        text-align: center;
        font-size: 28rpx;
        color: darkgrey;
      }

      .active {
        font-weight: bold;
        font-size: 35rpx;
        color: black;

        &::after {
          display: block;
          content: "";
          width: 15vw;
          height: 5rpx;
          border-radius: 10rpx;
          background-color: red;
          left: 0;
          right: 0;
          margin: 0 auto;
        }
      }
    }

    .indexList {
      flex: 1;
    }
  }
}
</style>
