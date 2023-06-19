import { PrismaServicesRepository } from "@/repositories/prisma/prisma-services-repository";
import { DeleteServiceUseCase } from "@/use-cases/delete-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteService(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Create a new instance of the PrismaServicesRepository
  const servicesRepository = new PrismaServicesRepository();

  // Create a new instance of the DeleteServiceUseCase, passing in the services repository
  const deleteService = new DeleteServiceUseCase(servicesRepository);
  const { phoneId, serviceId } = request.params as {
    phoneId: string;
    serviceId: string;
  };

  // Call the DeleteServiceUseCase to delete the service
  await deleteService.execute({ phoneId, serviceId });

  // Return a success message
  return reply.status(200).send({ message: "Service deleted successfully" });
}
