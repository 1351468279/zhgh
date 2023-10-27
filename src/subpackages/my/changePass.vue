<script lang="ts" setup>
const onClick = () => {
  uni.showToast({
    title: "修改成功",
    icon: "none",
    duration: 2000,
    success: () => {
      setTimeout(() => {
        uni.navigateBack();
      }, 500);
    },
  });
};
</script>

<template>
  <view class="changePass">
    <view class="changePassBox">
      <view class="changePassItem">
        <view class="tittle">原密码</view>
        <input class="input" placeholder="请输入原密码" />
      </view>
      <view class="changePassItem">
        <view class="tittle">新密码</view>
        <input class="input" placeholder="请输入新密码" />
      </view>
      <view class="changePassItem">
        <view class="tittle">确认密码</view>
        <input class="input" placeholder="请再次输入新密码" />
      </view>
    </view>
    <view class="btn" @click="onClick">确认修改</view>
  </view>
</template>

<style lang="scss" scoped>
.changePass {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;

  .changePassBox {
    width: 90%;
    background-color: white;
    border-radius: 20rpx;

    .changePassItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx;
      border-bottom: 1px solid #f5f5f5;

      .tittle {
        font-size: 30rpx;
        color: #333333;
      }

      .input {
        width: 70%;
        height: 50rpx;
        border: none;
        outline: none;
        font-size: 30rpx;
        text-align: right;
      }
    }
  }

  .btn {
    width: 90%;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    background-color: #ff0000;
    color: white;
    border-radius: 20rpx;
    margin-top: 50rpx;
  }
}
</style>
