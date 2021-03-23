/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import { validate } from "../src/validate";

type Input = {
  givenName?: string | null;
  age?: number | null;
};

it("validate(input) without any rules #1", () => {
  const input: Input = { givenName: "john", age: 18 };

  const result = validate(input, (value) => ({
    given_name: value("givenName"),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "given_name": "john",
      },
      Object {},
    ]
  `);
});

it("validate(input) without any rules #2", () => {
  const input = { givenName: "john", age: 18 };

  const result = validate(input, (value) => ({
    given_name: value("givenName"),
    age: value("age"),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "age": 18,
        "given_name": "john",
      },
      Object {},
    ]
  `);
});
