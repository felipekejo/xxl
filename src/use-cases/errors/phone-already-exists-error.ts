// Custom error class for when a user with the same phone name already exists in the database.
// Extends the base Error class, and sets the error message to be displayed.
export class PhoneAlreadyExistsError extends Error {
  constructor() {
    super("Phone already exist.");
  }
}
