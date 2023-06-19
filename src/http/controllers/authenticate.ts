import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// Define the authenticate function which handles the login process
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Defining the schema for the request body
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  // Parsing the request body to extract the email and password
  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    // Creating an instance of the PrismaUsersRepository and AuthenticateUseCase classes
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    // Attempting to login and storing the ID of the user
    const { user } = await authenticateUseCase.execute({ email, password });

    // Creating access and refresh tokens using email and id as info. Adjust token expiration.
    const accessToken = await reply.jwtSign(
      {
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );
    const refreshToken = await reply.jwtSign(
      {
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    // Setting 2 cookies containing the tokens. MaxAge defines how long the cookie will exist for.
    // reply.setCookie("accessToken", accessToken, {
    //   maxAge: 600,
    //   path: "/",
    //   secure: true,
    //   sameSite: true,
    //   httpOnly: true,
    // });

    // Sending tokens info as response
    return (
      reply
        // Setting a cookie containing the refresh token
        .cookie("refreshToken", refreshToken, {
          path: "/",
          secure: true, // Ensures the cookie can only be sent over HTTPS
          sameSite: true, // Helps prevent CSRF attacks by only sending the cookie on same-site requests
          httpOnly: true, // Prevents client-side scripts from accessing the cookie
        })
        // Setting the HTTP status code to 200 (OK)
        .status(200)
        // Sending the access token as part of the response body
        .send({ accessToken })
    );
  } catch (error) {
    // Handling invalid credentials error
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    // Rethrow any other errors
    throw error;
  }
}
