import { UsersRepository } from "@/repositories/users-repository";
import { UserNotFoundError } from "./errors/user-not-found-error";

interface RemoveAdminRightsUseCaseRequest {
  id: string;
}

export class RemoveAdminRightsUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: RemoveAdminRightsUseCaseRequest) {
    // Find the user by ID using the users repository
    const user = await this.usersRepository.findById(id);

    // If the user is not found, throw a UserNotFoundError
    if (!user) {
      throw new UserNotFoundError();
    }

    // Remove admin rights to the user using the users repository
    await this.usersRepository.removeAdminRights(user.id);
  }
}
