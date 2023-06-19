import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

// Define the request interface for the use case
interface GetUserProfileUseCaseRequest {
  userId: string;
}

// Define the response interface for the use case
interface GetUserProfileUseCaseResponse {
  user: User;
}

// Define the use case class
export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  // Define the execute method for the use case
  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    // Find the user by id using the injected repository
    const user = await this.usersRepository.findById(userId);

    // If the user is not found, throw a ResourceNotFoundError
    if (!user) {
      throw new ResourceNotFoundError();
    }

    // Return the user in a response object
    return {
      user,
    };
  }
}
