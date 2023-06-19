import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

// Request object to authenticate user
interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

// Response object from the authenticate use case
interface AuthenticateUseCaseResponse {
  user: User;
}

// Class definition for Authenticate Use Case
export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // Retrieving user with the specified email
    const user = await this.usersRepository.findByEmail(email);

    // Throwing InvalidCredentialsError if no user is found with specified email
    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Comparing the provided password with the stored hash in the database
    const doesPasswordMatches = await compare(password, user.password_hash);

    // Throwing InvalidCredentialsError if password does not match
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    // Returning user object if authentication was successful
    return {
      user,
    };
  }
}
