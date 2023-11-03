<script lang="ts" setup>
import { ref } from "vue";
import type { unionType } from "@/types/index";
import { defineProps } from "vue";
const systemInfo = uni.getSystemInfoSync();
const props = defineProps({
  tittle: {
    type: String,
  },
  showColor: {
    type: Boolean,
  },
});
const popup = ref();
const unionname = ref("郑州市总工会");
const onClick = () => {
  console.log("点击了");
  popup.value.open("center");
};
const closeDialog = (item: unionType) => {
  unionname.value = item.name;
  console.log(item);
  popup.value.close();
};
</script>
<template>
  <!-- 顶部占位 -->
  <view class="navbar">
    <view
      class="tittle"
      :class="{ active: showColor }"
      :style="{ paddingTop: systemInfo.safeAreaInsets?.top + 'px' }"
      >{{ props.tittle }}</view
    >
  </view>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: transparent;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  width: 100vw;

  .tittle {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    height: 6vh;
  }
  .active {
    background-color: red;
    width: 100vw;
  }
}
</style>
