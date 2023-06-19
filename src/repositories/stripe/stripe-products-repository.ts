import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { ProductsRepository } from "../products-repository";

export class StripeProductsRepository implements ProductsRepository {
  async findByLabel(unitLabel: string) {
    // Retrieve the product with the given ID from the Stripe API
    const products = await stripe.products.search({
      query: `active:'true' AND unit_label:'${unitLabel}'`,
    });

    if (!products) {
      return null;
    }
    // Map the response data to format the data as needed for the front-end
    const productsInfo = products.data.map((product) => {
      const price = product.default_price as Stripe.Price;

      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images,
        unitLabel: product.unit_label,
        priceId: price.id,
        price: new Intl.NumberFormat("en-AU", {
          style: "currency",
          currency: "AUD",
        }).format(price.unit_amount === null ? 0 : price.unit_amount / 100), // Format the price as a currency string
      };
    });

    return productsInfo;
  }

  async findById(id: string) {
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"], // Include the default price for the product in the response
    });

    if (!product) {
      return null;
    }

    const price = product.default_price as Stripe.Price;

    // Format the product data as needed for the front-end
    const productInfo = {
      id: product.id,
      name: product.name,
      imageUrl: product.images,
      unitLabel: product.unit_label,
      priceId: price.id,
      price: new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(price.unit_amount === null ? 0 : price.unit_amount / 100), // Format the price as a currency string
      description: product.description,
    };

    return productInfo;
  }

  async findAll() {
    const response = await stripe.products.list({
      expand: ["data.default_price"], // Include the default price for each product in the response
    });

    // Map the response data to format the data as needed for the front-end
    const products = response.data.map((product) => {
      const price = product.default_price as Stripe.Price;

      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images,
        unitLabel: product.unit_label,
        priceId: price.id,
        price: new Intl.NumberFormat("en-AU", {
          style: "currency",
          currency: "AUD",
        }).format(price.unit_amount === null ? 0 : price.unit_amount / 100), // Format the price as a currency string
      };
    });

    return products;
  }
}
