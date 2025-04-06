import { StockProduct } from "@/types/StockProduct";

export function clickSubmit(productList: StockProduct[]) {
  const modifiedProducts = productList.filter(
    (item: StockProduct) => item.modify
  );
  console.log("Modified Products:", modifiedProducts);
  // 在這裡可以進行提交操作
}

export function clickExportFile(productList: StockProduct[]) {
  console.log("Exported Products:");
  // 在這裡可以進行導出操作
}

export function clickExportCode(productList: StockProduct[]) {}
