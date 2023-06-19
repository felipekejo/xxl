import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ChangePasswordUseCase } from "@/use-cases/change-password";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

// Function to change the user's password
export async function changePassword(request: FastifyRequest, reply: FastifyReply) {
    // Define the expected shape of the request body using the zod library
    const changePasswordBodySchema = z.object({
        email: z.string().email(),
        currentPassword: z.string(),
        newPassword: z.string().min(6),
    });

    // Parse the request body according to the defined schema
    const { email, currentPassword, newPassword } = changePasswordBodySchema.parse(
        request.body
    );

    try {
        // Create an instance of the PrismaUsersRepository
        const prismaUsersRepository = new PrismaUsersRepository();

        // Create an instance of the ChangePasswordUseCase and pass in the repository
        const changePasswordUseCase = new ChangePasswordUseCase(prismaUsersRepository);

        // Call the execute method of the ChangePasswordUseCase with the parsed request body
        await changePasswordUseCase.execute({ email, currentPassword, newPassword });
    } catch (error) {
        // Throw the error to be handled elsewhere
        throw error;
    }

    // If the password change was successful, return a 200 status code
    return reply.status(200).send();
}
