"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validator = void 0;

var _isLength = _interopRequireDefault(require("validator/lib/isLength"));

var _isEmail = _interopRequireDefault(require("validator/lib/isEmail"));

var _isURL = _interopRequireDefault(require("validator/lib/isURL"));

var _isMobilePhone = _interopRequireDefault(require("validator/lib/isMobilePhone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */
class Validator {
  errors = [];
  /**
   * Creates a new instance of the `Validator<T>`.
   *
   * @param value Input value.
   */

  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.isEmpty = this.value == null || this.value === undefined || typeof this.value === "string" && this.value === "";
  }
  /**
   * Checks if the value is not `null`, empty, or `undefined`.
   *
   * @param message Validation error message.
   */


  notEmpty(options, message) {
    var _options;

    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (((_options = options) === null || _options === void 0 ? void 0 : _options.if) !== false && this.isEmpty) {
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


  isLength(options, message) {
    if (!message) {
      if (options !== null && options !== void 0 && options.min && options !== null && options !== void 0 && options.max) {
        message = `Must be between ${options.min} and ${options.max} characters long.`;
      } else if (options !== null && options !== void 0 && options.max) {
        message = `Must be no longer than ${options.max} characters.`;
      } else if (options !== null && options !== void 0 && options.min) {
        message = `Must be at least ${options.min} characters long.`;
      } else {
        message = defaultError;
      }
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);

      if (!(0, _isLength.default)(this.value, options)) {
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


  isEmail(options, message) {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);

      if (!(0, _isEmail.default)(this.value, options)) {
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


  isURL(options, message) {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);

      if (!(0, _isURL.default)(this.value, options)) {
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


  isMobilePhone(locale = "any", options, message) {
    if (typeof options === "string") {
      message = options;
      options = undefined;
    }

    if (!this.isEmpty) {
      if (typeof this.value !== "string") throw new Error(notStringError);

      if (!(0, _isMobilePhone.default)(this.value, locale, options)) {
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


  is(check, message = defaultError) {
    if (!this.isEmpty && !check(this.value, this.key)) {
      this.errors.push(message);
    }

    return this;
  }

  toNumber() {
    return new Validator(this.key, Number(this.value));
  }

}

exports.Validator = Validator;
const defaultError = "Invalid value.";
const notStringError = "Must be a string.";