import { UsersRepository } from "@/repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface GrantAdminRightsUseCaseRequest {
  id: string;
}

export class GrantAdminRightsUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GrantAdminRightsUseCaseRequest) {
    // Find the user by ID using the users repository
    const user = await this.usersRepository.findById(id);

    // If the user is not found, throw a UserNotFoundError
    if (!user) {
      throw new UserNotFoundError();
    }

    // Grant admin rights to the user using the users repository
    await this.usersRepository.grantAdminRights(user.id);
  }
}
