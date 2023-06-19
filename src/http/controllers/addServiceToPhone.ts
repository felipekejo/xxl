import { PrismaServicesRepository } from "@/repositories/prisma/prisma-services-repository";
import { AddServiceToPhoneUseCase } from "@/use-cases/add-service-to-phone";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function addServiceToPhone(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Defining the schema for the request body
  const addServiceBodySchema = z.object({
    phoneId: z.string(),
    serviceName: z.string(),
    servicePrice: z.number(),
  });

  // Create a new instance of the PrismaServicesRepository
  const servicesRepository = new PrismaServicesRepository();

  // Create a new instance of the AddServiceToPhoneUseCase, passing in the services repository
  const addService = new AddServiceToPhoneUseCase(servicesRepository);

  try {
    // Get the phoneId, serviceName, and servicePrice from the request body
    const { phoneId, serviceName, servicePrice } = addServiceBodySchema.parse(
      request.body
    );

    // Convert the servicePrice to a string with two digits after the decimal point
    const formattedServicePrice = servicePrice.toFixed(2);

    // Call the AddServiceToPhoneUseCase to add the service to the phone's service array
    const service = await addService.execute({
      phoneId,
      serviceData: {
        name: serviceName,
        price: formattedServicePrice,
        Phone: { connect: { id: phoneId } },
      },
    });

    // Return a success response with the added service
    return reply
      .status(201)
      .send({ message: "Service added to phone successfully", service });
  } catch (error) {
    // Handle any errors that occurred during the process
    return reply.status(500).send({ error: "Failed to add service to phone" });
  }
}
