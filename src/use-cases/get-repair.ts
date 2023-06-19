import { RepairsRepository } from "@/repositories/repairs-repository";
import { Repair } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

// Define the request interface for the use case
interface GetRepairUseCaseRequest {
  id: string;
}

// Define the response interface for the use case
interface GetRepairUseCaseResponse {
  repair: Repair | null;
}

// Define the use case class
export class GetRepairUseCase {
  constructor(private repairsRepository: RepairsRepository) {}

  // Define the execute method for the use case
  async execute({
    id,
  }: GetRepairUseCaseRequest): Promise<GetRepairUseCaseResponse> {
    // Find the repair by id using the injected repository
    const repair = await this.repairsRepository.findById(id);

    // If the repair is not found, throw a ResourceNotFoundError
    if (!repair) {
      throw new ResourceNotFoundError();
    }

    // Return the repair in a response object
    return { repair };
  }
}
