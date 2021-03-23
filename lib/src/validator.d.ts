/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */
import { IsLengthOptions } from "validator/lib/isLength";
import { IsEmailOptions } from "validator/lib/isEmail";
import { IsURLOptions } from "validator/lib/isURL";
import { IsMobilePhoneOptions, MobilePhoneLocale } from "validator/lib/isMobilePhone";
declare type NotEmptyOptions = {
    if: boolean;
};
export declare class Validator<K, V> {
    readonly key: K;
    readonly value: V;
    readonly isEmpty: boolean;
    readonly errors: string[];
    /**
     * Creates a new instance of the `Validator<T>`.
     *
     * @param value Input value.
     */
    constructor(key: K, value: V);
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
    /**
     * Checks if the value falls within the given range.
     *
     * @param options Validation options.
     * @param message Validation error message.
     */
    isLength(options: IsLengthOptions, message?: string): this;
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
    /**
     * Checks if the value is a valid mobile phone.
     *
     * @param locale Mobile phone locale(s).
     * @param message Validation error message.
     */
    isMobilePhone(locale: MobilePhoneLocale[] | MobilePhoneLocale | "any", message?: string): this;
    /**
     * Checks if the value is a valid mobile phone.
     *
     * @param locale Mobile phone locale(s).
     * @param options Mobile phone validation options.
     * @param message Validation error message.
     */
    isMobilePhone(locale: MobilePhoneLocale[] | MobilePhoneLocale | "any", options: IsMobilePhoneOptions, message?: string): this;
    /**
     * Checks if the value is valid using a custom validation function.
     *
     * @param check Validation function.
     * @param message Validation error message.
     */
    is(check: (value: NonNullable<V>, key: K) => boolean, message?: string): this;
    toNumber(): Validator<K, number>;
}
export {};
