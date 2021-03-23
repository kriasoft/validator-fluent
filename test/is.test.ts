/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import { validate } from "../src/validate";

type Input = {
  name?: string | null;
};

it(".is(check) -> OK", () => {
  const input: Input = { name: "john" };

  const result = validate(input, (value) => ({
    name: value("name").is((value) => value.includes("oh")),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "name": "john",
      },
      Object {},
    ]
  `);
});

it(".is(check) -> Error", () => {
  const input: Input = { name: "wong" };

  const result = validate(input, (value) => ({
    name: value("name").is((value) => value.includes("oh")),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "name": "wong",
      },
      Object {
        "name": Array [
          "Invalid value.",
        ],
      },
    ]
  `);
});

it(".is(check, message)", () => {
  const input: Input = { name: "wong" };

  const result = validate(input, (value) => ({
    name: value("name").is((value) => value.includes("oh"), "Not valid."),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "name": "wong",
      },
      Object {
        "name": Array [
          "Not valid.",
        ],
      },
    ]
  `);
});
