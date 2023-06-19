import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUsersUseCase } from "@/use-cases/get-users";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const listUsersQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = listUsersQuerySchema.parse(request.query);
  // Create a new instance of the PrismaUsersRepository
  const usersRepository = new PrismaUsersRepository();

  // Create a new instance of the GetUserProfileUseCase, passing in the users repository
  const getUsers = new GetUsersUseCase(usersRepository);

  // Call the GetUserProfileUseCase to get the user's profile data
  const { users } = await getUsers.execute({
    page,
  });

  // Return list of users profile data in the response body

  return reply.status(200).send({ users });
}
