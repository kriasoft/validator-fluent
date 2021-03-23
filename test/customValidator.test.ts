import { validate, Validator } from "../src/validate";

/**
 * Extends the default validator with additional validation rules.
 */
class CustomValidator<K, V> extends Validator<K, V> {
  constructor(key: K, value: V) {
    super(key, value);
  }

  /**
   * Checks if the value is "legit".
   */
  isLegit(): this {
    if (!this.isEmpty && this.value !== "legit") {
      this.errors.push("Not legit.");
    }

    return this;
  }
}

type Input = {
  name: string | null;
};

it(".isLegit()", () => {
  const input: Input = { name: "wrong" };

  const result = validate(input, CustomValidator, (value) => ({
    name: value("name").isLegit(),
  }));

  expect(result).toMatchInlineSnapshot(`
    Array [
      Object {
        "name": "wrong",
      },
      Object {
        "name": Array [
          "Not legit.",
        ],
      },
    ]
  `);
});
