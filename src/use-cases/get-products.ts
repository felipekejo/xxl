import { Products } from "@/@types/products";
import { ProductsRepository } from "@/repositories/products-repository";

interface GetProductsUseCaseResponse {
  products: Products[];
}

export class GetProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<GetProductsUseCaseResponse> {
    const products = await this.productsRepository.findAll();

    return {
      products,
    };
  }
}
