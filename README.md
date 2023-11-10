# `eslint-plugin-no-invalid-date-fns-format`

[![npm](https://img.shields.io/npm/v/eslint-plugin-no-invalid-date-fns-format)](https://www.npmjs.com/package/eslint-plugin-no-invalid-date-fns-format) [![GitHub Build Status](https://img.shields.io/github/actions/workflow/status/christianvuerings/eslint-plugin-no-invalid-date-fns-format/tsc.yml)](https://github.com/christianvuerings/eslint-plugin-no-invalid-date-fns-format/actions/workflows/tsc.yml) ![GitHub Tests](https://img.shields.io/github/actions/workflow/status/christianvuerings/eslint-plugin-no-invalid-date-fns-format/jest.yml?label=tests)

Disallow re-exporting in TypeScript/JavaScript.

## Installation

```sh
# npm
npm install eslint-plugin-no-invalid-date-fns-format --save-dev

# yarn
yarn add eslint-plugin-no-invalid-date-fns-format --dev

# bun
bun install eslint-plugin-no-invalid-date-fns-format --save-dev
```

## Usage

Add `no-invalid-date-fns-format` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["no-invalid-date-fns-format"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "no-invalid-date-fns-format/no-invalid-date-fns-format": "error"
  }
}
```

## Rules

| Rule ID                                                                | Description                                    |
| :--------------------------------------------------------------------- | :--------------------------------------------- |
| [no-invalid-date-fns-format](./src/docs/no-invalid-date-fns-format.md) | disallow re-exporting in TypeScript/JavaScript |

## References

- [Speeding up the JavaScript ecosystem - The barrel file debacle](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/) by [@marvinhagemeister](https://github.com/marvinhagemeister)
- [Burn the Barrel!](https://uglow.medium.com/burn-the-barrel-c282578f21b6#:~:text=%E2%80%9CThe%20problem%20is%20that%20Jest,like%20%40mui%2Fmaterial%20.%E2%80%9D) by [@uglow](https://github.com/uglow)
- [Your Next.js Bundle Will Thank You](https://renatopozzi.me/articles/your-nextjs-bundle-will-thank-you) by [@askides](https://github.com/askides)
- [Barrel files in JavaScript](https://flaming.codes/posts/barrel-files-in-javascript) by [@flaming](https://github.com/flaming-codes)
- Comment by [@ljharb](https://github.com/ljharb) at [eslint-plugin-import/issues/1920](https://github.com/import-js/eslint-plugin-import/issues/1920)

  > Barrel exports increase bundle size and memory footprint, and are the only reason treeshaking is needed (to only-partially clean up sloppy importing), and in my experience, are best avoided, especially in any codebase of significant scale/size.
