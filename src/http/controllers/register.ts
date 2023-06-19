import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

// Function to register a new user
export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Define the expected shape of the request body using the zod library
  const registerBodySchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  // Parse the request body according to the defined schema
  const { email, firstName, lastName, password } = registerBodySchema.parse(
    request.body
  );

  try {
    // Create an instance of the PrismaUsersRepository
    const prismaUsersRepository = new PrismaUsersRepository();

    // Create an instance of the RegisterUseCase and pass in the repository
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    // Call the execute method of the RegisterUseCase with the parsed request body
    await registerUseCase.execute({ email, firstName, lastName, password });
  } catch (error) {
    // If the error is an instance of UserAlreadyExistsError, return a 409 status code and the error message
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    // Otherwise, rethrow the error to be handled elsewhere
    throw error;
  }

  // If the registration was successful, return a 201 status code
  return reply.status(201).send();
}
