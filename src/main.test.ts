/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import { validate } from "./main";

type Input = {
  givenName?: string | null;
  familyName?: string | null;
  email?: string | null;
  website?: string | null;
  phone?: string | null;
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
      null,
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
      null,
    ]
  `);
});

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
      null,
    ]
  `);
});

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
      null,
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

it(".isURL()", () => {
  const input: Input = { website: "error" };

  const result = validate(input, (value) => ({
    email: value("website").isURL(),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "email": "error",
      },
      Object {
        "website": Array [
          "URL is invalid.",
        ],
      },
    ]
  `);
});

it(".isMobilePhone()", () => {
  const input: Input = { phone: "555" };

  const result = validate(input, (value) => ({
    email: value("phone").isMobilePhone("en-US"),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "email": "555",
      },
      Object {
        "phone": Array [
          "Phone number is invalid.",
        ],
      },
    ]
  `);
});
