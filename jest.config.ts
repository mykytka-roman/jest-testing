import type {Config} from '@jest/types';

const baseDir = '<rootDir>/src/app/server-app';
const baseTestDir = '<rootDir>/src/test/server-app';

const config : Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    `${baseDir}/**/*.ts`
  ],
  testMatch: [
    `${baseTestDir}/**/*.ts`
  ]
};

export default config;