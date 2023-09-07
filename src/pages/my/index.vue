<script lang="ts" setup>
import CustomNavbar from './components/CustomNavbar.vue'
import TabBar from '@/components/TabBar.vue'


</script>

<template>
    <CustomNavbar></CustomNavbar>
    <TabBar :current-page="4" />
</template>

<style lang="scss" scoped></style>