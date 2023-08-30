<script lang="ts" setup>
import { reactive } from 'vue';

const { safeAreaInsets } = uni.getSystemInfoSync()  // 获取系统信息
const menuMineData = reactive([
    { tittle: '我参与的活动', icon: '\uE61E' },
    { tittle: '我的收藏', icon: '\uE65E' },
    { tittle: '我的核销码', icon: '\uE677' },
])
const menuFunData = reactive([
    { tittle: '个人资料', icon: '\uE61E' },
    { tittle: '修改密码', icon: '\uE65E' }
])
const menuSuggestData = reactive([
    { tittle: '用户反馈', icon: '\uE61E' },
    { tittle: '关于我们', icon: '\uE65E' },
    { tittle: '退出登录', icon: '\uE677' },
])
</script>

<template>
    <view class="navbar">
        <view class="tittle" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">个人中心</view>
        <view class="totalinfo">
            <view class="pubinfo">
                <image class="avatar" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
                <view class="userinfo">
                    <view class="acceptcard">
                        <view class="cardmark">*</view>
                        <navigator class="cardtittle" url="/pages/index/loopdown" open-type="navigate"
                            hover-class="navigator-hover">
                            绑卡
                        </navigator>
                        <!-- <view class="cardtittle"></view> -->
                    </view>
                    <view class="username">
                        <view class="cardnum">会员卡号：</view>
                        <view class="cardstate">未绑卡</view>
                    </view>
                    <view class="userlevel">
                        <view class="cardarea">所属工会：</view>
                        <view class="areastate">未绑卡</view>
                    </view>
                </view>
            </view>
            <view class="menu">
                <view class="menumine">
                    <navigator class="mineitem" v-for="item in menuMineData" url="/pages/index/loopdown"
                        open-type="navigate" hover-class="navigator-hover" :key="item.icon">
                        <view class="menuheader">
                            <view class="itemicon iconfont">{{ item.icon }}</view>
                            <view class="itemcontent">{{ item.tittle }}</view>
                        </view>
                        <view class="nexticon iconfont icon-tiaozhuan"></view>
                    </navigator>
                </view>
                <view class="menuuser">
                    <navigator class="mineitem" v-for="item in menuFunData" url="/pages/index/loopdown" open-type="navigate"
                        hover-class="navigator-hover" :key="item.icon">
                        <view class="menuheader">
                            <view class="itemicon iconfont">{{ item.icon }}</view>
                            <view class="itemcontent">{{ item.tittle }}</view>
                        </view>
                        <view class="nexticon iconfont icon-tiaozhuan"></view>
                    </navigator>
                </view>
                <view class="menusuggest">
                    <navigator class="mineitem" v-for="item in menuSuggestData" url="/pages/index/loopdown"
                        open-type="navigate" hover-class="navigator-hover" :key="item.icon">
                        <view class="menuheader">
                            <view class="itemicon iconfont">{{ item.icon }}</view>
                            <view class="itemcontent">{{ item.tittle }}</view>
                        </view>
                        <view class="nexticon iconfont icon-tiaozhuan"></view>
                    </navigator>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    margin-bottom: 20rpx;


    .tittle {
        margin: 20rpx;

    }

    .totalinfo {
        width: 100%;
        background-color: #e63427;

        .pubinfo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: row;
            overflow: hidden;
            background: linear-gradient(180deg, #fb5b51 0%, #e53325 100%);
            width: 100%;
            height: 330rpx;

            .avatar {
                width: 160rpx;
                height: 160rpx;
                border-radius: 50%;
                margin: 0 40rpx;
                border: 8rpx solid rgba(200, 200, 200, 0.25);

                img {
                    width: 30rpx;
                    height: 30rpx;
                }
            }

            .userinfo {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: column;
                color: #fff;

                .acceptcard {
                    width: 60%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .cardtittle {
                        text-align: center;
                        width: 50%;
                        border: 1px solid #fff;
                        padding: 2rpx 10rpx;
                        border-radius: 20rpx;
                    }
                }

                .username {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin: 20rpx 0;

                    .cardnum {
                        margin-right: 10rpx;
                    }
                }

                .userlevel {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    .cardarea {
                        margin-right: 10rpx;
                    }
                }
            }
        }

        .menu {
            border-radius: 20rpx 20rpx 0 0;
            background-color: #fff;
            overflow: hidden;
            width: 100%;


            .menumine,
            .menuuser,
            .menusuggest {
                width: 100%;
                border-bottom: 20rpx solid #f5f5f5;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: column;

                .mineitem {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 95%;
                    height: 90rpx;
                    background-color: #fff;
                    border-bottom: 1px solid #e5e5e5;
                    overflow: hidden;

                    .menuheader {
                        margin-left: 20rpx;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .itemcontent {
                            margin-left: 30rpx;
                        }
                    }

                    .nexticon {

                        margin-right: 40rpx;
                    }
                }

                .mineitem:last-child {
                    border-bottom: none;
                }
            }

            .menusuggest {
                border-bottom: none;
            }

        }

    }



}
</style>