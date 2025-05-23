<template>
  <div class="main-container">
    <div class="product-container">
      <!-- 左側圖片區域 -->
      <div class="product-image">
        <image-show
          :images="contentData.data.images"
          @updateImage="(val) => (contentData.data.images = val)"
        />
      </div>
      <!-- 右側商品資訊區域 -->
      <div class="product-info">
        <input-text
          label="商品名稱"
          :content="contentData.data.name"
          @update:model-value="(val) => (contentData.data.name = val)"
        />
        <input-number
          label="商品成本"
          :content="contentData.data.cost"
          @update:model-value="(val) => (contentData.data.cost = val)"
        />
        <input-number
          label="商品價格"
          :content="contentData.data.price"
          @update:model-value="(val) => (contentData.data.price = val)"
        />
        <input-choose
          label="佛牌分級"
          :content="contentData.data.category"
          :options="[
            { label: '一級', value: 'First' },
            { label: '二級', value: 'Sencond' },
            { label: '三級', value: 'Third' },
            { label: '四級', value: 'Fourth' },
            { label: '五級', value: 'Fifth' },
          ]"
          @update:model-value="(val) => (contentData.data.category = val)"
        />
        <input-area
          label="商品簡介"
          :content="contentData.data.description"
          @update:model-value="(val) => (contentData.data.description = val)"
        />
      </div>
    </div>

    <EditComponent v-model="contentData.data.content" />

    <!-- 操作按鈕 -->
    <div class="product-actions">
      <div class="button-wrapper">
        <button-component
          @click="clickSubmit(contentData.data)"
          backgroundColor="#38bdf8"
          hoverColor="#0ea5e9"
        >
          儲存
        </button-component>
      </div>
      <div class="button-wrapper">
        <button-component
          @click="clickCancel"
          backgroundColor="#ef4444"
          hoverColor="#dc2626"
        >
          取消
        </button-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  InputText,
  InputNumber,
  InputArea,
  ButtonComponent,
  ImageShow,
  EditComponent,
  InputChoose,
} from "@/components/Basics";
import { Product } from "@/types/Product";
import { EditEnum, RouterPath } from "@/types/enums";
import { editSubmit, getProductById } from "@/services/EditProductService";
import { userLogCheck } from "@/services/utils/userLogCheck";

userLogCheck();
const route = useRoute();
const router = useRouter();
const productId = route.params.id;
const contentData = reactive({
  data: {
    code: "",
    name: "",
    cost: 0,
    price: 0,
    category: "",
    description: "",
    content: "",
    images: [] as string[],
  } as Product,
});

const clickSubmit = async (data: Product) => {
  const status: number = await editSubmit(data);
  if (status === 200) {
    router.replace({ path: RouterPath.PRODUCTS });
  } else {
    console.error("Error submitting data:", status);
  }
};

const clickCancel = () => {
  if (confirm("確定要取消嗎？")) {
    router.replace({ path: RouterPath.PRODUCTS });
  }
};

watch(
  () => contentData.data,
  (newValue) => {
    contentData.data = newValue;
  },
  { deep: true }
);

onMounted(async () => {
  // 初始化資料
  if (productId === EditEnum.ININITIAL_ID) {
    contentData.data.code = "";
    contentData.data.name = "";
    contentData.data.cost = 0;
    contentData.data.price = 1;
    contentData.data.category = "";
    contentData.data.description = "";
    contentData.data.content = "<p>請輸入內容</p>";
  } else {
    const productInfo = await getProductById(productId as string);
    Object.assign(contentData.data, productInfo);
  }
});
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平置中 */
  justify-content: flex-start;
  width: 100%; /* 父容器寬度 */
  min-height: 100vh; /* 讓內容至少占滿視窗高度 */
  padding: 20px; /* 添加內邊距 */
  box-sizing: border-box; /* 確保 padding 不影響寬度 */
}

.product-container {
  width: 66.67%; /* 寬度設置為網頁的 2/3 */
  max-width: 1200px; /* 設置最大寬度，避免過大 */
  margin: 10px 0; /* 上下間距 */
  display: flex;
  border: 1px solid #ccc; /* 添加邊框，方便查看佈局 */
  border-radius: 10px; /* 添加圓角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加陰影 */
  background-color: #fff; /* 背景色 */
}

.editor-container {
  width: 66.67%; /* 寬度設置為網頁的 2/3 */
  max-width: 1200px; /* 設置最大寬度，避免過大 */
  height: 400px; /* 固定高度 */
  margin: 30px 0; /* 上下間距 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box; /* 確保 padding 不影響寬度和高度 */
  background-color: #fff; /* 背景色 */
  border: 1px solid #ccc; /* 添加邊框 */
  border-radius: 10px; /* 添加圓角 */
}
.ck-editor__editable {
  height: 100%; /* 讓編輯區域填滿父容器的高度 */
  overflow-y: auto; /* 如果內容超出，顯示滾動條 */
}

.product-container {
  display: flex; /* 使用 flexbox 進行水平排列 */
}

.product-image {
  width: 66.67%; /* 寬度設置為網頁的 2/3 */
  max-width: 800px;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  justify-content: space-between;
  padding: 10px;
  border-right: 1px solid #ccc;
}

.product-info {
  flex: 1; /* 右側商品資訊區域占 1 比例 */
  padding: 10px;
  width: 33.33%; /* 寬度設置為網頁的 1/3 */
  max-width: 400px;
}

/* 操作按鈕區域 */
.product-actions {
  display: flex; /* 使用 flexbox 排列按鈕 */
  justify-content: center; /* 按鈕居中對齊 */
  align-items: center; /* 垂直居中 */
  gap: 20px; /* 按鈕之間的間距 */
  margin-top: 20px; /* 與上方內容保持間距 */
  width: 100%; /* 填滿父容器寬度 */
  z-index: 10; /* 確保按鈕不會被其他內容覆蓋 */
  position: relative; /* 確保 z-index 生效 */

  .button-wrapper {
    flex: 1; /* 每個按鈕區域占據 50% 的寬度 */
    display: flex;
    justify-content: flex-end; /* 按鈕靠右對齊 */
  }

  .button-wrapper:last-of-type {
    justify-content: flex-start; /* 右側按鈕靠左對齊 */
  }
}
</style>
