/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */
import { IsLengthOptions } from "validator/lib/isLength";
import { IsEmailOptions } from "validator/lib/isEmail";
import { IsURLOptions } from "validator/lib/isURL";
import { IsMobilePhoneOptions, MobilePhoneLocale } from "validator/lib/isMobilePhone";
import { NotEmptyOptions } from "./types";
export declare class Validator<T> {
    private readonly value;
    private readonly isEmpty;
    private readonly addError;
    /**
     * Creates a new instance of the `Validator<T>`.
     *
     * @param value Input value.
     * @param addError Validation error callback.
     */
    constructor(value: T, addError: (message: string) => void);
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
    /**
     * Checks if the value falls within the given range.
     *
     * @param options Validation options.
     * @param message Validation error message.
     */
    isLength(options: IsLengthOptions, message?: string): Validator<T>;
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
    /**
     * Checks if the value is a valid mobile phone.
     *
     * @param locale Mobile phone locale(s).
     * @param message Validation error message.
     */
    isMobilePhone(locale: MobilePhoneLocale[] | MobilePhoneLocale | "any", message?: string): Validator<T>;
    /**
     * Checks if the value is a valid mobile phone.
     *
     * @param locale Mobile phone locale(s).
     * @param options Mobile phone validation options.
     * @param message Validation error message.
     */
    isMobilePhone(locale: MobilePhoneLocale[] | MobilePhoneLocale | "any", options: IsMobilePhoneOptions, message?: string): Validator<T>;
    valueOf(): T;
}
