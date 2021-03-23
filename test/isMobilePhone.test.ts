/**
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 */

import { validate } from "../src/validate";

type Input = {
  phone?: string | null;
};

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
