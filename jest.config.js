const jestConfig = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [ '**/?(*.)+(spec|test).+(ts|tsx|js)' ],
  testTimeout: 50000,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageReporters: [ 'clover', 'json', 'lcov', [ 'text', { 'skipFull': true } ] ],
  // coverageThreshold: {
  //   global: {
  //     branches: 30,
  //     functions: 30,
  //     lines: 30,
  //     statements: 30
  //   }
  // },
  testResultsProcessor: 'jest-sonar-reporter',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: 'dist/test-report.html'
      }
    ]
  ],
};

module.exports = jestConfig;