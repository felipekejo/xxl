export interface Products {
  id: string;
  name: string;
  imageUrl: string[];
  unitLabel: string | null | undefined;
  price: string;
  priceId: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string[];
  unitLabel: string | null | undefined;
  description: string | null;
  price: string;
  priceId: string;
}

export interface LineItems {
  price: string;
  quantity: number;
}
