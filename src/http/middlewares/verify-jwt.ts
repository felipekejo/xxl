import { FastifyReply, FastifyRequest } from "fastify";

/**
Middleware function to verify a JSON Web Token (JWT) sent in the request header.
@param {FastifyRequest} request - Fastify request object.
@param {FastifyReply} reply - Fastify reply object.
@returns {Promise<void>} - Promise that resolves when the JWT is successfully verified, or rejects with an error if it fails.
*/

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized!", code: err.code });
  }
}
