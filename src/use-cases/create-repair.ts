import { RepairsRepository } from "@/repositories/repairs-repository";

// Define the request interface for the use case
interface CreateRepairUseCaseRequest {
  title: string;
  problemDescription: string;
  contact?: string | null;
  serviceId?: string | null;
}

// Define the use case class
export class CreateRepairUseCase {
  constructor(private repairsRepository: RepairsRepository) {}

  // Define the execute method for the use case
  async execute({
    title,
    problemDescription,
    contact,
    serviceId,
  }: CreateRepairUseCaseRequest) {
    await this.repairsRepository.create({
      title,
      problemDescription,
      contact,
      serviceId,
    });
  }
}
