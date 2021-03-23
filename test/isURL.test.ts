/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import { validate } from "../src/validate";

type Input = {
  website?: string | null;
};

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
