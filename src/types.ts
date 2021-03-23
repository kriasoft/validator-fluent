/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import type { Validator } from "./validator";

export type Input = { [key: string]: any };

export type ValidationErrors<T extends Input> = {
  [key in keyof T]?: string[];
};

export type MapFn<In, Out, Val extends Validator<keyof In, In[keyof In]>> = (
  value: (key: keyof In) => Val
) => {
  [key in keyof Out]: Val;
};

export type NotEmptyOptions = {
  if: boolean;
};

export type ValidatorRef<In, V> = new (key: keyof In, value: In[keyof In]) => V;
