<template>
  <LoginComponent v-if="!isLogin" />
  <EditIndex v-else />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import LoginComponent from "@/components/LoginComponent.vue";
import EditIndex from "./products/EditIndex.vue";

const store = useStore();
const isLogin = computed(() => {
  return store.getters["UserInfoStore/isLogin"];
});
</script>
