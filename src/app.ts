import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

// Initializing the Fastify application
export const app = fastify();

// Registering the CORS plugin to handle cross-origin requests
app.register(cors, {
  origin: true,
  credentials: true,
});

// Registering the JWT plugin to handle tokens
app.register(fastifyJwt, {
  secret: "secret2", // TODO: move to .env and import the value
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

// Registering the plugin to handle cookies in the backend
app.register(fastifyCookie);

// Registering the fastify-mailer plugin with the transporter options
app.register(require("fastify-mailer"), {
  defaults: { from: "PhoneGarage <testxxlpresentation@hotmail.com>" },
  transport: {
    host: "outlook.office365.com",
    port: 587,
    secure: false, // I can't make it work with this on. Still, it's valid and passes the verifications.
    auth: {
      user: "testxxlpresentation@hotmail.com", // TODO: move to .env
      pass: "XxlPresentation1!", // TODO: move to .env
    },
  },
});

// Registering the routes of the application
app.register(appRoutes);

// Setting up the error handler
app.setErrorHandler((error, _, reply) => {
  if (error.code === "FST_JWT_NO_AUTHORIZATION_IN_COOKIE") {
    return reply.status(401).send({
      message: "Invalid JWT token.",
      code: error.code,
    });
  }

  // Handling validation errors thrown by Zod
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  // Logging the error in the console in development mode
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // Here we should log to an external tool like Datadog/NewRelic/Sentry, just in production
  }

  // Returning a 500 error for internal server errors
  return reply.status(500).send({ message: "Internal server error" });
});
