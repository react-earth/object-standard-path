module.exports = {
  rootDir: './',
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/**.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],
};
