/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import { validate } from "../src/validate";

type Input = {
  givenName?: string | null;
};

it(".isLength({ max: 3 })", () => {
  const input: Input = { givenName: "John" };

  const result = validate(input, (value) => ({
    given_name: value("givenName").isLength({ max: 3 }),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "given_name": "John",
      },
      Object {
        "givenName": Array [
          "Must be no longer than 3 characters.",
        ],
      },
    ]
  `);
});

it(".isLength({ min: 5 })", () => {
  const input: Input = { givenName: "John" };

  const result = validate(input, (value) => ({
    given_name: value("givenName").isLength({ min: 5 }),
  }));

  expect(result).toMatchInlineSnapshot(`
     Array [
       Object {
         "given_name": "John",
       },
       Object {
         "givenName": Array [
           "Must be at least 5 characters long.",
         ],
       },
     ]
   `);
});

it(".isLength({ min: 5, max: 10 })", () => {
  const input: Input = { givenName: "John" };

  const result = validate(input, (value) => ({
    given_name: value("givenName").isLength({ min: 5, max: 10 }),
  }));

  expect(result).toMatchInlineSnapshot(`
     Array [
       Object {
         "given_name": "John",
       },
       Object {
         "givenName": Array [
           "Must be between 5 and 10 characters long.",
         ],
       },
     ]
   `);
});
