export interface OrdersRepository {
  findAll(): Promise<any[]>;

  findAllByEmail(email: string): Promise<Order[]>;

  findById(id: string): Promise<Order | null>;
}
