import router from "@/router";
import { RouterName } from "@/types/enums";
import { computed } from "vue";
import { useStore } from "vuex";

/**
 * 檢查使用者是否已經登入，否則導入登入畫面
 */
export const userLogCheck = () => {
  const store = useStore(); // 使用 Vuex store
  const islogin = computed(() => store.getters["UserInfoStore/isLogin"]);
  if (!islogin.value) {
    router.push({ name: RouterName.HOME });
  }
};
