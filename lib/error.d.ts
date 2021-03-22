/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */
export declare class ValidationError extends Error {
    readonly code = 422;
    readonly errors: {
        [key: string]: string[];
    };
    constructor(errors: {
        [key: string]: string[];
    }, message?: string);
}
