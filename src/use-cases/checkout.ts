import { CheckOutSessionURL, ProductCheckOut } from "@/@types/checkout";
import { CheckOutRepository } from "@/repositories/check-out-repository";

interface CreateCheckOutSessionUseCaseRequest {
  lineItems: ProductCheckOut[];
}

interface CreateCheckOutSessionUseCaseResponse {
  url: CheckOutSessionURL;
}

export class CreateCheckOutSessionUseCase {
  constructor(private checkOutRepository: CheckOutRepository) {}

  async execute({
    lineItems,
  }: CreateCheckOutSessionUseCaseRequest): Promise<CreateCheckOutSessionUseCaseResponse | null> {
    const url = await this.checkOutRepository.create(lineItems);

    if (!url) {
      return null;
    }

    return {
      url,
    };
  }
}
