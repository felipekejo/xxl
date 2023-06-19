// Custom error class for when a user with the same email already exists in the database.
// Extends the base Error class, and sets the error message to be displayed.
export class UserAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exist.");
  }
}
