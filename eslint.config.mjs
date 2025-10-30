import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Override default ignores of eslint-config-next
    ignores: globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);

export default eslintConfig;
