// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
      typecheck: {
        enabled: true,
        tsconfig: "tsconfig.test.json",
        include: ["test/**/*.ts", "test/**/*.mts", "test/**/*.cts"],
      },
    reporters: ["basic", "junit"],
    outputFile: {
      junit: "test-results.xml",
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    include: ["test/**/*.spec.ts"],
    exclude: ["test/**/browser/*.spec.ts"],
    testTimeout: 12000000,
    hookTimeout: 600000,
    coverage: {
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*-browser.mts",
        "src/**/*-react-native.mts",
        "vitest*.config.ts",
        "samples-dev/**/*.ts",
      ],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
  },
});
