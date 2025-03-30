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

export const clickPrev = (index: number, imageList: string[]): number => {
  return index > 0 ? index - 1 : imageList.length - 1;
};

export const clickNext = (index: number, imageList: string[]): number => {
  return index < imageList.length - 1 ? index + 1 : 0;
};
