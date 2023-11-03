<script lang="ts" setup>
import CustomNavBar from "@/components/CustomNavBar.vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import type { InputOnBlurEvent } from "@uni-helper/uni-app-types";
import { postLoginWxMinAPI, getPhoneNum, postLoginAPI } from "@/services/login";
import { useMemberStore } from "@/store/index";
import { ref } from "vue";
const props = defineProps({
  actions: {
    type: String,
    default: null,
  },
});
const memberStore = useMemberStore();
const systemInfo = uni.getSystemInfoSync();
const passVistal = ref(false);
// const passType = ref('password')
const transForm = () => {
  console.log(11);
  passVistal.value = !passVistal.value;
  // if (passVistal.value) {
  //     passType.value = 'text'
  // } else {
  //     passType.value = 'password'
  // }
};
function removeSpaces(input: any) {
  return input.replace(/\s+/g, ""); // 使用正则表达式替换所有空格字符
}
function convertHtmlEntityToUnicode(htmlEntity: any) {
  htmlEntity = removeSpaces(htmlEntity);
  const match = htmlEntity.match(/&#x([0-9A-Fa-f]+);/);
  if (match) {
    const hexCode = match[1];
    const unicodeChar = String.fromCharCode(parseInt(hexCode, 16));
    return `\\u${unicodeChar.charCodeAt(0).toString(16).toUpperCase()}`;
  }
  return htmlEntity;
}

const input = "& #xe60c;";
const output = convertHtmlEntityToUnicode(input);
console.log(`'${output}'`); // 输出：\uE60F

// 接收账号
const username = ref("");
// 接收密码
const password = ref("");
const validateInput = (e: InputOnBlurEvent) => {
  console.log(e);
  console.log(username.value);
  console.log(typeof e.detail.value);
};

//定义code
const code = ref("");
// 加载页面的时候自动获取code
onShow(async () => {
  code.value = (await wx.login()).code;
  console.log(code.value);
});
/* 构造登录参数 */
const loginParams = ref({
  code: code,
  username: username.value,
  password: password.value,
});
//点击登录
const login = async () => {
  // console.log(code)
  // console.log(username.value)
  // console.log(password.value)
  // console.log(loginParams.value)
  const userInfo = await postLoginAPI({
    code: code.value,
    username: username.value,
    password: password.value,
  });
  memberStore.clearProfile();
  memberStore.profile = userInfo.data;
  // 成功提示
  uni.showToast({
    icon: "none",
    title: "登录成功",
    success: () => {
      uni.switchTab({ url: "/pages/index/index" });
    },
  });
};
const userInfo = ref<{ phoneNumber: string }>();
// 手机号登录
const getPhoneNumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  // const { code, encryptedData, iv } = ev.detail!
  // if (!code) return uni.showToast({ icon: 'none', title: '登录失败' })
  userInfo.value = (await getPhoneNum({ code: ev.detail.code! })).data;
  console.log(userInfo.value);
  if (!memberStore.profile) return uni.showToast({ icon: "none", title: "登录失败" });
  memberStore.profile["phoneNum"] = userInfo.value.phoneNumber;
  if (memberStore.profile?.phoneNum) {
    uni.showToast({
      icon: "none",
      title: "绑定手机号成功",
      success: () => {
        uni.redirectTo({
          url: "/subpackages/hotel/applyUnion",
        });
      },
    });
  }
  // 获取参数
  // const encryptedData = ev.detail.encryptedData!
  // const iv = ev.detail.iv!
  // console.log(ev)
};
// 快捷登录
const quickLog = async () => {
  if (!code.value) return uni.showToast({ title: "code不存在" });
  const userInfo = await postLoginWxMinAPI({ code: code.value });
  console.log(userInfo);
  memberStore.profile = userInfo.data;
  if (!memberStore.profile) {
    return uni.showToast({ title: " 数据请求失败 " });
  }
  // 成功提示
  uni.showToast({
    icon: "none",
    title: "登录成功",
    success: () => {
      uni.switchTab({ url: "/pages/index/index" });
    },
  });
};
</script>

<template>
  <view class="login" :style="{ height: systemInfo.windowHeight + 'px' }">
    <!-- <CustomNavBar :title="'登录'"></CustomNavBar> -->
    <view class="loginBox">
      <view class="welcome">welcome</view>
      <!-- 网页端表单登录 -->
      <view class="loginItem">
        <view class="account" v-if="props.actions !== 'tapPhone'">
          <view class="accountContent">
            <view class="iconfont icon">&#xe64a;</view>
            <view class="accountTittle">账号</view>
          </view>
          <input
            class="input"
            type="text"
            placeholder="请输入账号"
            @input="validateInput"
            v-model="username"
          />
        </view>
        <view class="password" v-if="props.actions !== 'tapPhone'">
          <view class="passwordContent">
            <view class="iconfont icon">&#xe608;</view>
            <view class="passwordTittle">密码</view>
          </view>
          <view class="passwordInput">
            <input
              class="input"
              type="text"
              :password="passVistal === false"
              placeholder="请输入密码"
              v-model="password"
            />
            <view class="iconfont icon" @click="transForm">{{
              passVistal
                ? `${convertHtmlEntityToUnicode("&#xe60c;")}`
                : `${convertHtmlEntityToUnicode("&#xe60f;")}`
            }}</view>
            <!-- <view class="iconfont icon" @click="transForm">{{ passVistal ? '\uE60F' : '\uE60C' }}</view> -->
          </view>
        </view>
        <view class="submit" v-if="props.actions !== 'tapPhone'">
          <button class="button" hover-class="navigator-hover" @click="login">
            登录
          </button>
        </view>
        <view class="extra">
          <!-- <view class="caption">
                        <view class="captionText">快捷登录</view>
                        <button class="iconfont quicklyLogin" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
                            &#xe609;</button>
                    </view> -->
          <view class="caption">
            <view class="captionText">{{
              props.actions === "tapPhone" ? "授权手机号" : "快捷登录"
            }}</view>
            <view class="logBox">
              <view class="wxlog" v-if="props.actions === 'tapPhone'">
                <button
                  class="iconfont quicklyLogin"
                  open-type="getPhoneNumber"
                  @getphonenumber="getPhoneNumber"
                >
                  &#xe609;
                </button>
              </view>
              <view class="quicklyLog" v-if="props.actions !== 'tapPhone'">
                <button class="iconfont quicklyLogin" @click="quickLog">&#xe656;</button>
              </view>
            </view>
          </view>
          <view class="tip"
            >提示：微信授权登录需要您授权手机号，仅用于后台识别是否本校工会会员，方可查看相关内容</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;

  .loginBox {
    flex: 1;
    background: linear-gradient(90deg, #4a77f4, #9cbbfc);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .welcome {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      color: white;
      font-size: 100rpx;
      font-weight: 500;
    }

    .loginItem {
      flex: 3;
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: white;
      border-radius: 40rpx 40rpx 0 0; // 设置上左角和上右角的圆角半径

      .account {
        height: 50%;
        flex: 1;
        margin: 30rpx;
        border-bottom: 1px solid #cccc;

        .accountContent {
          display: flex;
          align-items: center;

          .accountTittle {
            font-weight: bold;
            margin-left: 10rpx;
          }
        }

        .input {
          margin: 30rpx 0;
          flex: 1;
        }
      }

      .password {
        height: 50%;

        flex: 1;
        margin: 30rpx;
        border-bottom: 1px solid #cccc;

        .passwordContent {
          height: 50%;
          display: flex;
          align-items: center;

          .passwordTittle {
            font-weight: bold;
            margin-left: 10rpx;
          }
        }

        .passwordInput {
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .input {
            flex: 8;
            margin: 20rpx 0;
          }

          .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            flex: 1;
          }
        }
      }

      .submit {
        flex: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        .button {
          font-size: larger;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80%;
          height: 30%;
          margin-top: 70rpx;
          border-radius: 100rpx;
          background: linear-gradient(90deg, #4a77f4, #9cbbfc);
          color: #ffffff;
        }
      }

      .extra {
        width: 100%;
        flex: 4;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;

        .caption {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .logBox {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }

          .captionText {
            font-size: 28rpx;
            color: #ccc;
            width: 90%;
            text-align: center;
            position: relative;

            &::before,
            &::after {
              content: "";
              position: absolute;
              top: 50%;
              width: 35%;
              height: 1px;
              background-color: #ccc;
            }

            &::before {
              left: 0;
            }

            &::after {
              right: 0;
            }
          }

          .quicklyLogin {
            background-color: #fff;
            border-radius: 50%;
            font-size: 60rpx;
          }

          .quicklyLogin:after {
            border: 1px solid white;
          }
        }

        .tip {
          width: 90%;
          font-size: 28rpx;
          color: #848484;
          margin-bottom: 50rpx;
        }
      }
    }
  }
}
</style>
