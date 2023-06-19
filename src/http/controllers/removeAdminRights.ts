import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RemoveAdminRightsUseCase } from "@/use-cases/remove-admin-rights";

/**
 * Function to remove admin rights from a user
 */
export async function removeAdminRights(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Define the expected shape of the request body using the zod library
  const removeAdminRightsBodySchema = z.object({
    id: z.string(),
  });

  // Parse the request body according to the defined schema
  const { id } = removeAdminRightsBodySchema.parse(request.body);

  // Create an instance of the PrismaUsersRepository
  const prismaUsersRepository = new PrismaUsersRepository();

  // Create an instance of the RemoveAdminRightsUseCase and pass in the repository
  const removeAdminRightsUseCase = new RemoveAdminRightsUseCase(
    prismaUsersRepository
  );

  // Call the execute method of the RemoveAdminRightsUseCase with the parsed request body
  await removeAdminRightsUseCase.execute({ id });

  // If removing admin rights was successful, return a 200 status code
  return reply.status(200).send();
}
