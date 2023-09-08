<script lang="ts" setup>
import OptionsTab from '@/components/OptionsTab.vue';
import { ref } from 'vue';
const systemInfo = ref(uni.getSystemInfoSync());
</script>

<template>
  <view class="box">
    <view class="personal">
      <OptionsTab :leftTittle="'头像'" :image="'http://cloud.zhgn.cn:808/phone/tabs/xinwen_selected.png'" rightTag />
      <OptionsTab :leftTittle="'工号'" :rightTittle="19160102525" />
      <OptionsTab :leftTittle="'会员姓名'" :rightTittle="'李星云'" rightTag />
    </view>
    <view class="personal">
      <OptionsTab :leftTittle="'组织'" :rightTittle="'一轮测试'" />
      <OptionsTab :leftTittle="'身份证号'" :rightTittle="412702199901542478" rightTag />
      <OptionsTab :leftTittle="'性别'" :rightTittle="'男'" rightTag />
    </view>
    <view class="personal">
      <OptionsTab :leftTittle="'婚姻'" rightTag />
      <OptionsTab :leftTittle="'民族'" :rightTittle="'汉族'" rightTag />
      <OptionsTab :leftTittle="'学历'" :rightTittle="'博士研究生'" rightTag />
    </view>
    <view class="personal">
      <OptionsTab :leftTittle="'出生日期'" :rightTittle="'1999-09-10'" />
      <OptionsTab :leftTittle="'手机号'" :rightTittle="18806663566" rightTag />
      <OptionsTab :leftTittle="'会员姓名'" :rightTittle="'1351468279@qq.com'" rightTag />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.box {
  padding: 20rpx 0;
  width: 100%;
  height: 100%;
  background-color: #f7f8fc;

  .personal {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    background-color: #f7f8fc;
    margin-bottom: 20rpx;
  }
}
</style>