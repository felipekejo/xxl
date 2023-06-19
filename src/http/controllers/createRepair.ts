import { PrismaRepairsRepository } from "@/repositories/prisma/prisma-repairs-repository";
import { CreateRepairUseCase } from "@/use-cases/create-repair";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createRepair(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Define the schema for the request body
  const createRepairBodySchema = z.object({
    title: z.string().nonempty(),
    problemDescription: z.string().nonempty(),
    contact: z.string(),
    serviceId: z.string().optional(),
  });

  // Create a new instance of the PrismaRepairsRepository
  const repairsRepository = new PrismaRepairsRepository();

  // Create a new instance of the CreateRepairUseCase, passing in the repairs repository
  const createRepair = new CreateRepairUseCase(repairsRepository);

  // Get the request body
  const { title, problemDescription, contact, serviceId } =
    createRepairBodySchema.parse(request.body);

  try {
    // Call the CreateRepairUseCase to create the repair
    await createRepair.execute({
      title,
      problemDescription,
      contact,
      serviceId,
    });

    // Return a success response
    return reply.status(201).send({ message: "Repair created successfully" });
  } catch (error) {
    // Handle any errors that occurred during the creation process
    return reply.status(500).send({ error: "Failed to create repair" });
  }
}
