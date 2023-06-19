import { UsersRepository } from "@/repositories/users-repository";

import { hash } from "bcryptjs";

interface ResetPasswordUseCaseRequest {
  email: string;
  resetKey: string;
  newPassword: string;
}

export class ResetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, newPassword, resetKey }: ResetPasswordUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.reset_key !== resetKey) {
      throw new Error("Invalid reset key");
    }

    const newPasswordHash = await hash(newPassword, 6);

    await this.usersRepository.resetPassword(email, newPasswordHash);
  }
}
