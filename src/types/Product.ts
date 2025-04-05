export interface Product {
  code?: string;
  images?: string[];
  name?: string;
  cost?: number;
  price?: number;
  description?: string;
  category?: string;
  content?: string;
}

export interface ShowProduct {
  code: string;
  images: string;
  name: string;
  cost: number;
  price: number;
  description: string;
  category: string;
  content: string;
}
