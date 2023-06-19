import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UpdateServiceUseCase } from "@/use-cases/update-service";
import { PrismaServicesRepository } from "@/repositories/prisma/prisma-services-repository";

// Function to update the service details
export async function updateService(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Define the expected shape of the request body using the zod library
  const updateServiceBodySchema = z.object({
    serviceId: z.string(),
    newPrice: z.string().optional(),
    newServiceName: z.string().optional(),
  });

  // Parse the request body according to the defined schema
  const { serviceId, newPrice, newServiceName } = updateServiceBodySchema.parse(
    request.body
  );

  // Create an instance of the PrismaServicesRepository
  const prismaServicesRepository = new PrismaServicesRepository();

  // Create an instance of the UpdateServiceUseCase and pass in the repository
  const updateServiceUseCase = new UpdateServiceUseCase(
    prismaServicesRepository
  );

  // Format the newPrice value with two digits after the decimal point
  const formattedNewPrice = newPrice
    ? parseFloat(newPrice).toFixed(2)
    : undefined;

  // Call the execute method of the UpdateServiceUseCase with the parsed request body
  await updateServiceUseCase.execute({
    serviceId,
    newPrice: formattedNewPrice,
    newServiceName,
  });

  // If the service update was successful, return a 200 status code
  return reply.status(200).send();
}
