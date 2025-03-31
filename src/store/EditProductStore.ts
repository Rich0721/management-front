import { Product } from "@/types/Product";

export const handleSumbit = (content: Product) => {
  console.log(content);
};

export const handleDelete = () => {
  if (confirm("確定要刪除嗎？")) {
    console.log("Product deleted");
    // Add your delete logic here, such as an API call to delete the product
  }
};
