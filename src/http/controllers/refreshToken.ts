import { FastifyRequest, FastifyReply } from "fastify";

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify({ onlyCookie: true });

  const { first_name, last_name, sub, role } = request.user;

  // Generate a new access token with the user's name as the payload, with a 1 day expiration
  const accessToken = await reply.jwtSign(
    { first_name, last_name, role },
    {
      sign: {
        sub,
      },
    }
  );

  // Generate a new refresh token with the user's name as the payload, with a 30 day expiration
  const newRefreshToken = await reply.jwtSign(
    { first_name, last_name, role },
    {
      sign: {
        sub,
        expiresIn: "7d",
      },
    }
  );

  // Set a new cookie with the new refresh token
  return reply
    .setCookie("refreshToken", newRefreshToken, {
      path: "/",
      httpOnly: true, // The cookie is not accessible via JavaScript
      sameSite: true, // The cookie can only be accessed from the same domain
      secure: true, // The cookie can only be sent over HTTPS
    })
    .status(200)
    .send({ accessToken }); // Return the new access token as part of the response body
}
