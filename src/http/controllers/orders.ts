import { StripeOrdersRepository } from "@/repositories/stripe/stripe-orders-repository";
import { GetAllOrders } from "@/use-cases/get-all-orders";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getOrders(request: FastifyRequest, reply: FastifyReply) {
  const ordersRepository = new StripeOrdersRepository();

  const getAllOrders = new GetAllOrders(ordersRepository);

  const orders = await getAllOrders.execute();

  return reply.status(200).send(orders);
}
