import { ServicesRepository } from "@/repositories/services-repository";
import { ServiceNotFoundError } from "./errors/service-not-found-error";

// Define the request interface for the use case
interface UpdateServiceUseCaseRequest {
  serviceId: string;
  newPrice?: string;
  newServiceName?: string;
}

// Define the UpdateServiceUseCase class
export class UpdateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  // Define the execute method for the use case
  async execute({
    serviceId,
    newPrice,
    newServiceName,
  }: UpdateServiceUseCaseRequest): Promise<void> {
    // Find the service by ID using the injected repository
    const service = await this.servicesRepository.getServiceById(serviceId);

    // If the service does not exist, throw a ServiceNotFoundError
    if (!service) {
      throw new ServiceNotFoundError();
    }

    // Update the service properties if new values are provided
    if (newPrice) {
      service.price = newPrice;
    }
    if (newServiceName) {
      service.name = newServiceName;
    }

    // Save the updated service in the database
    await this.servicesRepository.updateService(service);
  }
}
