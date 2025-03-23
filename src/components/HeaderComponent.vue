<template>
  <div class="header">
    <h1 class="title">Test Name</h1>

    <div class="menu">
      <h2 class="menu-item" v-show="isLogin">新增商品</h2>
      <h2 class="menu-item" v-show="isLogin">盤點</h2>
      <h2 class="menu-item" v-show="isLogin">銷售紀錄</h2>
      <h2 class="menu-item" v-show="canManage">權限管理</h2>

      <button v-show="isLogin" @click="logout">登出</button>
    </div>
  </div>
</template>

<script lang="ts">
import { UserPermission, UserInfo } from "@/types/userInfo";
import { defineComponent, computed, onBeforeUpdate } from "vue";

export default defineComponent({
  props: {
    userInfo: {
      type: Object as () => UserInfo,
      required: true,
    },
  },
  emits: ["logout"],
  setup(props, { emit }) {
    const isLogin = computed(
      () =>
        props.userInfo.userName !== "" && props.userInfo.userName !== undefined
    );
    const canManage = computed(
      () => props.userInfo.userPermission === UserPermission.ADMIN
    );

    const logout = () => {
      const userInfo = {} as UserInfo;
      emit("logout", userInfo);
    };

    onBeforeUpdate(() => {
      console.log("User Log out");
    });
    return { isLogin, canManage, logout };
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e293b; /* 深藍灰色背景 */
  width: 100vw; /* 填滿整個視口寬度 */
  height: 97px;
  padding: 0 20px; /* 保持內邊距 */
  box-sizing: border-box; /* 確保 padding 不影響寬度 */
  margin: 0; /* 移除外邊距 */
}

.title {
  font-family: "Irish Grover";
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 77px;
  color: #f8fafc; /* 白色文字 */
}

.menu {
  display: flex;
  flex-direction: row; /* 水平排列 */
  align-items: center; /* 垂直居中 */
  gap: 20px; /* 增加項目之間的間距 */
}

.menu-item {
  margin: 0;
  color: #38bdf8; /* 淺藍色文字 */
  cursor: pointer;
  transition: border-bottom 0.3s ease, color 0.3s ease;
}

.menu-item:hover {
  border-bottom: 2px solid #38bdf8; /* 淺藍色底線 */
  color: #f8fafc; /* 懸停時變為白色 */
}

.menu button {
  padding: 10px 20px;
  background-color: #ef4444; /* 鮮紅色按鈕背景 */
  color: #ffffff; /* 白色文字 */
  border: none;
  border-radius: 20px; /* 圓弧形 */
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.menu button:hover {
  background-color: #dc2626; /* 懸停時更深的紅色 */
}

/* RWD: 小螢幕樣式 */
@media (max-width: 768px) {
  .header {
    flex-direction: column; /* 改為垂直排列 */
    height: auto; /* 自適應高度 */
    padding: 10px; /* 減少內邊距 */
  }

  .title {
    font-size: 48px; /* 縮小標題字體 */
    line-height: 56px;
    text-align: center; /* 標題置中 */
  }

  .menu {
    flex-direction: column; /* 垂直排列 */
    align-items: center; /* 置中對齊 */
    gap: 10px; /* 減少間距 */
  }

  .menu-item {
    font-size: 18px; /* 縮小字體 */
  }

  .menu button {
    font-size: 14px; /* 縮小按鈕字體 */
    padding: 8px 16px; /* 減少按鈕內邊距 */
  }
}
</style>
