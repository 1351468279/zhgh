<script lang="ts" setup>
import { onMounted, ref } from "vue";

/* 定义默认高亮文章类型 */
const activeType = ref(0);

/* 点击文章类型 */
const onClick = (val: number) => {
  activeType.value = val;
  console.log("click");
};
// 竖向滚动条位置
const scrollTop = ref(0);
// 滚动条滚动事件
const scroll = (e: any) => {
  scrollTop.value = e.detail.scrollTop;
  console.log(scrollTop.value);
};
// 滚动到底部事件
const lower = (e: any) => {
  console.log("lower");
};

const typeHeight = ref(0); // 记录文章类型部分的高度
let typeBoxElement: HTMLElement | null = null; // 引用文章类型部分的元素

// 获取文章类型部分的高度
onMounted(() => {
  if (typeBoxElement) {
    console.log(typeBoxElement.clientHeight);
    console.log(typeBoxElement);
    typeHeight.value = typeBoxElement.clientHeight;
  }
});
</script>

<template>
  <view class="article">
    <view
      class="typebox"
      ref="typeBoxElement"
      :class="{ fixed: scrollTop >= typeHeight }"
    >
      <view
        class="type"
        v-for="(item, index) in 5"
        :key="item"
        :class="{ active: index === activeType }"
        @click="onClick(index)"
      >
        <text class="tittlecontent">文章类型{{ index }}</text>
      </view>
    </view>

    <scroll-view
      :scroll-top="scrollTop"
      :scroll-y="true"
      class="scroll-view"
      @scrolltolower="lower"
      @scroll="scroll"
    >
      <view class="contentbox">
        <navigator
          class="content"
          url="/pages/index/loopdown"
          open-type="navigate"
          hover-class="navigator-hover"
          v-for="item in 10"
          :key="item"
        >
          <view
            ><img
              class="contentimg"
              src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/slider_1.jpg"
              alt=""
            />
          </view>
          <view class="contentinfo">
            <text class="contenttittle">文章标题</text>
            <view class="contenttag">
              <text class="contenttime">文章发布时间</text>
              <view class="viewnum">
                <text class="iconfont">&#xe63d;</text>
                <text>4</text>
              </view>
            </view>
          </view>
        </navigator>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.article {
  margin: 20rpx 0;

  .typebox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background-color: white;
    margin-top: 20rpx;

    .type {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      border-radius: 10rpx;
      margin: 20rpx 0;

      .tittlecontent {
        font-size: 20rpx;
        padding: 18rpx;
        border-radius: 20rpx;
      }
    }

    .active {
      background-color: rgb(168, 224, 219);
    }
  }

  .scroll-view {
    height: 1000rpx;
  }

  .contentbox {
    background-color: white;
    overflow: hidden;

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20rpx;
      padding: 0 20rpx;
      border-radius: 15rpx;

      .contentimg {
        width: 200rpx;
        height: 200rpx;
        border-radius: 15rpx;
      }

      .contentinfo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 500rpx;
        height: 200rpx;
        padding: 0 20rpx;
        box-sizing: border-box;

        .contenttittle {
          font-size: 30rpx;
          font-weight: bold;
          margin: 20rpx 0;
        }

        .contenttag {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;

          .contenttime {
            font-size: 20rpx;
            color: #666;
          }

          .viewnum {
            font-size: 20rpx;
            color: #666;
          }
        }
      }
    }
  }

  .fixed {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
