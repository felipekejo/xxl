import { prisma } from "@/lib/prisma";
import { Prisma, Role } from "@prisma/client";
import { UsersRepository } from "../users-repository";

// PrismaUsersRepository implements the UsersRepository interface
export class PrismaUsersRepository implements UsersRepository {
  // delete deletes a user by their ID
  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  // findMany retrieves multiple users with pagination
  async findMany(page: number) {
    const users = await prisma.user.findMany({
      skip: (page - 1) * 20,
      take: 20,
    });

    return users;
  }

  // findById retrieves a user by their ID
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  // findByEmail retrieves a user by their email
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  // create creates a new user
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  // updatePassword updates the password of a user
  async updatePassword(id: string, newPassword: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password_hash: newPassword,
      },
    });
  }

  async grantAdminRights(id: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: Role.ADMIN,
      },
    });
  }

  async removeAdminRights(id: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: Role.CUSTOMER,
      },
    });
  }

  // resetPassword updates the password and clears the reset key for a user
  async resetPassword(email: string, newPassword: string) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password_hash: newPassword,
        reset_key: null,
        key_date: null,
      },
    });
  }

  // generateResetPwKey generates and saves a reset key for the user
  async generateResetPwKey(id: string, resetKey: string, keyDate: Date) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        reset_key: resetKey,
        key_date: keyDate,
      },
    });
  }
}
