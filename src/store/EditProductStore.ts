import { request } from "@/services/requestAxios";
import { Product } from "@/types/Product";

export const handleSumbit = (content: Product) => {
  console.log(content);
  request
    .post<Product>(`/edit/updateProduct`, content)
    .then((res) => {
      alert("修改成功");
    })
    .catch((err) => {
      console.error(err);
      alert("修改失敗");
    });
};

export const handleDelete = () => {
  if (confirm("確定要刪除嗎？")) {
    console.log("Product deleted");
    // Add your delete logic here, such as an API call to delete the product
  }
};
