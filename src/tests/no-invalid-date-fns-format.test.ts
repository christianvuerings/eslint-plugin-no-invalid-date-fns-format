import { ESLintUtils } from "@typescript-eslint/utils";
import rule, { Options } from "../rules/no-invalid-date-fns-format";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

const options: Options = [
  {
    validPatterns: ["yyyy", "P", "PP", "PPP", "PPPP", "p", "pp", "ppp"],
    fixablePatterns: [
      {
        invalid: "YYYY-MM-DD",
        valid: "P",
      },
      {
        invalid: "MM-DD-YYYY",
        valid: "P",
      },
    ],
  },
];

ruleTester.run("no-invalid-date-fns-format", rule, {
  valid: [
    {
      code: `
      import { format } from "date-fns";
      format(new Date(), "PPPP")
      `,
      options,
    },
    {
      code: `
      import { format } from "date-fns"
      format(new Date(), "yyyy")
      `,
      options,
    },
  ],
  invalid: [
    {
      code: `
      import { format } from "date-fns"
      format(new Date(), "YYYY-MM-DD")
      `,
      output: `
      import { format } from "date-fns"
      format(new Date(), "P")
      `,
      errors: [
        {
          messageId: "invalidDateFormat" as const,
        },
      ],
      options,
    },
    {
      code: `
      import { format } from "date-fns"
      format(new Date(), "hh:mm aaa")
      `,
      errors: [
        {
          messageId: "invalidDateFormat" as const,
        },
      ],
      options,
    },
  ],
});
