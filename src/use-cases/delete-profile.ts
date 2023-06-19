import { UsersRepository } from "@/repositories/users-repository";
// Define the request interface for the use case
interface DeleteUserUseCaseRequest {
  userId: string;
}

// Define the use case class
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  // Define the execute method for the use case
  async execute({ userId }: DeleteUserUseCaseRequest): Promise<void> {
    // Find the user by id using the injected repository
    await this.usersRepository.delete(userId);
  }
}
