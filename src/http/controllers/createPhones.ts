import { PrismaPhonesRepository } from "@/repositories/prisma/prisma-phones-repository";
import { CreatePhoneUseCase } from "@/use-cases/create-phone";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPhones(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Defining the schema for the request body
  const createPhoneBodySchema = z.object({
    phoneName: z.string(),
  });

  // Create a new instance of the PrismaPhonesRepository
  const phonesRepository = new PrismaPhonesRepository();

  // Create a new instance of the CreatePhoneUseCase, passing in the phones repository
  const createPhone = new CreatePhoneUseCase(phonesRepository);

  // Get the phone name from the request body
  const { phoneName } = createPhoneBodySchema.parse(request.body);

  try {
    // Call the CreatePhoneUseCase to create the phone with empty service names and prices
    await createPhone.execute({
      phoneName,
    });

    // Return a success response
    return reply
      .status(201)
      .send({ message: "Phone and services created successfully" });
  } catch (error) {
    // Handle any errors that occurred during the creation process
    return reply
      .status(500)
      .send({ error: "Failed to create phone and services" });
  }
}
