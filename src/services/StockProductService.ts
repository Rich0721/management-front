import { saveAs } from "file-saver";
import { StockProduct } from "@/types/StockProduct";
import { request } from "./utils/requestAxios";
import { AxiosResponse } from "axios";

/**
 * Fetches the stock product list from the server.
 * @returns {Promise<StockProduct[]>} - A promise that resolves to the stock product list.
 */
export const getStockProducts = async (): Promise<StockProduct[]> => {
  try {
    const response = await request.get("/edit/getStockProduct");
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    alert("獲取產品列表失敗");
    return [];
  }
};

export const updateStockSubmit = (productList: StockProduct[]) => {
  try {
    const response = request.post("/edit/updateStockProduct", productList);
    console.log("Response:", response);
  } catch (error) {
    console.error("Error submitting product list:", error);
    alert("提交產品列表失敗");
  }
};

export const clickExportFile = async () => {
  try {
    const response = await request.get("/edit/downloadProductExcel", {
      responseType: "blob",
    });
    doanloadFile(response, "ProductList.xlsx");
  } catch (error) {
    console.error("Error downloading QR code file:", error);
    alert("下載失敗，請稍後重試！");
  }
};

export const clickExportCode = async (productList: StockProduct[]) => {
  try {
    const response = await request.post("/edit/downloadQRCode", productList, {
      responseType: "blob", // 確保返回的是二進制文件
    });

    doanloadFile(response, "QRCode.xlsx");
  } catch (error) {
    console.error("Error downloading QR code file:", error);
    alert("下載失敗，請稍後重試！");
  }
};

const doanloadFile = (response: AxiosResponse<any, any>, fileName: string) => {
  const contentDisposition = response.headers["content-disposition"];
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+)"/);
    if (match && match[1]) {
      fileName = decodeURIComponent(match[1]);
    }
  }
  // 使用 file-saver 保存文件
  saveAs(new Blob([response.data]), fileName);
};
