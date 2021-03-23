/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import { validate } from "../src/validate";

type Input = {
  email?: string | null;
};

it(".isEmail() (email@example)", () => {
  const input: Input = { email: "email@example" };

  const result = validate(input, (value) => ({
    email: value("email").isEmail(),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "email": "email@example",
      },
      Object {
        "email": Array [
          "Email address is invalid.",
        ],
      },
    ]
  `);
});

it(".isEmail() (email@example.com)", () => {
  const input: Input = { email: "email@example.com" };

  const result = validate(input, (value) => ({
    email: value("email").isEmail(),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "email": "email@example.com",
      },
      Object {},
    ]
  `);
});

it(".isEmail(message)", () => {
  const input: Input = { email: "email@example" };

  const result = validate(input, (value) => ({
    email: value("email").isEmail("Wrong email."),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "email": "email@example",
      },
      Object {
        "email": Array [
          "Wrong email.",
        ],
      },
    ]
  `);
});
