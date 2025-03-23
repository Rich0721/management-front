<template>
  <HeaderComponent :userInfo="testUser" @logout="handleLog" />
  <LogComponent v-show="LogComponentShow" @login="handleLog" />
</template>

<script lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import LogComponent from "@/components/LogComponent.vue";
import { UserInfo } from "@/types/userInfo";
import { ref, onBeforeUpdate } from "vue";

export default {
  components: {
    HeaderComponent,
    LogComponent,
  },
  setup() {
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

    return { testUser, handleLog, LogComponentShow };
  },
};
</script>
