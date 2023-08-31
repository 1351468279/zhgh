<script lang="ts" setup>
import CustomNavBar from '@/components/CustomNavBar.vue'
const systemInfo = uni.getSystemInfoSync();
</script>

<template>
    <view class="login" :style="{ height: systemInfo.windowHeight + 'px' }">
        <CustomNavBar :title="'登录'"></CustomNavBar>
        <view class="loginBox">
            <view class="welcome">欢迎使用</view>
            <!-- 网页端表单登录 -->
            <view class="loginItem">
                <view class="account">
                    <view class="accountContent">
                        <view class="iconfont icon">图标</view>
                        <view class="accounttittle">账号</view>
                    </view>
                    <input class="input" type="text" placeholder="请输入用户名/手机号码" />
                </view>
                <view class="password">
                    <view class="passwordContent">
                        <view class="iconfont icon">图标</view>
                        <view class="passwordtittle">密码</view>
                    </view>
                    <input class="input" type="text" password placeholder="请输入密码" />
                </view>
                <view class="submit">
                    <button class="button">登录</button>
                </view>
                <view class="extra">
                    <view class="caption">
                        <text>微信授权登录</text>
                    </view>
                    <view class="iconfont quicklyLogin">快捷登录</view>
                    <view class="tip">提示</view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.login {
    .loginBox {
        background: linear-gradient(#4a77f4, #9cbbfc);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .welcome {
            height: 200rpx;
            color: white;
            font-size: large;
            font-weight: bold;
        }

        .loginItem {
            flex: 1;
            width: 100%;
            background-color: white;
        }
    }
}
</style>