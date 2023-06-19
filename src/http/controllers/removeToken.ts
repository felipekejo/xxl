import { FastifyReply, FastifyRequest } from "fastify";

export async function removeToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // TODO: I don't know if it's necessary to check if the cookie exist
  // as the button logout should only be appearing in case the user is logged in.
  // Clear refresh tokens from cookies.
  reply.clearCookie("refreshToken");

  // Return success response with status 200.
  return reply.status(200).send({ message: "Tokens removed successfully" });
}
