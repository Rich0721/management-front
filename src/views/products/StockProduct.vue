<template>
  <div class="botton-top">
    <button-component
      @click="exportCode"
      backgroundColor="#38bdf8"
      hoverColor="#0ea5e9"
    >
      產生條碼
    </button-component>
    <button-component
      @click="exportFile"
      backgroundColor="#38bdf8"
      hoverColor="#0ea5e9"
    >
      輸出檔案
    </button-component>
  </div>
  <div class="product-table">
    <table>
      <tbody>
        <tr v-for="(item, index) in paginatedProductList" :key="index">
          <td>
            <input type="checkbox" v-model="item.modify" />
          </td>
          <td>
            <input-text
              label="商品編號"
              :content="item.code"
              :readonly="true"
            />
          </td>
          <td>
            <input-text
              label="商品名稱"
              :content="item.name"
              :readonly="true"
            />
          </td>
          <td>
            <input-text
              label="商品種類"
              :content="item.category"
              :readonly="true"
            />
          </td>
          <td>
            <input-number
              label="庫存量"
              :content="item.stockNumbers"
              @update:model-value="(val) => renewProductList(index, val)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁按鈕 -->
    <div class="pagination">
      <button
        class="prev-button"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      />
      <span>第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁</span>
      <button
        class="next-button"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      />
    </div>
  </div>

  <div class="product-button">
    <button-component
      @click="clickSubmit"
      backgroundColor="#38bdf8"
      hoverColor="#0ea5e9"
    >
      送出
    </button-component>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { InputNumber, InputText, ButtonComponent } from "@/components/Basics";
import {
  getStockProducts,
  updateStockSubmit,
  clickExportCode,
  clickExportFile,
} from "@/services/StockProductService";
import { StockProduct } from "@/types/StockProduct";

const productList = ref<StockProduct[]>([]);

// 每頁顯示的數量
const itemsPerPage = 10;

// 當前頁碼
const currentPage = ref(1);

// 計算當前頁的商品列表
const paginatedProductList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return productList.value.slice(start, end);
});

const renewProductList = (index: number, stockNumbers: number) => {
  const productIndex = (currentPage.value - 1) * itemsPerPage + index;
  productList.value[productIndex].stockNumbers = stockNumbers;
  productList.value[productIndex].modify = true;
};

// 總頁數
const totalPages = computed(() =>
  Math.ceil(productList.value.length / itemsPerPage)
);

// 切換頁碼
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const clickSubmit = () => {
  const modifiedProducts = productList.value.filter((item) => item.modify);
  updateStockSubmit(modifiedProducts);
};

const exportCode = () => {
  const modifiedProducts = productList.value.filter((item) => item.modify);
  clickExportCode(modifiedProducts);
};

const exportFile = () => {
  clickExportFile();
};

onMounted(async () => {
  const products = await getStockProducts();
  productList.value = products.map((item) => ({
    modfiy: false,
    code: item.code || "",
    name: item.name || "",
    category: item.category || "",
    stockNumbers: item.stockNumbers || 0,
    modify: false,
  }));
});
</script>

<style scoped lang="scss">
.product-table {
  width: 66.6%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;

  table {
    width: 100%;
    border: 1px solid #ccc;
    border-collapse: collapse;

    tr {
      border: 1px solid #ccc;
    }

    td {
      padding: 10px;
      text-align: left;
      border: 1px solid #ccc;
    }
  }

  .pagination {
    margin-top: 20px;
    text-align: center;

    .prev-button,
    .next-button {
      position: relative;
      width: 20px;
      height: 10px;
      background-color: #ffffff;
      color: #000;
      border: none;
      font-size: 10px;
      font-weight: bold;
      cursor: pointer;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &:disabled {
        color: #aaaaaa;
        cursor: not-allowed;
      }
    }

    .prev-button::before {
      content: "<";
    }

    .next-button::before {
      content: ">";
    }
  }
}

.botton-top {
  display: flex;
  justify-content: flex-end; // 按鈕靠左對齊
  align-items: center; // 垂直居中對齊
  gap: 0; // 移除 Flex 布局的間距
}
</style>
