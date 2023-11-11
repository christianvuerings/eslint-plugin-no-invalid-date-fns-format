import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/christianvuerings/eslint-plugin-no-invalid-date-fns-format/blob/main/docs/${name}.md`,
);

export type Options = [
  {
    validPatterns?: string[];
    fixablePatterns?: { invalid: string; valid: string }[];
  },
];

type MessageIds = "invalidDateFormat";

export default createRule<Options, MessageIds>({
  name: "no-invalid-date-fns-format",
  defaultOptions: [
    {
      validPatterns: [],
      fixablePatterns: [],
    },
  ],
  meta: {
    docs: {
      description:
        "Disallow invalid date formats to ensure localized dates show up correctly",
      recommended: "error",
    },
    messages: {
      invalidDateFormat:
        "Date format is not allowed, please use one of {{validPatterns}}.",
    },
    type: "problem",
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          validPatterns: {
            type: "array",
            items: {
              type: "string",
            },
          },
          fixablePatterns: {
            type: "array",
            items: {
              type: "object",
              properties: {
                invalid: {
                  type: "string",
                },
                valid: {
                  type: "string",
                },
              },
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const { validPatterns = [], fixablePatterns = [] } =
      context.options[0] ?? {};
    return {
      CallExpression(node) {
        if (
          node.callee?.type === AST_NODE_TYPES.Identifier &&
          node.callee?.name === "format" &&
          node.arguments[1]?.type === AST_NODE_TYPES.Literal &&
          typeof node.arguments[1].value === "string"
        ) {
          const value = node.arguments[1].value;
          if (!validPatterns.includes(value)) {
            context.report({
              node,
              messageId: "invalidDateFormat",
              data: {
                validPatterns,
              },
              fix(fixer) {
                const fixable = fixablePatterns.find(
                  (pattern) => pattern.invalid === value,
                )?.valid;
                return fixable
                  ? fixer.replaceText(node.arguments[1], `"${fixable}"`)
                  : null;
              },
            });
          }
        }
      },
    };
  },
});
