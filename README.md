# validator.js — fluent edition <sup> 🎉</sup>

[![NPM Version](https://img.shields.io/npm/v/validator-fluent?style=flat-square)](https://www.npmjs.com/package/validator-fluent)
[![NPM Downloads](https://img.shields.io/npm/dm/validator-fluent?style=flat-square)](https://www.npmjs.com/package/validator-fluent)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square)](http://www.typescriptlang.org/)
[![Donate](https://img.shields.io/badge/dynamic/json?color=%23ff424d&label=Patreon&style=flat-square&query=data.attributes.patron_count&suffix=%20patrons&url=https%3A%2F%2Fwww.patreon.com%2Fapi%2Fcampaigns%2F233228)](http://patreon.com/koistya)
[![Discord](https://img.shields.io/discord/643523529131950086?label=Chat&style=flat-square)](https://discord.gg/gx5pdvZ7Za)

Validation library based on [validator.js](https://github.com/validatorjs/validator.js) (✭17k)
that provides a strongly typed (TypeScript) fluent API for user input validation and sanitization.

## Getting Started

```bash
$ npm install validator validator-fluent
```

```js
import { validate, ValidationError } from "validator-fluent";
```

```js
const input = {
  givenName: "John",
  familyName: "Doe",
  email: "john@example.com",
  phone: "(555) 555-55-55",
  age: "18",
};

// Do not validate empty fields (validation only)
const dryRun = true;

const [data, errors] = validate(input, (value) => ({
  given_name: value("givenName")
    .notEmpty({ if: !dryRun })
    .isLength({ min: 3, max: 25 }),

  family_name: value("familyName")
    .notEmpty({ if: !dryRun })
    .isLength({ min: 1, max: 25 }),

  email: value("email").notEmpty().isEmail(),

  phone: value("phone").isMobilePhone({ locale: "en-US" }),

  age: value("age").toNumber(),
}));

if (Object.keys(errors).length > 0)) {
  throw new ValidationError(errors);
}

if (!dryRun) {
  await db.table("customer").insert(data);
}
```

For the full list of available validation rules please refer to:

https://github.com/validatorjs/validator.js#validators

## Advanced Usage

You can extend the built-in validator class with any additional validation rules (methods).

```ts
import { validate, Validator, ValidationError } from "validator-fluent";

class CoolValidator<K, V> extends Validator<K, V> {
  constructor(key: K, value: V) {
    super(key, value);
  }

  isLegit(): this {
    if (!this.isEmpty && this.value !== "legit") {
      this.errors.push("Not legit.");
    }

    return this;
  }
}

const input = { name: "???" };

const [data, errors] = validate(input, CoolValidator, (value) => ({
  name: value("name").notEmpty().isLegit(),
}));

if (Object.key(errors).length > 0) {
  throw new ValidationError(errors);
}
```

## Related Projects

- [GraphQL API Starter Kit](https://github.com/kriasoft/graphql-starter) — project template, pre-configured with TypeScript, GraphQL.js, React, and Relay.

## How to Contribute

Please create a [PR](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) or send me a message on [Discord](https://discord.gg/gx5pdvZ7Za).

## License

Copyright © 2021-present Kriasoft. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/kriasoft/validator-fluent/blob/main/LICENSE) file.

---

<sup>Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@koistya))
and [contributors](https://github.com/kriasoft/graphql-starter/graphs/contributors).</sup>
