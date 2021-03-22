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
import { NotEmptyOptions } from "./types";

export class Validator<T> {
  private readonly value;
  private readonly isEmpty;
  private readonly addError;

  /**
   * Creates a new instance of the `Validator<T>`.
   *
   * @param value Input value.
   * @param addError Validation error callback.
   */
  constructor(value: T, addError: (message: string) => void) {
    this.value = value;
    this.addError = addError;

    this.isEmpty =
      value == null ||
      value === undefined ||
      (typeof value === "string" && value === "");
  }

  /**
   * Checks if the value is not `null`, empty, or `undefined`.
   *
   * @param message Validation error message.
   */
  notEmpty(message?: string): Validator<T>;

  /**
   * Checks if the value is not `null`, empty, or `undefined`.
   *
   * @param options Validation options.
   * @param message Validation error message.
   */
  notEmpty(options: NotEmptyOptions, message?: string): Validator<T>;

  notEmpty(options?: NotEmptyOptions | string, message?: string): Validator<T> {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (options?.if !== false && this.isEmpty) {
      this.addError(message || "Cannot be empty.");
    }

    return this;
  }

  /**
   * Checks if the value falls within the given range.
   *
   * @param options Validation options.
   * @param message Validation error message.
   */
  isLength(options: IsLengthOptions, message?: string): Validator<T> {
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
        this.addError(message);
      }
    }

    return this;
  }

  /**
   * Checks if the value is a valid email address.
   *
   * @param message Validation error message.
   */
  isEmail(message?: string): Validator<T>;

  /**
   * Checks if the value is a valid email address.
   *
   * @param options Email validation options.
   * @param message Validation error message.
   */
  isEmail(options: IsEmailOptions, message?: string): Validator<T>;

  isEmail(options?: IsEmailOptions | string, message?: string): Validator<T> {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);
      if (!isEmail(this.value, options)) {
        this.addError(message || "Email address is invalid.");
      }
    }

    return this;
  }

  /**
   * Checks if the value is a valid URL address.
   *
   * @param message Validation error message.
   */
  isURL(message?: string): Validator<T>;

  /**
   * Checks if the value is a valid URL address.
   *
   * @param options URL validation options.
   * @param message Validation error message.
   */
  isURL(options: IsURLOptions, message?: string): Validator<T>;

  isURL(options?: IsURLOptions | string, message?: string): Validator<T> {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);
      if (!isURL(this.value, options)) {
        this.addError(message || "URL is invalid.");
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
  ): Validator<T>;

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
  ): Validator<T>;

  isMobilePhone(
    locale: MobilePhoneLocale[] | MobilePhoneLocale | "any" = "any",
    options?: IsMobilePhoneOptions | string,
    message?: string
  ): Validator<T> {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);
      if (!isMobilePhone(this.value, locale, options)) {
        this.addError(message || "Phone number is invalid.");
      }
    }

    return this;
  }

  valueOf() {
    return this.value;
  }
}

const defaultError = "Invalid value.";
const notStringError = "Must be a string.";
