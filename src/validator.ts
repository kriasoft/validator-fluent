/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import isLength, { IsLengthOptions } from "validator/lib/isLength";
import isEmail, { IsEmailOptions } from "validator/lib/isEmail";
import isURL, { IsURLOptions } from "validator/lib/isURL";
import isMobilePhone, {
  IsMobilePhoneOptions,
  MobilePhoneLocale,
} from "validator/lib/isMobilePhone";

type NotEmptyOptions = {
  if: boolean;
};

export class Validator<K, V> {
  readonly key;
  readonly value;
  readonly isEmpty;
  readonly errors: string[] = [];

  /**
   * Creates a new instance of the `Validator<T>`.
   *
   * @param value Input value.
   */
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.isEmpty =
      this.value == null ||
      this.value === undefined ||
      (typeof this.value === "string" && this.value === "");
  }

  /**
   * Checks if the value is not `null`, empty, or `undefined`.
   *
   * @param message Validation error message.
   */
  notEmpty(message?: string): this;

  /**
   * Checks if the value is not `null`, empty, or `undefined`.
   *
   * @param options Validation options.
   * @param message Validation error message.
   */
  notEmpty(options: NotEmptyOptions, message?: string): this;

  notEmpty(options?: NotEmptyOptions | string, message?: string): this {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (options?.if !== false && this.isEmpty) {
      this.errors.push(message || "Cannot be empty.");
    }

    return this;
  }

  /**
   * Checks if the value falls within the given range.
   *
   * @param options Validation options.
   * @param message Validation error message.
   */
  isLength(options: IsLengthOptions, message?: string): this {
    if (!message) {
      if (options?.min && options?.max) {
        message = `Must be between ${options.min} and ${options.max} characters long.`;
      } else if (options?.max) {
        message = `Must be no longer than ${options.max} characters.`;
      } else if (options?.min) {
        message = `Must be at least ${options.min} characters long.`;
      } else {
        message = defaultError;
      }
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);
      if (!isLength(this.value, options)) {
        this.errors.push(message);
      }
    }

    return this;
  }

  /**
   * Checks if the value is a valid email address.
   *
   * @param message Validation error message.
   */
  isEmail(message?: string): this;

  /**
   * Checks if the value is a valid email address.
   *
   * @param options Email validation options.
   * @param message Validation error message.
   */
  isEmail(options: IsEmailOptions, message?: string): this;

  isEmail(options?: IsEmailOptions | string, message?: string): this {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);
      if (!isEmail(this.value, options)) {
        this.errors.push(message || "Email address is invalid.");
      }
    }

    return this;
  }

  /**
   * Checks if the value is a valid URL address.
   *
   * @param message Validation error message.
   */
  isURL(message?: string): this;

  /**
   * Checks if the value is a valid URL address.
   *
   * @param options URL validation options.
   * @param message Validation error message.
   */
  isURL(options: IsURLOptions, message?: string): this;

  isURL(options?: IsURLOptions | string, message?: string): this {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);
      if (!isURL(this.value, options)) {
        this.errors.push(message || "URL is invalid.");
      }
    }

    return this;
  }

  /**
   * Checks if the value is a valid mobile phone.
   *
   * @param locale Mobile phone locale(s).
   * @param message Validation error message.
   */
  isMobilePhone(
    locale: MobilePhoneLocale[] | MobilePhoneLocale | "any",
    message?: string
  ): this;

  /**
   * Checks if the value is a valid mobile phone.
   *
   * @param locale Mobile phone locale(s).
   * @param options Mobile phone validation options.
   * @param message Validation error message.
   */
  isMobilePhone(
    locale: MobilePhoneLocale[] | MobilePhoneLocale | "any",
    options: IsMobilePhoneOptions,
    message?: string
  ): this;

  isMobilePhone(
    locale: MobilePhoneLocale[] | MobilePhoneLocale | "any" = "any",
    options?: IsMobilePhoneOptions | string,
    message?: string
  ): this {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);
      if (!isMobilePhone(this.value, locale, options)) {
        this.errors.push(message || "Phone number is invalid.");
      }
    }

    return this;
  }

  /**
   * Checks if the value is valid using a custom validation function.
   *
   * @param check Validation function.
   * @param message Validation error message.
   */
  is(
    check: (value: NonNullable<V>, key: K) => boolean,
    message = defaultError
  ): this {
    if (!this.isEmpty && !check(this.value as NonNullable<V>, this.key)) {
      this.errors.push(message);
    }

    return this;
  }

  toNumber(): Validator<K, number> {
    return new Validator(this.key, Number(this.value));
  }
}

const defaultError = "Invalid value.";
const notStringError = "Must be a string.";
