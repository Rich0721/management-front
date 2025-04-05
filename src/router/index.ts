import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EditIndex from "@/views/Edit/EditIndex.vue";
import EditProduct from "@/views/Edit/EditProduct.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/edit",
    name: "edit",
    children: [
      {
        path: "",
        component: EditIndex,
      },
      {
        path: "/edit/:id",
        name: "edit-product",
        component: EditProduct,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
