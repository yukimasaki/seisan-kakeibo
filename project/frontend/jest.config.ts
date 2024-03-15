import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "./coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

export default config;
