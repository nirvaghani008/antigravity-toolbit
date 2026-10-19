import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Resolves "@/..." imports the same way tsconfig.json does.
    tsconfigPaths: true,
  },
  test: {
    // Logic and API tests run in Node. Component tests opt into a browser-like DOM
    // with a `// @vitest-environment jsdom` line at the top of the file.
    environment: "node",
    include: ["**/*.test.{ts,tsx}"],
    // e2e/ holds Playwright's *.spec.ts files, which Vitest must not run.
    exclude: ["node_modules/**", ".next/**", "e2e/**"],
  },
});
