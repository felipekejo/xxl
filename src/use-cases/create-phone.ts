import { PhonesRepository } from "@/repositories/phones-repository";
import { PhoneAlreadyExistsError } from "./errors/phone-already-exists-error";

// Define the request interface for the use case
interface CreatePhoneUseCaseRequest {
  phoneName: string;
}

// Define the use case class
export class CreatePhoneUseCase {
  constructor(private phonesRepository: PhonesRepository) {}
  // Define the execute method for the use case
  async execute({ phoneName }: CreatePhoneUseCaseRequest) {
    // Checking if phonename already exists in the database. If null, means it doesn't exist.
    const alreadyCreated = await this.phonesRepository.findByName(phoneName);
    if (alreadyCreated) {
      // Throw custom error
      throw new PhoneAlreadyExistsError();
    }

    // Create the phone using the injected repository with empty serviceNames and servicePrices arrays
    await this.phonesRepository.create({
      name: phoneName,
      services: {
        create: [],
      },
    });
  }
}
