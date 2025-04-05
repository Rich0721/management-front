import { request } from "@/services/requestAxios";
import { Product } from "@/types/Product";

export const handleSumbit = async (content: Product): Promise<number> => {
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
