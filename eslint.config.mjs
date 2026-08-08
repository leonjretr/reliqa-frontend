import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-config-next turns on only six a11y rules, all as warnings; take the
  // plugin's full recommended set instead. Rules only — eslint-config-next
  // already registers the plugin, and flat config forbids redefining it.
  {
    name: "jsx-a11y/recommended",
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
  // Generated shadcn primitives forward `htmlFor` through `{...props}` rather
  // than declaring it literally, so this rule can't see the association.
  {
    name: "jsx-a11y/shadcn-overrides",
    files: ["src/ui/components/lib/shadcn/**/*.{ts,tsx}"],
    rules: {
      "jsx-a11y/label-has-associated-control": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
