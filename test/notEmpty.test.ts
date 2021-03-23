/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import { validate } from "../src/validate";

type Input = {
  givenName?: string | null;
  familyName?: string | null;
  age?: number | null;
};

it(".notEmpty()", () => {
  const input: Input = {};

  const result = validate(input, (value) => ({
    given_name: value("givenName").notEmpty(),
    age: value("age").notEmpty("Age is required."),
  }));

  expect(result).toMatchInlineSnapshot(`
       Array [
         Object {},
         Object {
           "age": Array [
             "Age is required.",
           ],
           "givenName": Array [
             "Cannot be empty.",
           ],
         },
       ]
     `);
});

it(".notEmpty({ if: false })", () => {
  const input: Input = {};

  const result = validate(input, (value) => ({
    given_name: value("givenName").notEmpty({ if: false }),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {},
      Object {},
    ]
  `);
});
