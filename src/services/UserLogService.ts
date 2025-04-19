import { request } from "./utils/requestAxios";
import { UserInfo } from "@/types/UserInfo";

/**
 * User Login
 *
 *
 */
export const postUserLogin = async (body: UserInfo): Promise<UserInfo> => {
  try {
    const response = await request.post("/user/login", body);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    alert("登入失敗，請稍後重試！");
    return {} as UserInfo;
  }
};
