<template>
  <div class="header">
    <h1 class="title">Test Name</h1>

    <div class="menu">
      <div
        class="menu-item"
        @mouseover="showSubMenu('product')"
        @mouseleave="hideSubMenu"
      >
        商品管理
        <!-- 子菜單 -->
        <div class="sub-menu" v-if="activeMenu === 'product'">
          <h4
            class="sub-menu-item"
            @click="
              router.push({
                name: RouterName.EDIT_PRODUCT,
                params: { id: EditEnum.ININITIAL_ID },
              })
            "
          >
            新增商品
          </h4>
          <h4
            class="sub-menu-item"
            @click="router.push({ name: RouterName.STOCK })"
          >
            盤點商品
          </h4>
          <h4 class="sub-menu-item">銷售紀錄</h4>
        </div>
      </div>

      <div
        class="menu-item"
        @mouseover="showSubMenu('admin')"
        @mouseleave="hideSubMenu"
      >
        系統管理
        <!-- 子菜單 -->
        <div class="sub-menu" v-if="activeMenu === 'admin'">
          <h4 class="sub-menu-item">權限管理</h4>
          <h4 class="sub-menu-item">用戶管理</h4>
        </div>
      </div>

      <!-- 子菜單 -->
      <button-component
        @click="() => router.push({ name: 'edit' })"
        backgroundColor="#ef4444"
        hoverColor="#dc2626"
      >
        登出
      </button-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ButtonComponent } from "@/components/Basics";
import { EditEnum, RouterName } from "@/types/enums";
import router from "@/router";

const activeMenu = ref<string | null>(null); // 用於追蹤當前顯示的子菜單

const showSubMenu = (menu: string) => {
  activeMenu.value = menu; // 顯示對應的子菜單
};

const hideSubMenu = () => {
  activeMenu.value = null; // 隱藏子菜單
};

// const logout = () => {
//   const userInfo = {} as UserInfo;
//   emits("logout", userInfo);
// };

// onBeforeUpdate(() => {
//   console.log("User Log out");
// });
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
  position: relative; /* 確保子菜單定位基於主菜單 */
}

.menu-item {
  position: relative; /* 為子菜單定位 */
  margin: 0;
  color: #38bdf8;
  cursor: pointer;
  transition: border-bottom 0.3s ease, color 0.3s ease;
}

.menu-item:hover {
  border-bottom: 2px solid #38bdf8; /* 淺藍色底線 */
  color: #f8fafc; /* 懸停時變為白色 */
}

.sub-menu {
  position: absolute;
  width: 100%;
  top: 100%; /* 子菜單顯示在主菜單下方 */
  left: 0;
  background-color: #334155; /* 深灰色背景 */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.sub-menu-item {
  margin: 5px 0;
  color: #f8fafc;
  cursor: pointer;
  transition: color 0.3s ease;
}

.sub-menu-item:hover {
  color: #38bdf8;
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
