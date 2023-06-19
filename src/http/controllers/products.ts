import { StripeProductsRepository } from "@/repositories/stripe/stripe-products-repository";
import { GetProductUseCase } from "@/use-cases/get-product";
import { GetProductsUseCase } from "@/use-cases/get-products";
import { SearchProductsUseCase } from "@/use-cases/search-products";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// Get list of products
export async function list(request: FastifyRequest, reply: FastifyReply) {
  // Create a new instance of the StripeProductsRepository
  const productsRepository = new StripeProductsRepository();
  // Create a new instance of the GetProductsUseCase, passing in the products repository
  const getProducts = new GetProductsUseCase(productsRepository);
  // Call the GetProductsUseCase to get the products data
  const { products } = await getProducts.execute();

  // Send the formatted products data to the front-end
  return reply.status(200).send({ products });
}

// Get details of a specific product
export async function get(request: FastifyRequest, reply: FastifyReply) {
  // Define the expected shape of the request parameters using the zod library
  const productParamsSchema = z.object({
    id: z.string(),
  });
  // Parse the ID parameter from the request
  const { id } = productParamsSchema.parse(request.params); // Parse the ID parameter from the request

  // Create a new instance of the StripeProductsRepository
  const productsRepository = new StripeProductsRepository();
  // Create a new instance of the GetProductUseCase, passing in the products repository
  const getProduct = new GetProductUseCase(productsRepository);
  // Call the GetProductUseCase to get the product data
  const { product } = await getProduct.execute({ productId: id });
  // Send the formatted product data to the front-end
  return reply.status(200).send({ product });
}

export async function search(request: FastifyRequest, reply: FastifyReply) {
  // Define the expected shape of the request parameters using the zod library
  const productParamsSchema = z.object({
    unitLabel: z.string(),
  });
  // Parse the label parameter from the request
  const { unitLabel } = productParamsSchema.parse(request.params); // Parse the ID parameter from the request
  // Create a new instance of the StripeProductsRepository
  const productsRepository = new StripeProductsRepository();
  // Create a new instance of the GetProductUseCase, passing in the products repository
  const searchProducts = new SearchProductsUseCase(productsRepository);
  // Call the GetProductUseCase to get the product data
  const { products } = await searchProducts.execute({ unitLabel });

  // Send the formatted products data to the front-end
  return reply.status(200).send({ products });
}
