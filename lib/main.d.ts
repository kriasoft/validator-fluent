/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */
import type { Input, ValidationRules, ValueFn, ValidationErrors } from "./types";
export { ValidationError } from "./error";
export declare function validate<In extends Input, Out extends Input>(input: In, mapFn: (value: ValueFn<In, keyof In>) => ValidationRules<Out>): [Out, ValidationErrors<In> | null];
