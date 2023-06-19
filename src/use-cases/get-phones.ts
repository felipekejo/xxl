import { PhonesRepository } from "@/repositories/phones-repository";
import { Phone } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

// Define the request interface for the use case
interface GetPhonesUseCaseRequest {
  page: number;
}

// Define the response interface for the use case
interface GetPhonesUseCaseResponse {
  phones: Phone[];
}

// Define the use case class
export class GetPhonesUseCase {
  constructor(private phonesRepository: PhonesRepository) {}

  // Define the execute method for the use case
  async execute({
    page,
  }: GetPhonesUseCaseRequest): Promise<GetPhonesUseCaseResponse> {
    // Find the phones using the injected repository
    const phones = await this.phonesRepository.findMany(page);

    // If no phones are found, return empty array
    if (!phones || phones.length === 0) {
      // TODO: decide if return empty array or throw error.
      return { phones: [] };
      // throw new ResourceNotFoundError();
    }

    // Return the phones in a response object
    return {
      phones,
    };
  }
}
