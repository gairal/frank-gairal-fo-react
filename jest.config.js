module.exports = {
  browser: true,
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/**/*.js',
  ],
  setupFiles: ['jest-localstorage-mock', 'jest-fetch-mock'],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/test/mocks/style.js',
    '@/(.*)$': '<rootDir>/src/app/$1',
    'Mocks(.*)$': '<rootDir>/test/mocks$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-router-dom|react-router|redux|lodash-es)/)',
  ],
};
