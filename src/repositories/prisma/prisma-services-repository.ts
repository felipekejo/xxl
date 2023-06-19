import { prisma } from "@/lib/prisma";
import { Prisma, Service } from "@prisma/client";
import { ServicesRepository } from "../services-repository";

// PrismaServicesRepository implements the ServicesRepository interface
export class PrismaServicesRepository implements ServicesRepository {
  // getServiceById retrieves a service by its ID
  async getServiceById(serviceId: string): Promise<Service | null> {
    try {
      const service = await prisma.service.findUnique({
        where: {
          id: serviceId,
        },
      });
      return service;
    } catch (error) {
      console.log("Error fetching service by ID:", error);
      return null;
    }
  }

  // getServiceByIdFromPhoneId retrieves a service by its ID and associated phone ID
  async getServiceByIdFromPhoneId(phoneId: string, serviceId: string) {
    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
        phoneId,
      },
    });
    return service;
  }

  // getServiceByNameFromPhoneId retrieves a service by its name and associated phone ID
  async getServiceByNameFromPhoneId(phoneId: string, serviceName: string) {
    const service = await prisma.service.findFirst({
      where: {
        name: {
          equals: serviceName,
        },
        phoneId,
      },
    });
    return service;
  }

  // getAllServicesFromPhoneId retrieves all services associated with a phone ID
  async getAllServicesFromPhoneId(phoneId: string) {
    const services = await prisma.service.findMany({
      where: {
        phoneId,
      },
    });
    return services;
  }

  // getAllServicesFromPhoneName retrieves all services associated with a phone name
  async getAllServicesFromPhoneName(phoneName: string) {
    const services = await prisma.service.findMany({
      where: {
        Phone: {
          name: {
            equals: phoneName,
          },
        },
      },
    });
    return services;
  }

  // addNewServiceToPhoneServiceArray adds a new service to the service array of a phone
  async addNewServiceToPhoneServiceArray(
    phoneId: string,
    serviceData: Prisma.ServiceCreateInput
  ) {
    const service = await prisma.service.create({
      data: {
        ...serviceData,
        Phone: {
          connect: {
            id: phoneId,
          },
        },
      },
    });
    return service;
  }

  async updateService(service: Service): Promise<Service | null> {
    try {
      const updatedService = await prisma.service.update({
        where: {
          id: service.id,
        },
        data: {
          name: service.name,
          price: service.price,
        },
      });
      return updatedService;
    } catch (error) {
      console.log("Error updating service:", error);
      return null;
    }
  }

  // deleteServiceById deletes a service
  async deleteServiceById(phoneId: string, serviceId: string): Promise<void> {
    await prisma.service.delete({
      where: {
        id: serviceId,
      },
    });
  }
}
