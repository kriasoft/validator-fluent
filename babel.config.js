/**
 * Babel configuration.
 *
 * @see https://babeljs.io/docs/en/options
 * @copyright 2021-present Kriasoft (https://git.io/JmNtC)
 *
 * @type {import("@babel/core").ConfigAPI}
 */

module.exports = function config(api) {
  return {
    presets: [["@babel/preset-env", { targets: { node: "10" } }]],

    ignore:
      api.env() === "test"
        ? []
        : ["src/types.ts", "**/__tests__/**", "**/*.test.ts"],
    sourceMaps: api.env() === "production",

    overrides: [
      {
        test: /\.ts$/,
        presets: ["@babel/preset-typescript"],
      },
    ],
  };
};
