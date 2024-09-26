const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/{app,components,libs}/**/*.tsx",
    "!<rootDir>/src/app/{api,health}/**/*.{ts,tsx}",
    "!<rootDir>/**/index.{ts,tsx}",
    "!<rootDir>/**/*.{style,styles,mock,validation}.{ts,tsx}",
    "!<rootDir>/**/__tests__/**",
    "!<rootDir>/**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
