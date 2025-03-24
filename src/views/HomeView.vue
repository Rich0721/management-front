<template>
  <HeaderComponent :userInfo="testUser" @logout="handleLog" />
  <LogComponent v-show="LogComponentShow" @login="handleLog" />
  <ManageProductComponent
    v-show="!LogComponentShow"
    v-for="index in 5"
    :key="index"
    :productNumber="index"
    title="Product Title"
    date="2021-10-01"
    description="Product Description"
  />
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import LogComponent from "@/components/LogComponent.vue";
import ManageProductComponent from "@/components/ManageProductComponent.vue";
import { UserInfo } from "@/types/userInfo";
import { ref, onBeforeUpdate } from "vue";

const testUser = ref<UserInfo>({});
const LogComponentShow = ref<boolean>(true);
const handleLog = (val: UserInfo) => {
  testUser.value = val || {};
};

const handleLogin = () => {
  LogComponentShow.value = testUser.value.userName === undefined;
};

onBeforeUpdate(() => {
  console.log("Update:", LogComponentShow.value);
  handleLogin();
});
</script>
