import { stripe } from "@/lib/stripe";
import { OrdersRepository } from "../orders-repository";
import Stripe from "stripe";

export class StripeOrdersRepository implements OrdersRepository {
  async findAll() {
    // const response = await stripe.charges.search({
    //   query: 'status: "succeeded"',
    // });

    // const orders = response.data.map((order) => {
    //   return {
    //     id: order.id,
    //     amount: order.amount,
    //     email: order.billing_details.email,
    //     created: order.created,
    //     customer: order.customer,
    //     balance_transaction: order.balance_transaction,
    //   };
    // });

    const sessions = await stripe.checkout.sessions.list();
    // console.log(sessions.data);
    const orders = sessions.data.map(async (order) => {
      const itens = order.id as Stripe.Checkout.SessionListLineItemsParams;
      console.log(itens);
      return {
        id: order.id,
        amount: order.amount_total,
        email: order.customer_details?.email,
        created: order.created,
        customer: order.customer,
        // products: itens.data.map((item) => {
        //   return {
        //     id: item.id,
        //     name: item.description,
        //     price: item.amount_total,
        //     quantity: item.quantity,
        //   };
        // }),
      };
    });
    return orders;
  }

  async findAllByEmail(email: string) {
    return [];
  }

  async findById(id: string) {
    return null;
  }
}
