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
export declare function validate<In extends Input, Out extends Input>(input: In, mapFn: MapFn<In, Out, Validator<keyof In, In[keyof In]>>): [Out, ValidationErrors<In> | null];
/**
 * Validates user input.
 *
 * @param input User input (object).
 * @param validator Custom validator class.
 * @param mapFn Matches individual input fields to validators.
 */
export declare function validate<In extends Input, Out extends Input, Val extends Validator<keyof In, In[keyof In]>>(input: In, validator: ValidatorRef<In, Val>, mapFn: MapFn<In, Out, Val>): [Out, ValidationErrors<In> | null];
export { Validator };
