import { Prisma, Phone } from "@prisma/client";

// PhonesRepository interface defines the contract for interacting with the phone data
export interface PhonesRepository {
  // findById retrieves a phone by its ID
  findById(id: string): Promise<Phone | null>;

  // findByName retrieves a phone by its name
  findByName(name: string): Promise<Phone | null>;

  // create creates a new phone with the provided data
  create(data: Prisma.PhoneCreateInput): Promise<Phone>;

  // findMany retrieves multiple phones based on the specified page
  findMany(page: number): Promise<Phone[]>;

  // delete deletes a phone by its ID
  delete(id: string): Promise<void>;
}
