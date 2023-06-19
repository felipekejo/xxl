import { StripeCheckOutRepository } from "@/repositories/stripe/stripe-checkout-repository";
import { CreateCheckOutSessionUseCase } from "@/use-cases/checkout";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function checkOut(request: FastifyRequest, reply: FastifyReply) {
  const checkOutBodySchema = z.array(
    z.object({
      price: z.string(),
      quantity: z.number(),
    })
  );

  const lineItems = checkOutBodySchema.parse(request.body);

  const checkOutRepository = new StripeCheckOutRepository();
  const createCheckOut = new CreateCheckOutSessionUseCase(checkOutRepository);

  const url = await createCheckOut.execute({ lineItems });

  return reply.status(200).send(url);
}
