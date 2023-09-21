<script lang="ts" setup>
const bindTextAreaBlur = (e: any) => {
  console.log(e.detail.value)
}
const onClick = () => {
  uni.showToast({
    title: '提交成功',
    icon: 'none',
    duration: 2000,
    success: () => {
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    }
  })
}
</script>

<template>
  <view class="userSuggest">
    <view class="userSuggestBox">
      <view class="userSuggestItem">
        <view class="tittle">意见反馈</view>
        <view class="content">请留下您的宝贵意见</view>
      </view>
      <view class="userSuggestItem">
        <view class="tittle">联系方式</view>
        <input class="input" placeholder="请输入您的联系方式" />
      </view>
      <view class="userSuggestItem">
        <view class="tittle">反馈内容</view>
        <textarea class="textarea" @blur="bindTextAreaBlur" auto-height placeholder="请输入您的反馈内容"></textarea>
      </view>
    </view>
    <view class="btn" @click="onClick">提交</view>
  </view>
</template>

<style lang="scss" scoped>
.userSuggest {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;

  .userSuggestBox {
    width: 90%;
    background-color: white;
    border-radius: 20rpx;

    .userSuggestItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx;
      border-bottom: 1px solid #f5f5f5;

      .tittle {
        font-size: 30rpx;
        color: #333333;
      }

      .content {
        font-size: 28rpx;
        color: #999999;
      }

      .input {
        width: 70%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 28rpx;
        color: #999999;
      }

      .textarea {
        width: 70%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 28rpx;
        color: #999999;
      }
    }
  }

  .btn {
    width: 90%;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    background-color: #ff4d4f;
    color: white;
    border-radius: 20rpx;
    margin-top: 20rpx;
  }
}
</style>