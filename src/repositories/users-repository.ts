import { Prisma, User } from "@prisma/client";

// UsersRepository interface defines the contract for interacting with the user data
export interface UsersRepository {
  // findById retrieves a user by their ID
  findById(id: string): Promise<User | null>;

  // findByEmail retrieves a user by their email
  findByEmail(email: string): Promise<User | null>;

  // create creates a new user
  create(data: Prisma.UserCreateInput): Promise<User>;

  // findMany retrieves multiple users based on pagination
  findMany(page: number): Promise<User[]>;

  // delete deletes a user by their ID
  delete(id: string): Promise<void>;

  // updatePassword updates the password of a user
  updatePassword(id: string, newPassword: string): Promise<void>;

  // generateResetPwKey generates and saves a reset key for the user
  generateResetPwKey(
    id: string,
    resetKey: string,
    resetKeyDateCreated: Date
  ): Promise<void>;

  // resetPassword updates the password and clears the reset key for a user
  resetPassword(email: string, newPassword: string): Promise<void>;

  grantAdminRights(id: string): Promise<void>;
  removeAdminRights(id: string): Promise<void>;
}
