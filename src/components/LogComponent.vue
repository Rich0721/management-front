<template>
  <div class="login-container">
    <h1>後端管理系統</h1>
    <p>帳號: <input type="text" v-model="account" /></p>
    <p>密碼: <input type="password" v-model="password" /></p>
    <button class="login-button" @click="login">登入</button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { UserPermission, UserInfo } from "@/types/userInfo";

export default defineComponent({
  emits: ["login"],
  setup(_, { emit }) {
    const account = ref("");
    const password = ref("");

    const login = () => {
      const userInfo = {
        userName: account.value,
        userPermission: UserPermission.ADMIN,
      };
      emit("login", userInfo);
    };

    return { account, password, login };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  position: relative; /* 父容器設置為相對定位，讓子元素可以絕對定位 */
  width: 100%; /* 預設寬度為 100% */
  max-width: 400px; /* 設置最大寬度，讓容器不會太寬 */
  height: 300px; /* 設置容器高度，根據需要調整 */
  padding: 20px;
  margin: 0 auto; /* 水平置中 */
  box-sizing: border-box; /* 確保 padding 不影響寬度和高度 */
  background-color: #f8fafc; /* 添加背景色 */
  border-radius: 10px; /* 圓角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加陰影 */

  h1 {
    margin-bottom: 20px;
    text-align: center; /* 標題置中 */
  }

  p {
    margin-bottom: 10px;
  }

  .login-button {
    position: absolute; /* 絕對定位 */
    bottom: 20px; /* 距離容器底部 20px */
    right: 20px; /* 距離容器右側 20px */
    padding: 10px 20px;
    background-color: #38bdf8; /* 按鈕背景色 */
    color: #ffffff; /* 按鈕文字顏色 */
    border: none;
    border-radius: 5px; /* 圓角 */
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0ea5e9; /* 懸停時的背景色 */
    }
  }
}
</style>
