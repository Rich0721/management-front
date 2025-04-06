<template>
  <div class="product">
    <a
      class="card"
      v-for="(item, index) in productList"
      :key="index"
      @click="goToEdit(item.code)"
    >
      <img :src="item.images" />
      <div class="content">
        <h2>{{ item.name }}</h2>
        <p>價格: {{ item.price }}</p>
        <p>分類: {{ item.category }}</p>
        <p>簡介: {{ item.description }}</p>
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { request } from "@/services/requestAxios";
import { Product, ShowProduct } from "@/types/Product";
import { RouterPath } from "@/types/enums";

const router = useRouter();
const productList = ref<ShowProduct[]>([]);
const fetchProducts = async () => {
  try {
    productList.value = []; // Clear the list before fetching
    const response = await request.get("/edit/getAllProduct");
    response.data.forEach((item: Product) => {
      const showProduct: ShowProduct = {
        code: item.code || "",
        name: item.name || "",
        cost: item.cost || 1,
        price: item.price || 1,
        category: item.category || "",
        description: item.description || "", // Assuming images is an array and we want the first image
        content: item.content || "",
        images: item.images ? item.images[0] : "", // Assuming images is an array and we want the first image
      };
      productList.value.push(showProduct);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const goToEdit = (code?: string) => {
  // Navigate to the edit page with the product ID
  router.push({ path: `${RouterPath.PRODUCTS}/${code}` });
};

onMounted(fetchProducts);
</script>

<style scoped lang="scss">
#product {
  position: relative;
  width: 66.6%;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

a.card {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 66.6%;
  max-height: 200px;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.2);
  margin: 20px auto;
  opacity: 0.7;
  transition: opacity 0.2s;
  background-color: rgb(231, 231, 231);
  &:hover {
    opacity: 1;
  }
  > img {
    flex: 0 0 auto;
    max-width: 300px;
    margin-right: 10px;
    object-fit: contain; /* Ensures the image scales while maintaining its aspect ratio */
    display: block;
    margin: auto; /* 水平置中 */
  }
  .content {
    flex: 0 0 67%; /* Fix the width to 67% */
    max-width: 67%;
    text-align: left; /* 確保內容靠左對齊 */

    > h2 {
      font-size: 16px; /* 可根據需要調整字體大小 */
      margin: 0 0 10px 0; /* 增加間距 */
      text-align: left; /* 確保標題靠左對齊 */
    }

    > p {
      font-size: 14px; /* 可根據需要調整字體大小 */
      margin: 5px 0; /* 增加段落間距 */
      text-align: left; /* 確保段落靠左對齊 */
    }
  }
}
</style>
