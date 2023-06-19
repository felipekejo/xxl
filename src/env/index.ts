import "dotenv/config";
import { z } from "zod";

// Defining a schema for the expected environment variables and their default values
const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"), // Specifies valid values and a default value for NODE_ENV
  PORT: z.coerce.number().default(3333), // Specifies a default value for PORT
  STRIPE_PUBLIC_KEY: z.string(), // Specifies that STRIPE_PUBLIC_KEY must be a string
  STRIPE_SECRET_KEY: z.string(), // Specifies that STRIPE_SECRET_KEY must be a string
  BASE_URL: z.string(), // Specifies a default value for BASE_URL
});

// Parsing the environment variables using the schema defined above
const _env = envSchema.safeParse(process.env);

// Checking if the parsing was successful
if (_env.success === false) {
  // Logging an error message if the parsing failed and formatting the error information
  console.error("❌ Invalid environment variables", _env.error.format());

  // Throwing an error to halt program execution
  throw new Error("Invalid environment variables");
}

// Exporting the parsed environment variables as the 'env' constant
export const env = _env.data;
