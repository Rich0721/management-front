import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { RouterName, RouterPath } from "@/types/enums";
import HomeView from "../views/HomeView.vue";
import EditIndex from "@/views/products/EditIndex.vue";
import StockProduct from "@/views/products/StockProduct.vue";
import EditProduct from "@/views/products/EditProduct.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: RouterPath.HOME,
    name: RouterName.HOME,
    component: HomeView,
  },
  {
    path: RouterPath.PRODUCTS,
    name: RouterName.PRODUCTS,
    children: [
      {
        path: RouterName.EMPTY,
        component: EditIndex,
      },
      {
        path: RouterPath.EDIT_PRODUCT,
        name: RouterName.EDIT_PRODUCT,
        component: EditProduct,
        props: true,
      },
      {
        path: RouterPath.STOCK,
        name: RouterName.STOCK,
        component: StockProduct,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
