import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { RepairsRepository } from "../repairs-repository";

// PrismaRepairsRepository implements the RepairsRepository interface
export class PrismaRepairsRepository implements RepairsRepository {
  // delete deletes a repair by its ID
  async delete(id: string) {
    await prisma.repair.delete({
      where: {
        id,
      },
    });
  }

  // findMany retrieves multiple repairs based on pagination
  async findMany(page: number) {
    const repairs = await prisma.repair.findMany({
      skip: (page - 1) * 20,
      take: 20,
    });
    return repairs;
  }

  // findById retrieves a repair by its ID
  async findById(id: string) {
    const repair = await prisma.repair.findUnique({
      where: {
        id,
      },
    });
    return repair;
  }

  // create creates a new repair
  async create(data: Prisma.RepairCreateInput) {
    const repair = await prisma.repair.create({
      data,
    });
    return repair;
  }
}
