import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PhonesRepository } from "../phones-repository";

// PrismaPhonesRepository implements the PhonesRepository interface
export class PrismaPhonesRepository implements PhonesRepository {
  // delete deletes a phone by its ID
  async delete(id: string) {
    await prisma.phone.delete({
      where: {
        id,
      },
    });
  }

  // findMany retrieves multiple phones based on pagination
  async findMany(page: number) {
    const phones = await prisma.phone.findMany({
      skip: (page - 1) * 20,
      take: 20,
    });
    return phones;
  }

  // findById retrieves a phone by its ID
  async findById(id: string) {
    const phone = await prisma.phone.findUnique({
      where: {
        id,
      },
    });
    return phone;
  }

  // findByName retrieves a phone by its name
  async findByName(name: string) {
    const phone = await prisma.phone.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });
    return phone;
  }

  // create creates a new phone
  async create(data: Prisma.PhoneCreateInput) {
    const phone = await prisma.phone.create({
      data,
    });
    return phone;
  }
}
