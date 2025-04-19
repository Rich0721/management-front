import { Module } from "vuex";
import { UserInfo } from "@/types/UserInfo";
import { postUserLogin } from "@/services/UserLogService";

export interface UserInfoState {
  isLogin: boolean;
  isAdmin: boolean;
  userInfo: UserInfo;
}

const UserInfoStore: Module<UserInfoState, any> = {
  namespaced: true, // 啟用命名空間
  state: {
    isLogin: false,
    isAdmin: false,
    userInfo: {} as UserInfo,
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    isLogin(state) {
      return state.isLogin;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
  },
  mutations: {
    setUserInfo(state, userInfo: UserInfo) {
      postUserLogin(userInfo)
        .then((response) => {
          state.userInfo = response;
          state.isLogin = true;
          if (state.userInfo.userPermission === "admin") {
            state.isAdmin = true;
          }
          console.log("登入成功", response);
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          alert("登入失敗，請稍後重試！");
        });
    },
    logout(state) {
      state.isLogin = false;
      state.userInfo = {} as UserInfo;
      state.isAdmin = false;
      console.log("登出成功");
    },
  },
  actions: {
    setUserInfo({ commit }, userInfo: UserInfo) {
      commit("setUserInfo", userInfo);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
};

export default UserInfoStore;
