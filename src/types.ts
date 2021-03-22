/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import type { Validator } from "./validator";

export type Input = { [key: string]: any };

export type ValidationRules<In extends Input> = {
  [key in keyof In]: Validator<In[key]>;
};

export type ValidationErrors<T extends Input> = {
  [key in keyof T]?: string[];
};

export type ValueFn<In extends Input, Key extends keyof In> = (
  key: Key
) => Validator<In[Key]>;

export type NotEmptyOptions = {
  if: boolean;
};
