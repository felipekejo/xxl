import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

// Creating a new instance of the Prisma client with a log configuration
export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [], // Only logs the queries when in development environment
});
