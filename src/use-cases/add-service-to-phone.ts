import { ServicesRepository } from "@/repositories/services-repository";
import { Prisma } from "@prisma/client";

// Define the request interface for the use case
interface AddServiceToPhoneUseCaseRequest {
  phoneId: string;
  serviceData: Prisma.ServiceCreateInput;
}

// Define the use case class
export class AddServiceToPhoneUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  // Define the execute method for the use case
  async execute({ phoneId, serviceData }: AddServiceToPhoneUseCaseRequest) {
    // Create the service using the injected repository
    const service =
      await this.servicesRepository.addNewServiceToPhoneServiceArray(
        phoneId,
        serviceData
      );

    return service;
  }
}
