import { UsersRepository } from "@/repositories/users-repository";
import { sendMail } from "@/http/controllers/sendMailMethod";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

// Defining the interface for the request object
interface GenerateKeyForgotPwUseCaseRequest {
  email: string;
}

// Defining the GenerateKeyForgotPwUseCase class
export class GenerateKeyForgotPwUseCase {
  constructor(private usersRepository: UsersRepository) {}

  // Defining the execute method
  async execute({ email }: GenerateKeyForgotPwUseCaseRequest) {
    try {
      // Check if the key_date is within the last 10 minutes

      const users = await this.usersRepository.findByEmail(email);

      if (!users) {
        throw new ResourceNotFoundError();
      }

      const keyDate = users.key_date;

      if (keyDate) {
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - keyDate.getTime();
        const timeDifferenceInMinutes = timeDifference / (1000 * 60);

        if (timeDifferenceInMinutes <= 10) {
          // Reset key was generated within the last 10 minutes, stop the code and alert the user
          throw new Error(
            "Reset key was generated within the last 10 minutes. Please wait before requesting a new reset key."
          );
        }
      }

      // Generate a reset key and key date
      const resetKey = this.generateResetKey();
      const newKeyDate = new Date();

      // Save the reset key and key date for the user
      await this.usersRepository.generateResetPwKey(
        users.id,
        resetKey,
        newKeyDate
      );

      // Send the reset key to the user via email
      await sendMail({
        to: email,
        subject: "Password Reset",
        text: `Your password reset key is: ${resetKey}`,
      });

      // Return success message
      return {
        message: "Reset key sent to user's email",
      };
    } catch (error: any) {
      // If an error occurs during execution, return an error message
      throw new Error(error.message);
    }
  }

  // Helper function to generate a random reset key
  private generateResetKey(): string {
    // Generate a random 6-digit numeric key
    const resetKey = Math.floor(100000 + Math.random() * 900000).toString();

    return resetKey;
  }
}
