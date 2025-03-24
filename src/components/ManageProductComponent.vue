<template>
  <div class="product-container">
    <div class="product-header">
      <div class="product-title">{{ title }}</div>
      <div class="product-date">{{ date }}</div>
    </div>

    <!-- 商品簡介 -->
    <div class="product-description">{{ description }}</div>

    <!-- 操作按鈕 -->
    <div class="product-actions">
      <button-component
        @click="handleView"
        backgroundColor="#38bdf8"
        hoverColor="#0ea5e9"
      >
        瀏覽
      </button-component>
      <button-component
        @click="handleEdit"
        backgroundColor="#fbbf24"
        hoverColor="#f59e0b"
      >
        編輯
      </button-component>
      <button-component
        @click="handleDelete"
        backgroundColor="#ef4444"
        hoverColor="#dc2626"
      >
        下架
      </button-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "./ButtonComponent.vue";
import { defineProps } from "vue";

const props = defineProps<{
  productNumber: number;
  title: string;
  date: string;
  description: string;
}>();

const handleEdit = () => {
  console.log("Edit: ", props.productNumber);
};

const handleDelete = () => {
  console.log("Delete: ", props.productNumber);
};
</script>

<style lang="scss" scoped>
/* 整體容器 */
.product-container {
  width: 100%; /* 填滿父容器 */
  margin: 0 auto; /* 水平置中 */
  background-color: white; /* 橘色背景 */
  padding: 20px;
  box-sizing: border-box;
  border: 0.1px dashed #353535; /* 虛線邊框，藍色 */
  border-radius: 10px; /* 添加圓角 */
}

/* 商品標題和日期 */
.product-header {
  display: flex;
  justify-content: space-between; /* 左右對齊 */
  align-items: flex-start; /* 標題與日期的垂直對齊方式 */
  padding: 10px;
  color: #1a1919; /* 深灰色文字 */
  border-bottom: 1px solid #ccc; /* 添加底線 */
  position: relative; /* 為日期的絕對定位提供參考 */

  .product-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }

  .product-date {
    font-size: 10px;
    position: absolute; /* 絕對定位 */
    bottom: 0; /* 將日期放置在容器的底部 */
    right: 0; /* 將日期放置在容器的右側 */
    color: #3e3e3e;
  }
}

/* 商品簡介 */
.product-description {
  color: #000000;
  padding: 10px;
  margin-top: 10px;
}

/* 操作按鈕區域 */
.product-actions {
  display: flex; /* 使用 flexbox 排列按鈕 */
  justify-content: flex-end; /* 按鈕靠右對齊 */
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 按鈕之間的間距 */
  margin-top: 20px; /* 與上方內容保持間距 */
}
</style>
