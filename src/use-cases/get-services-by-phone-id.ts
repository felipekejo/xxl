import { ServicesRepository } from "@/repositories/services-repository";
import { Service } from "@prisma/client";

// Define the request interface for the use case
interface GetServicesByPhoneIdUseCaseRequest {
  phoneId: string;
}

// Define the response interface for the use case
interface GetServicesByPhoneIdUseCaseResponse {
  services: Service[];
}

// Define the use case class
export class GetServicesByPhoneIdUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  // Define the execute method for the use case
  async execute({
    phoneId,
  }: GetServicesByPhoneIdUseCaseRequest): Promise<GetServicesByPhoneIdUseCaseResponse> {
    // Find the services by phoneId using the injected repository
    const services = await this.servicesRepository.getAllServicesFromPhoneId(
      phoneId
    );

    // If no services are found, return empty array
    if (!services || services.length === 0) {
      // TODO: decide if return empty array or throw error.
      return { services: [] };
      // throw new ResourceNotFoundError();
    }

    // Return the services in a response object
    return {
      services,
    };
  }
}
