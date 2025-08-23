import { defineConfig } from "eslint/config";
import expoConfig from "eslint-config-expo/flat.js";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**", ".expo/**"],
  },
  expoConfig,
  importPlugin.flatConfigs.recommended,
  {
    rules: {
      "import/no-unresolved": ["off"],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            // order settings within group
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
  },
]);
