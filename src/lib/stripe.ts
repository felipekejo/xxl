import { env } from "@/env";
import Stripe from "stripe";

// Creating a new instance of the Stripe library to handle payments
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "phone-garage",
  },
});
