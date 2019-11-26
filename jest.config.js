module.exports = {
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};
