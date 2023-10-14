<script lang="ts" setup></script>

<template>
  <view class="wrape">
    <view class="newsContent">
      <view class="tittle">标题</view>
      <view class="tag">
        <view class="time">时间</view>
        <view class="viewnum">浏览数</view>
      </view>
      <view class="content">文章内容</view>
    </view>
    <view class="function"> 收藏 </view>
    <view class="tuijian">
      <view class="name">推荐阅读 </view>
      <view class="card" v-for="item in 2">
        <view class="left">
          <image class="img" src="" mode="aspectFit" />
        </view>
        <view class="right">
          <view class="top">
            <view class="tittle"> 标题 </view>
          </view>
          <view class="bottom">
            <view class="time"> 时间 </view>
            <view class="viewnum"> 11 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrape {
  height: calc(95vh);
  padding: 30rpx;

  .newsContent {
    .tittle {
      font-weight: bold;
      font-size: 20px;
    }

    .tag {
      font-size: 14px;
      color: #e5e5e5;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

  .function {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30vw;
    height: 8vw;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 20rpx;
  }

  .tuijian {
    .name {
      font-weight: bold;
      font-size: 20px;
    }

    .card {
      display: flex;
      margin: 20rpx;
      .left {
        background-color: pink;

        .img {
          height: 25vw;
          width: 25vw;
        }
      }

      .right {
        flex: 1;
        background-color: skyblue;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .top {
          background-color: #fff;
          width: 100%;
          .tittle {
            padding: 0 20rpx;
            background-color: pink;
            font-size: 20 px;
          }
        }
        .bottom {
          width: 100%;

          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 14px;
          color: #e5e5e5;
        }
      }
    }
  }
}
</style>
