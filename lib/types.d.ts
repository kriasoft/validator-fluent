/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */
import type { Validator } from "./validator";
export declare type Input = {
    [key: string]: any;
};
export declare type ValidationRules<In extends Input> = {
    [key in keyof In]: Validator<In[key]>;
};
export declare type ValidationErrors<T extends Input> = {
    [key in keyof T]?: string[];
};
export declare type ValueFn<In extends Input, Key extends keyof In> = (key: Key) => Validator<In[Key]>;
export declare type NotEmptyOptions = {
    if: boolean;
};
