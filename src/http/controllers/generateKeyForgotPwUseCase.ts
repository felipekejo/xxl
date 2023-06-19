import { FastifyReply, FastifyRequest } from "fastify";
import { GenerateKeyForgotPwUseCase } from "@/use-cases/generate_key_forgot_pw";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { z } from "zod";

/**
 * Controller function to handle the forgot password functionality.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export async function generateKeyForgotPw(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const forgotPasswordBodySchema = z.object({
    email: z.string().email(),
  });

  const { email } = forgotPasswordBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository(); // Create an instance of PrismaUsersRepository
    const generateKeyForgotPwUseCase = new GenerateKeyForgotPwUseCase(
      prismaUsersRepository
    ); // Create an instance of GenerateKeyForgotPwUseCase
    const result = await generateKeyForgotPwUseCase.execute({
      email,
    });

    return reply.status(200).send(result); // Send a 200 OK response with the result
  } catch (error: any) {
    return reply.status(400).send({ error: error.message }); // If an error occurs, send a 400 Bad Request response with the error message
  }
}
