import { OrdersRepository } from "../repositories/orders-repository";

export class GetAllOrders {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute() {
    const orders = await this.ordersRepository.findAll();

    return orders;
  }
}
