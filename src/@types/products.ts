export interface Products {
  id: string;
  name: string;
  imageUrl: string[];
  unitLabel: string | null | undefined;
  price: number;
  priceId: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string[];
  unitLabel: string | null | undefined;
  description: string | null;
  price: number;
  priceId: string;
}

export interface LineItems {
  price: number;
  quantity: number;
}
