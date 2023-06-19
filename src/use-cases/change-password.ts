import { UsersRepository } from "@/repositories/users-repository";
import { compare, hash } from "bcryptjs";
import { UserNotFoundError } from "./errors/user-not-found-error";

// Defining the interface for the request object
interface ChangePasswordUseCaseRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
}

// Defining the ChangePasswordUseCase class
export class ChangePasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  // Defining the execute method
  async execute({
    email,
    currentPassword,
    newPassword,
  }: ChangePasswordUseCaseRequest) {
    // Finding the user by email
    const user = await this.usersRepository.findByEmail(email);

    // If the user does not exist, throw a UserNotFoundError
    if (!user) {
      throw new UserNotFoundError();
    }

    // Comparing the current password with the stored password
    const isCurrentPasswordValid = await compare(
      currentPassword,
      user.password_hash
    );

    // If the current password is not valid, throw an error
    if (!isCurrentPasswordValid) {
      throw new Error("Invalid current password");
    }

    // Hashing the new password
    const newPasswordHash = await hash(newPassword, 6);

    // Updating the user's password in the database
    await this.usersRepository.updatePassword(user.id, newPasswordHash);
  }
}
