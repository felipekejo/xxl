import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

// Defining the interface for the request object
interface RegisterUseCaseRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Defining the RegisterUseCase class
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  // Defining the execute method
  async execute({
    firstName,
    lastName,
    email,
    password,
  }: RegisterUseCaseRequest) {
    // Hashing the password
    const password_hash = await hash(password, 6);

    // Checking if a user with the same email already exists
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    // If a user with the same email exists, throw a UserAlreadyExistsError
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    // If the email is unique, create a new user in the database
    await this.usersRepository.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password_hash,
    });
  }
}
