import { Products } from "@/@types/products";
import { ProductsRepository } from "@/repositories/products-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface SearchProductsUseCaseRequest {
  unitLabel: string;
}

interface SearchProductsUseCaseResponse {
  products: Products[];
}

export class SearchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    unitLabel,
  }: SearchProductsUseCaseRequest): Promise<SearchProductsUseCaseResponse> {
    const products = await this.productsRepository.findByLabel(unitLabel);

    if (!products) {
      throw new ResourceNotFoundError();
    }

    return { products };
  }
}
