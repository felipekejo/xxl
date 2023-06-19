import { Product } from "@/@types/products";
import { ProductsRepository } from "@/repositories/products-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetProductUseCaseRequest {
  productId: string;
}

interface GetProductUseCaseResponse {
  product: Product;
}

export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    return {
      product,
    };
  }
}
