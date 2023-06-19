import { Prisma, Repair } from "@prisma/client";

// RepairsRepository interface defines the contract for interacting with the repair data
export interface RepairsRepository {
  // findById retrieves a repair by its ID
  findById(id: string): Promise<Repair | null>;

  // create creates a new repair with the provided data
  create(data: Prisma.RepairCreateInput): Promise<Repair>;

  // delete deletes a repair by its ID
  delete(id: string): Promise<void>;
}
