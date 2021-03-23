/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import { Validator } from "./validator";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Base = { [key: string]: any };

export type ValidationErrors<In> = {
  [key in keyof In]?: string[];
};

export type MapFn<In extends Base, Out extends Base> = (
  value: <K extends keyof In>(key: K) => Validator<K, In[K]>
) => {
  [P in keyof Out]: Validator<keyof In, Out[P]>;
};

/**
 * Validates user input.
 *
 * @param input User input (object).
 * @param mapFn Matches individual input fields to validators.
 */
export function validate<In extends Base, Out extends Base>(
  input: In,
  mapFn: MapFn<In, Out>
): [Out, ValidationErrors<In>] {
  // Maps input fields to field validators
  const values = mapFn((key) => new Validator(key, input[key]));

  const output = {} as Out;
  const errors: ValidationErrors<In> = {};

  // Maps input values and error messages to the output
  Object.keys(values).forEach((key) => {
    const input = values[key];

    if (input.value !== undefined) {
      output[key as keyof Out] = input.value as Out[keyof Out];
    }

    if (input.errors.length > 0) {
      errors[input.key as keyof In] = input.errors;
    }
  });

  return [output, errors];
}

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

export { Validator };
