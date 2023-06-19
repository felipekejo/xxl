import { ProductCheckOut } from "@/@types/checkout";

export interface CheckOutRepository {
  create(lineItems: ProductCheckOut[]): Promise<string | null>;
}
