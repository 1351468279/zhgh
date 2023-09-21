<script lang="ts" setup>
import ReviewCard from '@/components/ReviewCard.vue'
import { getReviewStatus } from '@/services/applyUnion'
import { useApplySanYuStore } from '@/store/index'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useMemberStore } from '@/store/index'
const memberStore = useMemberStore()
const sanYuStore = useApplySanYuStore()

const reviewAll = () => {
  // 确认是否全部上报
  uni.showModal({
    title: '提示',
    content: '是否全部上报,上报后不可修改',
    success: function (res) {
      if (res.confirm) {
        // 确认全部上报
        sanYuStore.applier.forEach(async (item) => {
          if (item.status == '0') {
            await uni.showToast({
              title: '上报成功'
            });
            item.status = '2'
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
  // for (let index = 0; index < sanYuStore.applier.length; index++) {
  //   sanYuStore.applier[index].status = '2'
  // }
}

const onClick = (index: Number) => {
  uni.navigateTo({
    url: '/subpackages/hotel/applySanYu' + '?index=' + index
  })
}
// 点击填写申请
const applySanYu = () => {
  uni.navigateTo({
    url: '/subpackages/hotel/applySanYu'
  })
}
// 接收管理员身份标识
const isAdmin = ref(false)
// 接收用户审核状态
const userState = ref()
onShow(async () => {
  //  获取用户状态，判断用户身份
  userState.value = (await getReviewStatus()).data
  // 如果用户是游客，显示一些提示并跳转到申请入会页面
  if (userState.value == '0') {
    uni.showModal({
      title: '提示',
      content: '您还未入会，请先申请入会',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: '/subpackages/hotel/applyUnion'
          })
        }
      }
    })
  }
  // 如果是审核中，显示提示
  else if (userState.value == '1') {
    uni.showModal({
      title: '提示',
      content: '您的入会申请正在审核中，请耐心等待审核成功后再来操作',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          uni.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  }
  // 如果用户是会员
  else if (userState.value == '2') {
    // 如果是管理员
    if (memberStore.profile?.userVo?.roleType?.includes('SystemAdmin') == true) {
      isAdmin.value = true
      // 获取审核总列表,并默认显示待审核列表
      return
    }
    // 如果是会员
    else {
      // 获取审核总列表,并默认显示待审核列表
      return
    }
  }
})
</script>

<template>
  <view class="box">
    <view class="shenhe">
      <view class="card" v-for="(item, index) in sanYuStore.applier" @click="onClick(index)">
        <view class="tittle">
          <view class="main" :class="{ await: item.status == '0' }">{{ item.status == '2' ? '已上报' : '未上报' }}
          </view>
          <view class="vice">职称：{{ item.jobTittle }}</view>
          <view class="vice">工作单位：{{ item.employer }}</view>
        </view>
        <view class="extra">申请人：{{ item.name }}</view>
      </view>
    </view>
  </view>
  <view class="reviewAll">
    <button type="default" @click="reviewAll">一键上报</button>
    <button type="default" @click="applySanYu">填写申请</button>
  </view>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-around;

  .shenhe {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .card {
      width: 90%;
      height: 200rpx;
      box-shadow: 0rpx 0rpx 5rpx 2rpx darkgrey;
      margin: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 20rpx;

      .tittle {
        height: 80%;
        width: 55%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 50rpx;

        .main {
          font-size: larger;
          color: #3a3a3a;

        }

        .await {
          color: red;
        }

        .vice {
          color: #909399;
          font-size: small;
        }
      }

      .extra {
        margin-right: 50rpx;
        white-space: nowrap;
      }
    }

  }


}

.reviewAll {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>