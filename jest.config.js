module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.steps.ts'],
  moduleNameMapper: {
    '^@shop/(.*)$': '<rootDir>/shop/$1',
  },
};
