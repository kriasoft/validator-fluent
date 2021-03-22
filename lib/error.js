"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = void 0;

/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */
class ValidationError extends Error {
  code = 422;

  constructor(errors, message = "Validation failed.") {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.errors = errors;
  }

}

exports.ValidationError = ValidationError;