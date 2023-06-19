import { Prisma, Service } from "@prisma/client";

// ServicesRepository interface defines the contract for interacting with the service data
export interface ServicesRepository {
  getServiceById(serviceId: string): Promise<Service | null>;

  // getServiceByIdFromPhoneId retrieves a service by its ID from a specific phone ID
  getServiceByIdFromPhoneId(
    phoneId: string,
    serviceId: string
  ): Promise<Service | null>;

  // getServiceByNameFromPhoneId retrieves a service by its name from a specific phone ID
  getServiceByNameFromPhoneId(
    phoneId: string,
    serviceName: string
  ): Promise<Service | null>;

  // getAllServicesFromPhoneId retrieves all services associated with a specific phone ID
  getAllServicesFromPhoneId(phoneId: string): Promise<Service[]>;

  // getAllServicesFromPhoneName retrieves all services associated with a specific phone name
  getAllServicesFromPhoneName(phoneName: string): Promise<Service[]>;

  // addNewServiceToPhoneServiceArray adds a new service to the service array of a specific phone ID
  addNewServiceToPhoneServiceArray(
    phoneId: string,
    serviceData: Prisma.ServiceCreateInput
  ): Promise<Service>;

  // deleteServiceById removes a service ID from the DB
  deleteServiceById(phoneId: string, serviceId: string): Promise<void>;

  // updateService updates the properties of a service
  updateService(service: Service): Promise<Service | null>;
}
