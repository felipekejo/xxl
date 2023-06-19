import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResetPasswordUseCase } from "@/use-cases/reset-password";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

// Function to handle the forgot password functionality
export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Define the expected shape of the request body using the zod library
  const forgotPasswordBodySchema = z.object({
    email: z.string().email(),
    resetKey: z.string(),
    newPassword: z.string().min(6),
  });

  // Parse the request body according to the defined schema
  const { resetKey, newPassword, email } = forgotPasswordBodySchema.parse(
    request.body
  );

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const resetPasswordUseCase = new ResetPasswordUseCase(
      prismaUsersRepository
    );
    await resetPasswordUseCase.execute({ email, newPassword, resetKey });
  } catch (error) {
    throw new Error("Invalid reset key");
  }

  // If the password reset was successful, return a 200 status code
  return reply.status(200).send();
}
