import { PrismaPhonesRepository } from "@/repositories/prisma/prisma-phones-repository";
import { GetPhonesUseCase } from "@/use-cases/get-phones";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listPhones(request: FastifyRequest, reply: FastifyReply) {
  const listPhonesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = listPhonesQuerySchema.parse(request.query);

  // Create a new instance of the PrismaPhonesRepository
  const phonesRepository = new PrismaPhonesRepository();

  // Create a new instance of the GetPhonesUseCase, passing in the phones repository
  const getPhones = new GetPhonesUseCase(phonesRepository);

  // Call the GetPhonesUseCase to get the list of phones
  const { phones } = await getPhones.execute({
    page,
  });

  // Return the list of phones in the response body
  return reply.status(200).send({ phones });
}
