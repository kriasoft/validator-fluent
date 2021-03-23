/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import type { Input, ValidationErrors, MapFn, ValidatorRef } from "./types";
import { Validator } from "./validator";
export { ValidationError } from "./error";

/**
 * Validates user input.
 *
 * @param input User input (object).
 * @param mapFn Matches individual input fields to validators.
 */
export function validate<In extends Input, Out extends Input>(
  input: In,
  mapFn: MapFn<In, Out, Validator<keyof In, In[keyof In]>>
): [Out, ValidationErrors<In> | null];

/**
 * Validates user input.
 *
 * @param input User input (object).
 * @param validator Custom validator class.
 * @param mapFn Matches individual input fields to validators.
 */
export function validate<
  In extends Input,
  Out extends Input,
  Val extends Validator<keyof In, In[keyof In]>
>(
  input: In,
  validator: ValidatorRef<In, Val>,
  mapFn: MapFn<In, Out, Val>
): [Out, ValidationErrors<In> | null];

export function validate<
  In extends Input,
  Out extends Input,
  Val extends Validator<keyof In, In[keyof In]>
>(
  input: In,
  validator: ValidatorRef<In, Val> | MapFn<In, Out, Val>,
  mapFn?: MapFn<In, Out, Val>
): [Out, ValidationErrors<In> | null] {
  // Fallback to using the default validator class if omitted
  if (!(validator.prototype instanceof Validator)) {
    mapFn = (validator as unknown) as MapFn<In, Out, Val>;
    validator = (Validator as unknown) as ValidatorRef<In, Val>;
  }

  if (!mapFn) throw new TypeError();

  // Maps input fields to field validators
  const values = mapFn(
    (key) => new (validator as ValidatorRef<In, Val>)(key, input[key])
  );

  const output = {} as Out;
  const errors: ValidationErrors<In> = {};

  // Maps input values and error messages to the output
  Object.keys(values).forEach((key) => {
    const input = values[key];

    if (input.value !== undefined) {
      output[key as keyof Out] = (input.value as unknown) as Out[keyof Out];
    }

    if (input.errors.length > 0) {
      errors[input.key as keyof In] = input.errors;
    }
  });

  return [output, errors];
}

export { Validator };
