/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */
import { Validator } from "./validator";
export declare type Base = {
    [key: string]: any;
};
export declare type ValidationErrors<In> = {
    [key in keyof In]?: string[];
};
export declare type MapFn<In extends Base, Out extends Base> = (value: <K extends keyof In>(key: K) => Validator<K, In[K]>) => {
    [P in keyof Out]: Validator<keyof In, Out[P]>;
};
/**
 * Validates user input.
 *
 * @param input User input (object).
 * @param mapFn Matches individual input fields to validators.
 */
export declare function validate<In extends Base, Out extends Base>(input: In, mapFn: MapFn<In, Out>): [Out, ValidationErrors<In>];
export declare class ValidationError extends Error {
    readonly code = 422;
    readonly errors: {
        [key: string]: string[];
    };
    constructor(errors: {
        [key: string]: string[];
    }, message?: string);
}
export { Validator };
