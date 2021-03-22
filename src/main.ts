/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import type {
  Input,
  ValidationRules,
  ValueFn,
  ValidationErrors,
} from "./types";
import { Validator } from "./validator";
export { ValidationError } from "./error";

export function validate<In extends Input, Out extends Input>(
  input: In,
  mapFn: (value: ValueFn<In, keyof In>) => ValidationRules<Out>
): [Out, ValidationErrors<In> | null] {
  const errors: ValidationErrors<In> = {};

  function addError(key: keyof In, message: string) {
    if (Array.isArray(errors[key])) {
      // @ts-ignore
      errors[key].push(message);
    } else {
      errors[key] = [message];
    }
  }

  // Maps input fields to field validators
  const output = mapFn(
    (key) => new Validator(input[key], addError.bind(undefined, key))
  );

  return [
    Object.keys(output).reduce(
      (acc, key) =>
        output[key].valueOf() === undefined
          ? acc
          : {
              ...acc,
              [key]: output[key].valueOf(),
            },
      {} as Out
    ),
    Object.keys(errors).length > 0 ? errors : null,
  ];
}
