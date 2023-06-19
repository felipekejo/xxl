import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaServicesRepository } from "@/repositories/prisma/prisma-services-repository";
import { GetServicesByPhoneIdUseCase } from "@/use-cases/get-services-by-phone-id";

export async function listServicesByPhoneId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listServicesByPhoneIdQuerySchema = z.object({
    phoneId: z.string(),
  });
  const { phoneId } = listServicesByPhoneIdQuerySchema.parse(request.params);
  // Create a new instance of the PrismaServicesRepository
  const servicesRepository = new PrismaServicesRepository();

  // Create a new instance of the GetServicesByPhoneIdUseCase, passing in the services repository
  const getServicesByPhoneId = new GetServicesByPhoneIdUseCase(
    servicesRepository
  );

  // Call the GetServicesByPhoneIdUseCase to get the list of services by phoneId
  const { services } = await getServicesByPhoneId.execute({
    phoneId,
  });

  // Return the list of services in the response body
  return reply.status(200).send({ services });
}
