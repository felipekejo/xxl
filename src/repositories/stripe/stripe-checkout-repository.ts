import { stripe } from "@/lib/stripe";
import { CheckOutRepository } from "../check-out-repository";
import { env } from "@/env";
import { ProductCheckOut } from "@/@types/checkout";

export class StripeCheckOutRepository implements CheckOutRepository {
  async create(lineItems: ProductCheckOut[]) {
    const checkOutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${env.BASE_URL}/success`,
      cancel_url: `${env.BASE_URL}/cancel`,
    });

    const checkOutSessionUrl = checkOutSession.url;

    if (!checkOutSessionUrl) {
      return null;
    }

    return checkOutSessionUrl;
  }
}
