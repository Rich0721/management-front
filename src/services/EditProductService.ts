import { request } from "@/services/utils/requestAxios";
import { Product } from "@/types/Product";

/**
 * Fetches the product list from the server.
 * @return {Promise<Product>} - A promise that resolves to the product list.
 * @throws {Error} - Throws an error if the request fails.
 */
export const getProductList = async (): Promise<Product[]> => {
  try {
    const response = await request.get("/edit/getAllProduct");
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    alert("獲取產品列表失敗");
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await request.get<Product>(`/edit/getProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    alert("獲取產品失敗");
    return null;
  }
};

export const editSubmit = async (content: Product): Promise<number> => {
  try {
    const response = await request.post<Product>(
      `/edit/updateProduct`,
      content
    );
    return response.status;
  } catch (err) {
    console.error(err);
    alert("修改失敗");
    return 500;
  }
};

export const handleDelete = () => {
  if (confirm("確定要刪除嗎？")) {
    console.log("Product deleted");
    // Add your delete logic here, such as an API call to delete the product
  }
};
