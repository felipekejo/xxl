import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // Create a new instance of the PrismaUsersRepository
  const usersRepository = new PrismaUsersRepository();

  // Create a new instance of the GetUserProfileUseCase, passing in the users repository
  const getUserProfile = new GetUserProfileUseCase(usersRepository);

  // Call the GetUserProfileUseCase to get the user's profile data
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  // Return the user's profile data in the response body
  // The password_hash field is set to undefined so it won't be sent in the response
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
