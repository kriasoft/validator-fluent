"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
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
function validate(input, mapFn) {
  const errors = {};

  function addError(key, message) {
    if (Array.isArray(errors[key])) {
      // @ts-ignore
      errors[key].push(message);
    } else {
      errors[key] = [message];
    }
  } // Maps input fields to field validators


  const output = mapFn(key => new _validator.Validator(input[key], addError.bind(undefined, key)));
  return [Object.keys(output).reduce((acc, key) => output[key].valueOf() === undefined ? acc : { ...acc,
    [key]: output[key].valueOf()
  }, {}), Object.keys(errors).length > 0 ? errors : null];
}