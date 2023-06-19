import { Product, Products } from "@/@types/products";

export interface ProductsRepository {
  // findAll retrieves all products
  findAll(): Promise<Products[]>;
  // findById retrieves a product by their ID
  findById(id: string): Promise<Product | null>;
  // findByLabel retrieves a product by their unit label
  findByLabel(unitLabel: string): Promise<Products[] | null>;
}
