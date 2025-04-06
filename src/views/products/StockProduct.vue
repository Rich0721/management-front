<template>
  <div class="botton-top">
    <button-component backgroundColor="#38bdf8" hoverColor="#0ea5e9">
      產生條碼
    </button-component>
    <button-component backgroundColor="#38bdf8" hoverColor="#0ea5e9">
      輸出檔案
    </button-component>
  </div>
  <div class="product-table">
    <table>
      <tbody>
        <tr v-for="(item, index) in paginatedProductList" :key="index">
          <td>
            <input type="checkbox" v-model="item.modfiy" />
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
              :content="item.stock"
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
import { ref, computed } from "vue";
import { InputNumber, InputText, ButtonComponent } from "@/components/Basics";
import { clickSubmit } from "@/store/StockProductStore";

const productList = ref([
  { modfiy: false, code: "P001", name: "商品1", category: "類別1", stock: 100 },
  { modfiy: false, code: "P002", name: "商品2", category: "類別2", stock: 200 },
  { modfiy: false, code: "P003", name: "商品3", category: "類別3", stock: 300 },
  { modfiy: false, code: "P004", name: "商品1", category: "類別1", stock: 100 },
  { modfiy: false, code: "P005", name: "商品2", category: "類別2", stock: 200 },
  { modfiy: false, code: "P006", name: "商品3", category: "類別3", stock: 300 },
  { modfiy: false, code: "P007", name: "商品1", category: "類別1", stock: 100 },
  { modfiy: false, code: "P008", name: "商品2", category: "類別2", stock: 200 },
  { modfiy: false, code: "P009", name: "商品3", category: "類別3", stock: 300 },
  { modfiy: false, code: "P010", name: "商品1", category: "類別1", stock: 100 },
  { modfiy: false, code: "P011", name: "商品2", category: "類別2", stock: 200 },
  { modfiy: false, code: "P012", name: "商品3", category: "類別3", stock: 300 },
  { modfiy: false, code: "P013", name: "商品1", category: "類別1", stock: 100 },
  { modfiy: false, code: "P014", name: "商品2", category: "類別2", stock: 200 },
  { modfiy: false, code: "P015", name: "商品3", category: "類別3", stock: 300 },
]);

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

const renewProductList = (index: number, stock: number) => {
  const productIndex = (currentPage.value - 1) * itemsPerPage + index;
  productList.value[productIndex].stock = stock;
  productList.value[productIndex].modfiy = true;
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
