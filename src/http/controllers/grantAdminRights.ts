import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GrantAdminRightsUseCase } from "@/use-cases/grant-admin-rights";

/**
 * Function to grant admin rights to a user
 */
export async function grantAdminRights(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Define the expected shape of the request body using the zod library
  const grantAdminRightsBodySchema = z.object({
    id: z.string(),
  });

  // Parse the request body according to the defined schema
  const { id } = grantAdminRightsBodySchema.parse(request.body);

  // Create an instance of the PrismaUsersRepository
  const prismaUsersRepository = new PrismaUsersRepository();

  // Create an instance of the GrantAdminRightsUseCase and pass in the repository
  const grantAdminRightsUseCase = new GrantAdminRightsUseCase(
    prismaUsersRepository
  );

  // Call the execute method of the GrantAdminRightsUseCase with the parsed request body
  await grantAdminRightsUseCase.execute({ id });

  // If granting admin rights was successful, return a 200 status code
  return reply.status(200).send();
}
