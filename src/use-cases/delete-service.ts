import { ServicesRepository } from "@/repositories/services-repository";

// Define the request interface for the use case
interface DeleteServiceUseCaseRequest {
  phoneId: string;
  serviceId: string;
}

// Define the use case class
export class DeleteServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  // Define the execute method for the use case
  async execute({
    phoneId,
    serviceId,
  }: DeleteServiceUseCaseRequest): Promise<void> {
    // Delete the service by ID using the injected repository
    await this.servicesRepository.deleteServiceById(phoneId, serviceId);
    console.log("aaaaa");
  }
}
