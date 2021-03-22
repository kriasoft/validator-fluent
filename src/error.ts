/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

export class ValidationError extends Error {
  readonly code = 422;
  readonly errors: { [key: string]: string[] };

  constructor(
    errors: { [key: string]: string[] },
    message = "Validation failed."
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.errors = errors;
  }
}
