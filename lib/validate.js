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
Object.defineProperty(exports, "ValidationError", {
  enumerable: true,
  get: function () {
    return _error.ValidationError;
  }
});

var _validator = require("./validator");

var _error = require("./error");

/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */
function validate(input, validator, mapFn) {
  // Fallback to using the default validator class if omitted
  if (!(validator.prototype instanceof _validator.Validator)) {
    mapFn = validator;
    validator = _validator.Validator;
  }

  if (!mapFn) throw new TypeError(); // Maps input fields to field validators

  const values = mapFn(key => new validator(key, input[key]));
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