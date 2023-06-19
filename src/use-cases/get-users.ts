import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

// Define the request interface for the use case
interface GetUsersUseCaseRequest {
  page: number;
}

// Define the response interface for the use case
interface GetUsersUseCaseResponse {
  users: User[];
}

// Define the use case class
export class GetUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  // Define the execute method for the use case
  async execute({
    page,
  }: GetUsersUseCaseRequest): Promise<GetUsersUseCaseResponse> {
    // Find the user by id using the injected repository
    const users = await this.usersRepository.findMany(page);

    // If the user is not found, throw a ResourceNotFoundError
    if (!users) {
      throw new ResourceNotFoundError();
    }

    // Return the user in a response object
    return {
      users,
    };
  }
}
