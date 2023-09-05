<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const ceshi = ref()
onLoad((a) => {
    if (a) {
        ceshi.value = a;
    }

});

</script>

<template>
    <view class="detail">
        <view class="header">我是应用id为 {{ ceshi.id }}的应用</view>
    </view>
</template>

<style lang="scss" scoped>
.detail {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .header {
        font-size: 32rpx;
    }
}
</style>