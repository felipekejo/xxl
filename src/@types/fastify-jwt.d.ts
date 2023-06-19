import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
      first_name: string;
      last_name: string;
      email: string;
      role: "ADMIN" | "CUSTOMER" | "OWNER";
      reset_key: string;
      key_date: Date;
    };
  }
}
