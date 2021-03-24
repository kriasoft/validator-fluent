"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
Object.defineProperty(exports, "Validator", {
  enumerable: true,
  get: function () {
    return _validator.Validator;
  }
});
exports.ValidationError = void 0;

var _validator = require("./validator");

/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

/**
 * Validates user input.
 *
 * @param input User input (object).
 * @param mapFn Matches individual input fields to validators.
 */
function validate(input, mapFn) {
  // Maps input fields to field validators
  const values = mapFn(key => new _validator.Validator(key, input[key]));
  const output = {};
  const errors = {}; // Maps input values and error messages to the output

  Object.keys(values).forEach(key => {
    const input = values[key];

    if (input.value !== undefined) {
      output[key] = input.value;
    }

    if (input.errors.length > 0) {
      errors[input.key] = input.errors;
    }
  });
  return [output, errors];
}

class ValidationError extends Error {
  constructor(errors, message = "Validation failed.") {
    super(message);
    this.code = 422;
    this.errors = void 0;
    Object.setPrototypeOf(this, new.target.prototype);
    this.errors = errors;
  }

}

exports.ValidationError = ValidationError;