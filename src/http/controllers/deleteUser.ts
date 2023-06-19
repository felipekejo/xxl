import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from "@/use-cases/delete-profile";
import { FastifyReply, FastifyRequest } from "fastify";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  // Create a new instance of the PrismaUsersRepository
  const usersRepository = new PrismaUsersRepository();

  // Create a new instance of the DeleteUserUseCase, passing in the users repository
  const deleteUser = new DeleteUserUseCase(usersRepository);
  const reqUserId = (request.body as { userId: string }).userId;
  // Call the DeleteUserUseCase to delete the user
  await deleteUser.execute({ userId: reqUserId });

  // Return just a message
  return reply.status(200).send({ message: "User deleted successfully" });
}
